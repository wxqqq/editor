import React from 'react'

import GlSpec from 'mapbox-gl-style-spec/reference/latest.js'
import InputBlock from '../inputs/InputBlock'
import SelectInput from '../inputs/SelectInput'
import {FormattedMessage} from 'react-intl'

class LayerTypeBlock extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  render() {
    return <InputBlock label={"Type"} doc={GlSpec.layer.type.doc}>
      <SelectInput
        options={[
          ['background',<FormattedMessage
            id="intl.Background"
            defaultMessage={'Background'}
          />],
          ['fill',<FormattedMessage
            id="intl.Fill"
            defaultMessage={'Fill'}
          />],
          ['line',<FormattedMessage
            id="intl.Line"
            defaultMessage={'Line'}
          />],
          ['symbol',<FormattedMessage
            id="intl.Symbol"
            defaultMessage={'Symbol'}
          />],
          ['raster',<FormattedMessage
            id="intl.Raster"
            defaultMessage={'Raster'}
          />],
          ['circle', <FormattedMessage
            id="intl.Circle"
            defaultMessage={'Circle'}
          />],
          ['fill-extrusion', <FormattedMessage
            id="intl.FillExtrusion"
            defaultMessage={'Fill Extrusion'}
          />],
        ]}
        onChange={this.props.onChange}
        value={this.props.value}
      />
    </InputBlock>
  }
}

export default LayerTypeBlock
