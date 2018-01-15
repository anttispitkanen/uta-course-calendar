import React from 'react';
import { Route } from 'react-router-dom';

import Preview from './components/preview';
import HowToUse from './components/howToUse/HowToUse';
import Help from './components/help/Help';

const RootRoutes = () => (
    <div>
        <Route path="/" component={Preview} />
        <Route path="/help" component={Help} />
        <Route path="/howto" component={HowToUse} />
    </div>
);

export default RootRoutes;
