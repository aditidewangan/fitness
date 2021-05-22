import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Content from "./Components/Content";
import logo from './logo.svg';
import './App.css';
import Admin from "./Components/Admin";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Router>
				<div>
				<Switch>
					<Route exact path="/login" component={Login}></Route>
					<Navbar>
						<Route
							exact
							path="/"
							component={Content}></Route>
						<Route
							exact
							path="/admin"
							component={Admin}></Route>
						</Navbar>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
