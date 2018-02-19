import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Menu inverted>
                    <Menu.Item header>Kanboard</Menu.Item>
                    <Menu.Item exact as={NavLink} to="/">Home</Menu.Item>
                    <Menu.Item as={NavLink} to="/backlog">Backlog</Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default connect()(Header);