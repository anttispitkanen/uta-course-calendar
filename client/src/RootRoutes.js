import React from 'react';
import { Route } from 'react-router-dom';

import Preview from './components/preview';
import HowToUse from './components/howToUse/HowToUse'

// TODO: add Help component (a modal with instructions on how to use)
// TODO: add How to use component with use instructions
const RootRoutes = () => (
    <div>
        <Route path="/" component={Preview} />
        <Route path="/help" component={() => <div>Help here</div>} />
        <Route path="/howto" component={HowToUse} />
    </div>
);

export default RootRoutes;
