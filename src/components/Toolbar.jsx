import React from 'react'
import FileReaderInput from 'react-file-reader-input'
import classnames from 'classnames'

import MdFileDownload from 'react-icons/lib/md/file-download'
import MdFileUpload from 'react-icons/lib/md/file-upload'
import OpenIcon from 'react-icons/lib/md/open-in-browser'
import SettingsIcon from 'react-icons/lib/md/settings'
import MdInfo from 'react-icons/lib/md/info'
import SourcesIcon from 'react-icons/lib/md/layers'
import MdSave from 'react-icons/lib/md/save'
import MdStyle from 'react-icons/lib/md/style'
import MdMap from 'react-icons/lib/md/map'
import MdInsertEmoticon from 'react-icons/lib/md/insert-emoticon'
import MdFontDownload from 'react-icons/lib/md/font-download'
import HelpIcon from 'react-icons/lib/md/help-outline'
import InspectionIcon from 'react-icons/lib/md/find-in-page'

import logoImage from '../img/maputnik.png'
import SettingsModal from './modals/SettingsModal'
import ExportModal from './modals/ExportModal'
import SourcesModal from './modals/SourcesModal'
import OpenModal from './modals/OpenModal'
import {FormattedMessage} from 'react-intl'
import style from '../libs/style'

function IconText(props) {
  return <span className="maputnik-icon-text">{props.children}</span>
}

function ToolbarLink(props) {
  return <a
    className={classnames('maputnik-toolbar-link', props.className)}
    href={props.href}
    target={"blank"}
  >
    {props.children}
  </a>
}

function ToolbarAction(props) {
  return <a
    className='maputnik-toolbar-action'
    onClick={props.onClick}
  >
    {props.children}
  </a>
}

export default class Toolbar extends React.Component {
  static propTypes = {
    mapStyle: React.PropTypes.object.isRequired,
    inspectModeEnabled: React.PropTypes.bool.isRequired,
    onStyleChanged: React.PropTypes.func.isRequired,
    // A new style has been uploaded
    onStyleOpen: React.PropTypes.func.isRequired,
    // A dict of source id's and the available source layers
    sources: React.PropTypes.object.isRequired,
    onInspectModeToggle: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: {
        settings: false,
        sources: false,
        open: false,
        add: false,
        export: false,
      }
    }
  }

  toggleModal(modalName) {
    this.setState({
      isOpen: {
        ...this.state.isOpen,
        [modalName]: !this.state.isOpen[modalName]
      }
    })
  }

  render() {
    return <div className='maputnik-toolbar'>
      <SettingsModal
        mapStyle={this.props.mapStyle}
        onStyleChanged={this.props.onStyleChanged}
        isOpen={this.state.isOpen.settings}
        onOpenToggle={this.toggleModal.bind(this, 'settings')}
      />
      <ExportModal
        mapStyle={this.props.mapStyle}
        onStyleChanged={this.props.onStyleChanged}
        isOpen={this.state.isOpen.export}
        onOpenToggle={this.toggleModal.bind(this, 'export')}
      />
      <OpenModal
        isOpen={this.state.isOpen.open}
        onStyleOpen={this.props.onStyleOpen}
        onOpenToggle={this.toggleModal.bind(this, 'open')}
      />
      <SourcesModal
          mapStyle={this.props.mapStyle}
          onStyleChanged={this.props.onStyleChanged}
          isOpen={this.state.isOpen.sources}
          onOpenToggle={this.toggleModal.bind(this, 'sources')}
      />
      <ToolbarLink
        href={"https://github.com/maputnik/editor"}
        className="maputnik-toolbar-logo"
      >
        <img src={logoImage} alt="Maputnik" />
        <h1>地图编辑器</h1>
      </ToolbarLink>
      <ToolbarAction onClick={this.toggleModal.bind(this, 'open')}>
        <OpenIcon />
        <IconText><FormattedMessage
          id="intl.open"
          defaultMessage={'open'}
        /></IconText>
      </ToolbarAction>
      <ToolbarAction onClick={this.toggleModal.bind(this, 'export')}>
        <MdFileDownload />
        <IconText><FormattedMessage
          id="intl.Export"
          defaultMessage={'Export'}
        /></IconText>
      </ToolbarAction>
      <ToolbarAction onClick={this.toggleModal.bind(this, 'sources')}>
        <SourcesIcon />
        <IconText><FormattedMessage
          id="intl.Sources"
          defaultMessage={'Sources'}
        /></IconText>
      </ToolbarAction>
      <ToolbarAction onClick={this.toggleModal.bind(this, 'settings')}>
        <SettingsIcon />
        <IconText><FormattedMessage
          id="intl.Style Settings"
          defaultMessage={'Style Settings'}
        /></IconText>
      </ToolbarAction>
      <ToolbarAction onClick={this.props.onInspectModeToggle}>
        <InspectionIcon />
        <IconText>
          { this.props.inspectModeEnabled && <span><FormattedMessage
            id="intl.MapMode"
            defaultMessage={'Map Mode'}
          /></span> }
          { !this.props.inspectModeEnabled && <span><FormattedMessage
            id="intl.InspectMode"
            defaultMessage={'Inspect Mode'}
          /></span> }
        </IconText>
      </ToolbarAction>
      <ToolbarLink href={"https://github.com/maputnik/editor/wiki"}>
        <HelpIcon />
        <IconText><FormattedMessage
          id="intl.help"
          defaultMessage={'help'}
        /></IconText>
      </ToolbarLink>
    </div>
  }
}
