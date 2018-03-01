import React from 'react';
import { Icon, Card, Image } from 'semantic-ui-react';
import catPng from '../../images/cat.png';
import octCatSvg from '../../images/octcat.svg';

class StoryCard extends React.Component {
    render() {
        return(
            <Card key={this.props.index} style={{width: 'auto', borderLeft: '2px solid blue'}}>
                <Card.Content>
                    <span className="right floated">
                        <Icon name="edit"/>
                    </span>
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

export default StoryCard;