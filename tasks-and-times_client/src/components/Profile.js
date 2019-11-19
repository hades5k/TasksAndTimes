import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

// TIER
import dayjs from 'dayjs';

// MUI
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper, Link as MuiLink, Typography } from '@material-ui/core';

// MUI ICONS
import {
    LocationOn,
    Link as LinkIcon,
    CalendarToday,
    Edit as EditIcon,
    ExitToApp,
} from '@material-ui/icons';

// Custom
import EditDetails from './EditDetails';
import MyButton from '../util/MyButton';

const styles = (theme) => ({
    ...theme.spreadThis,
});

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={imageUrl} className="profile-image" alt="profile" />
                            <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                            <MyButton tip="Edit profile picture" tipPlacement="top"
                                onClick={this.handleEditPicture} btnClassName="button">
                                <EditIcon color="secondary" />
                            </MyButton>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                                @{handle}
                            </MuiLink>
                            <hr />
                            {bio && <Typography variant="body2">{bio}</Typography>}
                            <hr />
                            {location && (
                                <Fragment>
                                    <LocationOn color="primary" /> <span>{location}</span>
                                    <hr />
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <LinkIcon color="primary" />
                                    <a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
                                    <hr />
                                </Fragment>
                            )}
                            <CalendarToday color="primary"></CalendarToday>
                            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                        </div>
                        <MyButton tip="Logout" tipPlacement="top" onClick={this.handleLogout}>
                            <ExitToApp color="secondary" />
                        </MyButton>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
                    <Paper className={classes.paper}>
                        <Typography variant="body2" align="center">
                            No profile found, please login
                        </Typography>
                        <div className={classes.buttons}>
                            <Button variant="contained" color="primary" component={Link} to="/login">
                                Login
                            </Button>
                            <Button variant="contained" color="secondary" component={Link} to="/signup">
                                Signup
                            </Button>
                        </div>
                    </Paper>
                )
        ) : (<p>Loading...</p>);

        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    logoutUser,
    uploadImage,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
