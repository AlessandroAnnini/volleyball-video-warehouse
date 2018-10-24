import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';

import VideoCard from './VideoCard';

const GET_VIDEOS = gql`
  {
    videos {
      id
      teamHome
      teamAway
      date
      url
      score
      isYoutube
      place
      tag
      scoreDetail
    }
  }
`;

const DELETE_VIDEO = gql`
  mutation deleteVideo(
    $id: ID
  ) {
    deleteVideo(where: {
        id: $id
      }) {
      id
    }
  }
`;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class AddVideo extends Component {
  state = {
    isSnackOpen: false,
    snackMessage: ''
  };

  snackOpen = () => {
    this.setState({ isSnackOpen: true });
  };

  snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isSnackOpen: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={DELETE_VIDEO}>
        {(deleteVideo, { data }) => (
          <div className={classes.root}>
            <Grid
              container
              spacing={16}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Query query={GET_VIDEOS}>
                {({ loading, error, data, refetch }) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;
                  if (data && !data.videos) return 'No data';
                  return data.videos.map(video => (
                    <div>
                      <Link to="/addVideo">
                        <Button
                          style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px'
                          }}
                          variant="fab"
                          color="primary"
                          aria-label="Add"
                          className={classes.button}
                        >
                          <AddIcon />
                        </Button>
                      </Link>
                      <Grid item xs={12} sd={6} md={4}>
                        <VideoCard
                          key={video.id}
                          data={video}
                          onDelete={async id => {
                            let result;
                            let snackMessage = '';
                            try {
                              result = await deleteVideo({
                                variables: { id },
                                refetchQueries: [{ query: GET_VIDEOS }]
                              });
                              snackMessage = `deleted video with id ${
                                result.data.deleteVideo.id
                              }`;
                            } catch (e) {
                              snackMessage = 'error :<';
                            }

                            this.setState({ isSnackOpen: true, snackMessage });
                          }}
                        />
                      </Grid>
                    </div>
                  ));
                }}
              </Query>
            </Grid>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              open={this.state.isSnackOpen}
              onClose={this.snackClose}
              autoHideDuration={3000}
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              message={<span id="message-id">{this.state.snackMessage}</span>}
            />
          </div>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(AddVideo);
