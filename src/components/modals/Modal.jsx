import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from 'react-icons/lib/md/close'
import Overlay from './Overlay'
import {FormattedMessage} from 'react-intl'
class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onOpenToggle: PropTypes.func.isRequired,
  }

  render() {
    return <Overlay isOpen={this.props.isOpen}>
      <div className="maputnik-modal">
        <header className="maputnik-modal-header">
          <h1 className="maputnik-modal-header-title"> <FormattedMessage
            id={"intl."+this.props.title}
            defaultMessage={this.props.title}
          /></h1>
          <span className="maputnik-modal-header-space"/>
          <a className="maputnik-modal-header-toggle"
            onClick={() => this.props.onOpenToggle(false)}
          >
            <CloseIcon />
          </a>
        </header>
        <div className="maputnik-modal-scroller">
          <div className="maputnik-modal-content">{this.props.children}</div>
        </div>
      </div>
    </Overlay>
  }
}

export default Modal
