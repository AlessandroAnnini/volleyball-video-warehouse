import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

const Home = ({ classes }) => (
  <div>
    <Link to="/addVideo">
      <Button variant="outlined" color="primary" className={classes.button}>
        Add Video
      </Button>
    </Link>
    <Link to="/videoList">
      <Button variant="outlined" color="primary" className={classes.button}>
        video list
      </Button>
    </Link>
  </div>
);

export default withStyles(styles)(Home);
