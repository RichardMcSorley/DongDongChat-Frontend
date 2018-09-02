import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer'
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const drawerWidth = 240;

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    background: 'pink',
    fontWeight: '300',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: '100%',
    paddingBottom: 66
  },
});

class Header extends React.Component {
  state = {
    mobileOpen: false,
    chatsOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    const { chats, setActiveChat, logout } = this.props
    const drawer = (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Available Chatrooms</ListSubheader>}
      >
        {
          chats.map((chat, chatIndex) => {
            if (chat.name) {
              let lastMessage = { message: '' }
              if (chat.messages[chat.messages.length - 1] && chat.messages[chat.messages.length - 1].message) {
                lastMessage = chat.messages[chat.messages.length - 1];
              }

              const user = chat.users.find(({ name }) => {
                return name !== this.props.name
              }) || { name: "Community" }

              return (
                <List key={chatIndex}>
                  <ListItem button onClick={() => { this.setState(state => ({ chatsOpen: !state.chatsOpen })); }}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={`${user.name}`} />
                    {this.state.chatsOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state.chatsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding onClick={() => { setActiveChat(chat) }}>
                      <ListItem button className={classes.nested}>
                        <ListItemText inset primary={`${lastMessage.message}`} />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              )
            }

            return null
          })
        }


        <div onClick={() => { logout() }} title="Logout" className="logout" />
      </List>
    )

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              DongDong Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {this.props.children}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setActiveChat: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  chats: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Header);
