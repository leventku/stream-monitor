import React from 'react';
import StreamProvider from '../../providers/StreamProvider';
import StreamMonitor from '../StreamMonitor';

const App = () => {
	return (
		<StreamProvider>
			<StreamMonitor></StreamMonitor>
		</StreamProvider>
	);
}

export default App;
