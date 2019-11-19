import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Custom
import MyButton from '../util/MyButton';

// Redux
import { connect } from 'react-redux'

// Material UI
import { AppBar, Toolbar, Button } from '@material-ui/core';

// Icons
import { Add as AddIcon, Home as HomeIcon, Notifications as NotifIcon } from '@material-ui/icons';

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <MyButton tip="Post a scream" tipPlacement="top">
                                <AddIcon />
                            </MyButton>
                            <MyButton tip="Home" tipPlacement="top">
                                <Link to='/'>
                                    <HomeIcon />
                                </Link>
                            </MyButton>
                            <MyButton tip="Home" tipPlacement="top">
                                <NotifIcon />
                            </MyButton>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            </Fragment>
                        )
                    }
                </Toolbar>
            </AppBar >
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
