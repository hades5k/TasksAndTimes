import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';

// APP COMPONENTS
import Scream from '../components/Scream';
import Profile from '../components/Profile';

// Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class home extends Component {

    state = {
        screams: null
    };

    componentDidMount() {
        this.props.getScreams();
    }

    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        ) : (
                <p>Loading ...</p>
            );

        return (
            < Grid container spacing={3} >
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={3}>
                    <Profile />
                </Grid>
            </Grid >
        )
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

// autre façon de passer une méthode (getScreams) au lieu de faire un objet... Pour référence
export default connect(mapStateToProps, { getScreams })(home); 
