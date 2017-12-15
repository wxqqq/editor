import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import MapboxGl from 'mapbox-gl'
import MapboxInspect from 'mapbox-gl-inspect'
import FeatureLayerPopup from './FeatureLayerPopup'
import FeaturePropertyPopup from './FeaturePropertyPopup'
import style from '../../libs/style.js'
import tokens from '../../config/tokens.json'
import colors from 'mapbox-gl-inspect/lib/colors'
import Color from 'color'
import ZoomControl from '../../libs/zoomcontrol'
import { colorHighlightedLayer } from '../../libs/highlight'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../../mapboxgl.css'
import '../../libs/mapbox-rtl'
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

import zh_CN from '../../locale/zh-CN';
import en_US from '../../locale/en-US';
import {addLocaleData, IntlProvider} from 'react-intl';
//导入 i18n 配置文件
addLocaleData([...zh, ...en]);
let messages = {};
messages["en-US"] = en_US;
messages["zh-CN"] = zh_CN;
const languages = navigator.languages;
const currentLang = languages[0];

function renderLayerPopup(features) {
  var mountNode = document.createElement('div');
  ReactDOM.render(<FeatureLayerPopup features={features} />, mountNode)
  return mountNode.innerHTML;
}

function renderPropertyPopup(features) {
  var mountNode = document.createElement('div');
  ReactDOM.render(<IntlProvider locale={currentLang} messages={messages[currentLang]}>
    <FeaturePropertyPopup features={features}/></IntlProvider>, mountNode)
  return mountNode.innerHTML;
}

function buildInspectStyle(originalMapStyle, coloredLayers, highlightedLayer) {
  const backgroundLayer = {
    "id": "background",
    "type": "background",
    "paint": {
      "background-color": '#1c1f24',
    }
  }

  const layer = colorHighlightedLayer(highlightedLayer)
  if(layer) {
    coloredLayers.push(layer)
  }

  const sources = {}
  Object.keys(originalMapStyle.sources).forEach(sourceId => {
    const source = originalMapStyle.sources[sourceId]
    if(source.type !== 'raster') {
      sources[sourceId] = source
    }
  })

  const inspectStyle = {
    ...originalMapStyle,
    sources: sources,
    layers: [backgroundLayer].concat(coloredLayers)
  }
  return inspectStyle
}

export default class MapboxGlMap extends React.Component {
  static propTypes = {
    onDataChange: PropTypes.func,
    mapStyle: PropTypes.object.isRequired,
    inspectModeEnabled: PropTypes.bool.isRequired,
    highlightedLayer: PropTypes.object,
  }

  static defaultProps = {
    onMapLoaded: () => {},
    onDataChange: () => {},
    mapboxAccessToken: tokens.mapbox,
  }

  constructor(props) {
    super(props)
    MapboxGl.accessToken = tokens.mapbox
    this.state = {
      map: null,
      inspect: null,
      isPopupOpen: false,
      popupX: 0,
      popupY: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.map) return
    const metadata = nextProps.mapStyle.metadata || {}
    MapboxGl.accessToken = metadata['maputnik:mapbox_access_token'] || tokens.mapbox

    if (!nextProps.inspectModeEnabled) {

      if (nextProps.mapStyle&&nextProps.mapStyle.init) {
        if (nextProps.mapStyle.zoom) {
          this.state.map.setZoom(nextProps.mapStyle.zoom)
        }
        if (nextProps.mapStyle.center) {

          let center=nextProps.mapStyle.center;
          if(nextProps.mapStyle.center[1]>90){
            center= nextProps.mapStyle.center.reverse()
          }
          this.state.map.setCenter(center)
        }
        delete nextProps.mapStyle.init;
      }
      //Mapbox GL now does diffing natively so we don't need to calculate
      //the necessary operations ourselves!
      this.state.map.setStyle(nextProps.mapStyle, {
        diff: true
      })
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.inspectModeEnabled !== prevProps.inspectModeEnabled) {
      this.state.inspect.toggleInspector()
    }
    if(this.props.inspectModeEnabled) {
      this.state.inspect.render()
    }
  }

  componentDidMount() {
    const map = new MapboxGl.Map({
      container: this.container,
      style: this.props.mapStyle,
      hash: true,
    })

    const zoom = new ZoomControl;
    map.addControl(zoom, 'top-right');
 
    //tjc  增加全屏按钮
    map.addControl(new MapboxGl.FullscreenControl(),'top-right');
 
    const nav = new MapboxGl.NavigationControl();
    map.addControl(nav, 'top-right');

    const inspect = new MapboxInspect({
      popup: new MapboxGl.Popup({
        closeOnClick: false
      }),
      showMapPopup: true,
      showMapPopupOnHover: false,
      showInspectMapPopupOnHover: true,
      showInspectButton: false,
      assignLayerColor: (layerId, alpha) => {
        return Color(colors.brightColor(layerId, alpha)).desaturate(0.5).string()
      },
      buildInspectStyle: (originalMapStyle, coloredLayers) => buildInspectStyle(originalMapStyle, coloredLayers, this.props.highlightedLayer),
      renderPopup: features => {
        if(this.props.inspectModeEnabled) {
          return renderPropertyPopup(features)
        } else {
          return renderLayerPopup(features)
        }
      }
    })
    map.addControl(inspect)

    map.on("style.load", () => {
      this.setState({ map, inspect });
    })

    map.on("data", e => {
      if(e.dataType !== 'tile') return
      this.props.onDataChange({
        map: this.state.map
      })
    })
    map.on('mousemove', function (e) {
      document.getElementById('position').innerHTML =
 
       "经度："+Number(e.lngLat.lng).toFixed(4) + ",纬度：" + Number(e.lngLat.lat).toFixed(4)
 
     });
  }

  render() {
    return <div>
      <div
        className="maputnik-map"
        ref={x => this.container = x}
      ></div>
      <div className="maputnik-map-position" id="position"></div>
    </div>
  }
}
