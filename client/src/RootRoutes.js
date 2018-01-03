import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MockPreview from './mockPreview/MockPreview';
import Preview from './components/preview';

// TODO: add Help component (a modal with instructions on how to use)
const RootRoutes = () => (
    <Switch>
        <Route path="/help" component={() => <div>Help here</div>} />
        <Route path="/" component={Preview} />
    </Switch>
);

export default RootRoutes;
