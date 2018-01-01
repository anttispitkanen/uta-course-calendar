import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MockPreview from './mockPreview/MockPreview';

// TODO: add Help component (a modal with instructions on how to use)
const RootRoutes = () => (
    <Switch>
        <Route path="/help" component={() => <div>Help here</div>} />
        <Route path="/" component={MockPreview} />
    </Switch>
);

export default RootRoutes;
