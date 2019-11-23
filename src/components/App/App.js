import React from 'react';
import { StreamProvider } from '../../contexts/StreamContext';
import StreamMonitor from '../StreamMonitor';

const App = () => {
  return (
    <StreamProvider>
      <StreamMonitor />
    </StreamProvider>
  );
};

export default App;
