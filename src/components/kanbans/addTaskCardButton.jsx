import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { showCardInputForm } from '../../actions/cardInputForm';

const mapStateToProps = (state) => ({
});

class AddTaskCardButton extends React.Component {
    constructor(props) {
        super(props)
        this.show = this.show.bind(this, false);
    }

    show(dimmer) {
        this.props.showCardInputForm(true, null, 'task', this.props.storyId);
    }

    render() {
        return(
            <Button basic circular icon size="mini" compact onClick={this.show}>
                <Icon name="add"></Icon>
                Add Task
            </Button>
        )
    }
}

export default connect(mapStateToProps, { showCardInputForm })(AddTaskCardButton);