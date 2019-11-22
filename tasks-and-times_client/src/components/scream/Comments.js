import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// TIER
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI
import { withStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const styles = theme => ({
    ...theme.spreadThis,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '15%'
    },
    commentData: {
        marginLeft: 20
    }
});

class Comments extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { comments, classes } = this.props;

        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, userHandle, createdAt, userImage } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <img
                                            src={userImage}
                                            alt='Profile'
                                            className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant='h5'
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color='primary'
                                            >
                                                {userHandle}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                            >
                                                {dayjs(createdAt).format(
                                                    'DD MMMM YYYY, h:mm a'
                                                )}
                                                {` (${dayjs(
                                                    createdAt
                                                ).fromNow()})`}
                                            </Typography>
                                            <hr
                                                className={
                                                    classes.invisibleSeparator
                                                }
                                            />
                                            <Typography variant='body1'>
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    );
                })}
            </Grid>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comments);
