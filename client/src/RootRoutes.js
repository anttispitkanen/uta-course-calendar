import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Preview from './components/preview';

// TODO: add Help component (a modal with instructions on how to use)
// also it should not be a switch but an overlaying component
const RootRoutes = () => (
    <Switch>
        <Route path="/help" component={() => <div>Help here</div>} />
        <Route path="/" component={Preview} />
    </Switch>
);

export default RootRoutes;
