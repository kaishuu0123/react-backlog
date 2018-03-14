import React from 'react';
import ReactSelect from 'react-select';

class CustomSimpleDropdown extends React.Component {
    handleClear() {
        this.setState({ value: '' })
    }

    render() {
        return (
            <ReactSelect
                id="state-select"
                placeholder={this.props.placeholder}
                ref={(ref) => { this.select = ref; }}
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                autoFocus
                options={this.props.options}
                simpleValue
                clearable={true}
                name="selected-state"
                searchable={true}
                autoFocus={false}
                onChange={this.props.onChange}
                value={this.props.value}
                style={{
                    boxShadow: 'none',
                    border: 'none'
                }}
            />
        );
    }
}

export default CustomSimpleDropdown;