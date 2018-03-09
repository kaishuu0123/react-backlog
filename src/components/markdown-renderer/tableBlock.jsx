import React from 'react';
import { Table } from 'semantic-ui-react';

class TableBlock extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Table celled collapsing>
                {this.props.children}
            </Table>
        )
    }
}

export default TableBlock