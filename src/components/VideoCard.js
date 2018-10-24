import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import red from '@material-ui/core/colors/red';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  card: {
    minWidth: 300,
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
        <CardHeader title={title} subheader={date} />
        <iframe
          title={title}
          src={isYoutube ? `https://www.youtube.com/embed/${url}` : url}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        />
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
