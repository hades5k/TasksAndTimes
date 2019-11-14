import React, { Component } from 'react';

// TIER
import axios from 'axios';

// MUI
import Grid from '@material-ui/core/Grid';

// APP COMPONENTS
import Scream from '../components/Scream';

class home extends Component {

    state = {
        screams: null
    };

    componentDidMount() {
        axios.get('/screams')
            .then(res => {
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        ) : <p>Loading ...</p>;

        return (
            < Grid container spacing={3} >
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={3}>
                    <p>Profile...</p>
                </Grid>
            </Grid >
        )
    }
}

export default home
