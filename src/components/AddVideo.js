import React, { PureComponent } from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import compiler from 'mson/lib/compiler';
import Component from 'mson-react/lib/component';

import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';

const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const ADD_VIDEO = gql`
  mutation createVideo(
    $teamHome: String
    $teamAway: String
    $date: DateTime
    $url: String
    $score: String
    $isYoutube: Boolean
    $place: String
    $tag: VideoCreatetagInput
    $scoreDetail: VideoCreatescoreDetailInput
    $author: AuthorCreateOneWithoutVideosInput
  ) {
    createVideo(data: {
        teamHome: $teamHome
        teamAway: $teamAway
        date: $date
        url: $url
        score: $score
        isYoutube: $isYoutube
        place: $place
        tag: $tag
        scoreDetail: $scoreDetail
        author: $author
    }) {
      id
    }
  }
`;

const definition = {
  component: 'Form',
  fields: [
    {
      name: 'heading',
      component: 'Text',
      text: '# Insert new video data'
    },
    {
      fullWidth: true,
      name: 'teamHome',
      component: 'TextField',
      label: 'Team Home',
      required: true,
      block: false
    },
    {
      fullWidth: true,
      name: 'teamAway',
      component: 'TextField',
      label: 'Team Away',
      required: true,
      block: false
    },
    {
      fullWidth: true,
      name: 'date',
      component: 'DateField',
      label: 'Date'
      //   required: true
    },
    {
      fullWidth: true,
      name: 'place',
      component: 'TextField',
      label: 'Place'
    },
    {
      fullWidth: true,
      name: 'score',
      component: 'TextField',
      label: 'Score'
    },
    {
      fullWidth: true,
      name: 'scoreDetail',
      component: 'TextField',
      label: 'Score Detail'
    },
    {
      fullWidth: true,
      name: 'url',
      component: 'TextField',
      label: 'URL or youtube Id',
      required: true
    },
    {
      fullWidth: true,
      name: 'isYoutube',
      component: 'BooleanField',
      label: 'is on youtube'
    },

    {
      fullWidth: true,
      name: 'tag',
      component: 'TextField',
      label: 'Video Tags'
    },
    {
      fullWidth: true,
      name: 'scoreDetail',
      component: 'TextField',
      label: 'Score Detail'
    },
    {
      name: 'submit',
      component: 'ButtonField',
      type: 'submit',
      label: 'Submit',
      icon: 'Save'
    },
    {
      name: 'reset',
      component: 'ButtonField',
      label: 'Reset',
      icon: 'Clear'
    }
  ],
  validators: [
    {
      where: {
        'fields.email.value': 'nope@example.com'
      },
      error: {
        field: 'email',
        error: 'must not be {{fields.email.value}}'
      }
    }
  ]
};

class AddVideo extends PureComponent {
  state = {
    form: null,
    isSnackOpen: false,
    snackMessage: '',
    isProgressBar: false
  };

  componentDidMount() {
    const form = compiler.newComponent(definition);
    this.setState({ form });

    this.loadValues(form);

    form.on('submit', this.handleSubmit);
    form.on('reset', this.handleReset);
  }

  snackOpen = () => {
    this.setState({ isSnackOpen: true });
  };

  snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isSnackOpen: false });
  };

  loadValues(form) {
    // Load any initial data, e.g. from an API
    form.setValues({
      teamHome: 'team1',
      teamAway: 'team2',
      date: 1540245600000,
      url: 'https://youtube.com',
      score: '3-1',
      isYoutube: true,
      place: 'pakkunara',
      tag: 'friendly, test',
      scoreDetail: '25-19, 11-25, 25-8, 25-15'
    });
  }

  handleSubmit = async () => {
    this.setState({ isProgressBar: true });

    const {
      teamHome,
      teamAway,
      date,
      url,
      score,
      isYoutube,
      place,
      tag,
      scoreDetail
    } = this.state.form.getValues();

    const variables = {
      teamHome,
      teamAway,
      date: formatDate(date),
      url,
      score,
      isYoutube,
      place,
      tag: { set: tag.split(',') },
      scoreDetail: { set: scoreDetail.split(',') },
      author: { connect: { id: 'cjnly829p7g7e0932kavgxzbs' } }
    };

    let result;
    let snackMessage = '';
    try {
      result = await this.props.AddVideo({ variables });
      if (result.data.createVideo.id) this.handleReset();
      snackMessage = `created new video with id ${result.data.createVideo.id}`;
    } catch (e) {
      snackMessage = 'error :(';
    }

    this.setState({ isProgressBar: false });
    this.setState({ isSnackOpen: true, snackMessage });
  };

  handleReset = () => {
    this.state.form.reset();
  };

  render() {
    const { form } = this.state;
    if (!form) return null;

    return (
      <div>
        <Component component={form} />
        {this.state.isProgressBar && <LinearProgress />}
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
    );
  }
}

export default graphql(ADD_VIDEO, { name: 'AddVideo' })(AddVideo);
