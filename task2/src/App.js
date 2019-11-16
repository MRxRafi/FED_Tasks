import React from 'react';
import './App.css';
import CustomerList from './components/CustomerList.js';
import TrainingList from './components/TrainingList.js';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import SubjectIcon from '@material-ui/icons/Subject';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

export default function NewApp(){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [listName, setListName] = React.useState('Customers');

  const toggleDrawer = open => e => {
    if(e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')){
      return;
    }
    setOpen(open);
  }

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={e => {
          e.preventDefault();
          setValue(0);
          setListName('Customers');
        }}>
          <ListItemIcon><PermContactCalendarIcon/></ListItemIcon>
          <ListItemText>Customer List</ListItemText>
        </ListItem>

        <ListItem button onClick={e => {
          e.preventDefault();
          setValue(1);
          setListName('Trainings');
        }}>
          <ListItemIcon><SubjectIcon/></ListItemIcon>
          <ListItemText>Training List</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: 'black'}}>
        <Toolbar>
            <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {listName}
            </Typography>
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        {CustomerList}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {TrainingList}
      </TabPanel>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </div>
  );
}
