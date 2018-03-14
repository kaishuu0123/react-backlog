import React from 'react';
import {
    Modal,
    Button
} from 'semantic-ui-react';

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    close() {
        this.props.switchConfirmDialog(false);
    }

    deleteCard() {
        switch (this.props.mode) {
        case 'story':
            this.props.deleteStory(this.props.card);
            break;
        case 'task':
            this.props.deleteTask(this.props.card);
            break;
        }

        this.close();
        this.props.hideCardInputForm(null);
    }

    render() {
        const { openConfirm, card } = this.props;

        return (
            <Modal
                dimmer='inverted'
                open={openConfirm}
                size='small'
            >
                <Modal.Header>
                    Delete #{card.id} {card.title}
                </Modal.Header>
                <Modal.Content>
                    <p>Are you sure?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button compact color='red' content="OK" onClick={this.deleteCard} />
                    <Button compact color='grey' content="Cancel" onClick={this.close} />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ConfirmModal;