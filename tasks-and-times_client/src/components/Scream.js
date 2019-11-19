import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// ICONS
import { Chat as ChatIcon, Favorite as FavoriteIcon, FavoriteBorder } from '@material-ui/icons';

// TIER
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

// Custom
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream';

const styles = (theme) => ({
    ...theme.spreadThis,
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative',
    },
    image: {
        minWidth: 200,
        objectFit: 'cover'
    },
    content: {
        padding: 25,
    },
});

class Scream extends Component {
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId))
            return true
        else
            return false;
    };

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);

    };

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    };

    render() {
        dayjs.extend(relativeTime);

        const {
            classes,
            scream: {
                userImage,
                body,
                createdAt,
                userHandle,
                likeCount,
                commentCount,
                screamId
            },
            user: {
                authenticated,
                credentials: {
                    handle,
                },
            },
        } = this.props;

        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to='/login'>
                    <FavoriteBorder color="primary" />
                </Link>
            </MyButton>
        ) : (
                this.likedScream() ? (
                    <MyButton tip="Unlike" onClick={this.unlikeScream}>
                        <FavoriteIcon color="primary" />
                    </MyButton>
                ) : (
                        <MyButton tip="Like" onClick={this.likeScream}>
                            <FavoriteBorder color="primary" />
                        </MyButton>
                    )
            );

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null;

        return (
            <Card className={classes.card}>
                <CardMedia className={classes.image}
                    image={userImage}
                    title="Profile image" />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} comments</span>
                </CardContent>

            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    likeScream,
    unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
