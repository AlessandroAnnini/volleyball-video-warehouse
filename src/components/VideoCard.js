import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import red from '@material-ui/core/colors/red';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const formatDate = d => {
  const dd = new Date(d);
  return `${dd.getDate()}/${dd.getMonth() + 1}/${dd.getFullYear()}`;
};

class RecipeReviewCard extends React.Component {
  render() {
    const { classes } = this.props;
    const {
      id,
      teamHome,
      teamAway,
      date,
      url,
      score,
      isYoutube,
      place,
      tag,
      scoreDetail
    } = this.props.data;

    const title = `${teamHome} - ${teamAway}`;

    return (
      <Card className={classes.card}>
        <CardHeader title={title} subheader={formatDate(date)} />
        <div
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${url}/default.jpg)`,
            backgroundSize: 'cover',
            width: '100%',
            height: '230px'
          }}
        >
          <iframe
            style={{ width: '100%', height: '230px' }}
            title={title}
            src={isYoutube ? `https://www.youtube.com/embed/${url}` : url}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        </div>
        <CardContent>
          <ul>
            <li>{url}</li>
            <li>{`place ${place}`},</li>
            <li>{`score: ${score}`}</li>
            <li>{`scoreDetail ${scoreDetail}`}</li>
            <li>{`tag ${tag}`},</li>
            <li>{`isYoutube: ${isYoutube}`}</li>
          </ul>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Share"
            onClick={() => this.props.onDelete(id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(RecipeReviewCard);
