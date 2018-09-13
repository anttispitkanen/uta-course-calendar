import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// always redirect to HTTPS in production
if (process.env.NODE_ENV === 'production') {
  const { protocol, hostname, port, pathname } = window.location;
  if (protocol !== 'https:') {
    window.location.replace(
      'https://' + hostname + (port ? ':' + port : '') + pathname,
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
