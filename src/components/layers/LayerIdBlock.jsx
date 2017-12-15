import React from 'react'
import PropTypes from 'prop-types'

import styleSpec from '@mapbox/mapbox-gl-style-spec/style-spec'
import InputBlock from '../inputs/InputBlock'
import StringInput from '../inputs/StringInput'

class LayerIdBlock extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    return <InputBlock label={"ID"} doc={styleSpec.latest.layer.id.doc}>
      <StringInput
        value={this.props.value}
        onChange={this.props.onChange}
      />
    </InputBlock>
  }
}

export default LayerIdBlock
