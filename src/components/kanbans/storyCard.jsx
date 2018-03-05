import React from 'react';
import { connect } from 'react-redux';
import { Icon, Card, Image } from 'semantic-ui-react';
import catPng from '../../images/cat.png';
import octCatSvg from '../../images/octcat.svg';
import { showCardInputForm } from '../../actions/cardInputForm';

function mapStateToProps() {
    return {

    };
}

class StoryCard extends React.Component {
    constructor(props) {
        super(props)

        this.showDialog = this.showDialog.bind(this);
    }

    showDialog() {
        const { story } = this.props;
        this.props.showCardInputForm(false, story, 'story', story.sprintId);
    }

    render() {
        return(
            <Card key={this.props.index} style={{width: 'auto', borderLeft: '2px solid blue'}} onClick={this.showDialog}>
                <Card.Content>
                    <Card.Header style={{fontWeight: '100', fontSize: '0.9em', color: 'rgba(0,0,0,.68)'}}>#{this.props.story.id}</Card.Header>
                    <Card.Description style={{fontWeight: '500', fontSize: '1.1em', color: 'rgba(0,0,0,255)', wordWrap: 'break-word'}}>{this.props.story.title}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Image size='mini' style={{width:'20px', height:'20px', margin: '0px'}} src={octCatSvg} />
                    <span className="right floated">
                        <Icon name="file text outline" />
                        2
                        <Icon name="comment outline" />
                        1
                    </span>
                </Card.Content>
            </Card>
        );
    }
}

export default connect(mapStateToProps, { showCardInputForm })(StoryCard);