import React from 'react'
import PropTypes from 'prop-types'
import InputBlock from '../inputs/InputBlock'
import StringInput from '../inputs/StringInput'
import LayerIcon from '../icons/LayerIcon'


function groupFeaturesBySourceLayer(features) {
  const sources = {}
  features.forEach(feature => {
    sources[feature.layer['source-layer']] = sources[feature.layer['source-layer']] || []
    sources[feature.layer['source-layer']].push(feature)
  })
  return sources
}

class FeatureLayerPopup extends React.Component {
  static propTypes = {
    features: PropTypes.array
  }

  render() {
    const sources = groupFeaturesBySourceLayer(this.props.features)

    const items = Object.keys(sources).map(vectorLayerId => {
      const layers = sources[vectorLayerId].map((feature, idx) => {
        return <label
          key={idx}
          className="maputnik-popup-layer"
        >
          <LayerIcon type={feature.layer.type} style={{
            width: 14,
            height: 14,
            paddingRight: 3
          }}/>
          {feature.layer.id}
        </label>
      })
      return <div key={vectorLayerId}>
        <div className="maputnik-popup-layer-id">{vectorLayerId}</div>
        {layers}
      </div>
    })

    return <div className="maputnik-feature-layer-popup">
      {items}
    </div>
  }
}


export default FeatureLayerPopup
