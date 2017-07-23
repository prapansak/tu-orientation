import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route component={Home}></Route>
                </Switch>
            </Router>
        )
    }
}

