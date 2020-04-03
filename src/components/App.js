import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Linklist from "./linkList";
import CreateLink from "./createLink";
import Header from "./header";

import '../styles/App.css';

function App() {
	return (
		<div className="center w85">
		    <Header />
		    <div className="ph3 pv1 background-gray">
                <Switch>
                    <Route exact path="/" component={Linklist} />
                    <Route exact path="/create" component={CreateLink} />
                </Switch>
            </div>
		</div>
	);
}

export default App;
