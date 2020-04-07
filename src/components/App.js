import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Linklist from "./linkList";
import CreateLink from "./createLink";
import Header from "./header";
import Login from "./login";
import Search from "./search";

import '../styles/App.css';

function App() {
	return (
		<div className="center w85">
		    <Route component={Header} />
		    <div className="ph3 pv1 background-gray">
                <Switch>
                    <Route exact path="/" component={Linklist} />
                    <Route exact path="/create" component={CreateLink} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/search" component={Search} />
                </Switch>
            </div>
		</div>
	);
}

export default App;
