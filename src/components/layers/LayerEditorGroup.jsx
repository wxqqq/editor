import React from 'react'
import PropTypes from 'prop-types'
import Collapse from 'react-collapse'
import Collapser from './Collapser'
import {FormattedMessage} from 'react-intl'

export default class LayerEditorGroup extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    onActiveToggle: PropTypes.func.isRequired
  }

  render() {
    return <div>
      <div className="maputnik-layer-editor-group"
        onClick={e => this.props.onActiveToggle(!this.props.isActive)}
      >
        <span> <FormattedMessage
          id={"intl."+this.props.title}
          defaultMessage={this.props.title}
        /></span>
        <span style={{flexGrow: 1}} />
        <Collapser isCollapsed={this.props.isActive} />
      </div>
      <Collapse isOpened={this.props.isActive}>
        {this.props.children}
      </Collapse>
    </div>
  }
}
