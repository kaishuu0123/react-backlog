import React from 'react';
import { connect } from 'react-redux';
import Header from './header.jsx';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                Home
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
