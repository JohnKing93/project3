import React from 'react'
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import NoMatch from "../../pages/NoMatch";
import Dashboard from '../../pages/Dashboard';
import Ideas from '../../pages/Idea';
import LiveProjects from '../../pages/LiveProjects';
import ProjectDetail from '../../pages/ProjectDetail';
import UserProfile from '../../pages/UserProfile';
import Auth from '../../pages/Auth';
import API from "../../utils/API";


class PrivateRoute extends React.Component {

  state = {
    loaded: false,
    isAuthenticated: false,
    message: '',
    user: {},
  }

  componentDidMount() {
    this.authenticate()

    // this.unlisten = this.props.history.listen(() => {
    //   this.authenticate()
    //     .then(user => console.log('User: ', user))
    //     .catch(() => {
    //       if (this.state.isAuthenticated) {
    //         this.setState({ isAuthenticated: false })
    //       }
    //     })
    // });

  }

  authenticate() {
    API.authenticateUser()
    .then(res => {
      console.log(res.data);
      this.setState({
        loaded: true,
        isAuthenticated: res.data.auth,
        message: res.data.message,
        user: res.data.user
      });
    })
    .catch(err => {
      console.log(err);
      // set state w/ message
      this.props.history.push('/')
    });
  }

  /*
  componentWillUnmount() {
    this.unlisten()
  }
  */

  render() {
    const { component: Component, ...rest } = this.props
    const { loaded, isAuthenticated } = this.state
    if (!loaded) return null
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }}
      />
    )
  }
}

PrivateRoute = withRouter(PrivateRoute)

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Auth} />
      <PrivateRoute exact path="/home" component={Dashboard} />
      <PrivateRoute exact path="/ideas" component={Ideas} />
      {/* <Route exact path="/ideas/:id" component={Detail} /> */}
      <PrivateRoute exact path="/projects" component={LiveProjects} />
      <PrivateRoute exact path="/projects/:id" component={ProjectDetail} user={this.state.user} />
      <PrivateRoute exact path="/profile" component={UserProfile} />
      {/* <PrivateRoute
        path='/projects/:id'
        render={() => <ProjectDetail user={this.state.user} />}
      /> */}
      {/* <Route exact path="/profile/:id" component={UserProfile} /> */}
      <Route component={NoMatch} />
    </Switch>
  </Router>
)

export default Routes
