import React from 'react'
import PropTypes from 'prop-types'
import ScrollContainer from './ScrollContainer'
import Button from './Button'
class AppLayout extends React.Component {
  static propTypes = {
    toolbar: PropTypes.element.isRequired,
    layerList: PropTypes.element.isRequired,
    layerEditor: PropTypes.element,
    map: PropTypes.element.isRequired,
    bottom: PropTypes.element,
  }

  static childContextTypes = {
    reactIconBase: PropTypes.object
  }

  getChildContext() {
    return {
      reactIconBase: { size: 14 }
    }
  }
    /**
   * [setFadeIn description]tjc 修改drawer面板样式
   */
    setFadeIn() {
        let m = document.getElementsByClassName("maputnik-layout-drawer");
        m[0].style.transform = "translateX(-350px)";

        let hideButton = document.getElementsByClassName("hymap-hide-div");
        hideButton[1].style.display = "none"; //tjc 修改drawer面板样式
    }

  render() {
   
    return <div className="maputnik-layout">
      {this.props.toolbar}
      <div className="maputnik-layout-list">
        <ScrollContainer>
          {this.props.layerList}
        </ScrollContainer>
      </div>
      <div className="maputnik-layout-drawer">
        <ScrollContainer>
          {this.props.layerEditor}
        </ScrollContainer>
        <div  className="hymap-hide-div" >
        <Button style={{height:'30px'}} onClick={this.setFadeIn.bind(this)}>
          <img src="data:image/png;base64,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"
           width="100%" />  
        </Button>
           
        </div>
      </div>

      {this.props.map}
      {this.props.bottom && <div className="maputnik-layout-bottom">
          {this.props.bottom}
        </div>
      }
    </div>
  }
}

export default AppLayout
