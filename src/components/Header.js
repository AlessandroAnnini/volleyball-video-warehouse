import React from 'react';
import { Link } from 'react-router-dom';

import { TContext } from './../context';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ViewListIcon from '@material-ui/icons/ViewList';
import CodeIcon from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <TContext>
      {({ toggleDrawer, store }) => (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <Link style={{ color: '#fff', textDecoration: 'none' }} to="/">
                  VVW
                </Link>
              </Typography>
              <Link to="/addVideo">
                <IconButton color="inherit" style={{ color: '#fff' }}>
                  <AddIcon />
                </IconButton>
              </Link>
              <Link to="/">
                <IconButton color="inherit" style={{ color: '#fff' }}>
                  <ViewListIcon />
                </IconButton>
              </Link>
              <Tooltip title="v 0.1">
                <IconButton color="inherit" style={{ color: '#fff' }}>
                  <CodeIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </TContext>
  );
}

export default withStyles(styles)(ButtonAppBar);
