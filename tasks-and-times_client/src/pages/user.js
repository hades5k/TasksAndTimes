import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TIER
import axios from 'axios';

// Custom
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';

// MUI
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { getUserInfos } from '../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis
});

class user extends Component {
    state = {
        profile: null,
        screamIdParam: null
    };

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if (screamId) this.setState({ screamIdParam: screamId });

        this.props.getUserInfos(handle);
        axios
            .get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        const { screams, loading } = this.props.data;
        const { screamIdParam } = this.state;

        let screamsMarkup = !loading ? (
            screams === null ? (
                <p>No scream from this user!</p>
            ) : !screamIdParam ? (
                screams.map(scream => (
                    <Scream key={scream.screamId} scream={scream} />
                ))
            ) : (
                screams.map(scream => {
                    if (scream.screamId !== screamIdParam) {
                        return <Scream key={scream.screamId} scream={scream} />;
                    } else {
                        return (
                            <Scream
                                key={scream.screamId}
                                scream={scream}
                                openDialog
                            />
                        );
                    }
                })
            )
        ) : (
            <p>Loading ...</p>
        );

        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={3}>
                    {this.state.profile === null ? (
                        <p>Loading profile...</p>
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
            </Grid>
        );
    }
}

user.propTypes = {
    getUserInfos: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserInfos })(
    withStyles(styles)(user)
);
