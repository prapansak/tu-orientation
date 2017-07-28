import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/dashboard' component={Dashboard}></Route>
                    <Route component={Home}></Route>
                </Switch>
            </Router>
        )
    }
}

