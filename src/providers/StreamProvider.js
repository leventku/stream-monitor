import React, { Component } from 'react';

import StreamContext from '../contexts/StreamContext';

class StreamProvider extends Component {
    state = {
		selectedIndex : -1,
		lastRevealedPage: -1,
		setNextPage: () => {
			const newPage = this.state.lastRevealedPage + 1;
			this.setState({lastRevealedPage: newPage});
		},
		sortOrder: '',
		setOrder: (val) => {
			this.setState({sortOrder: val})
	    }
	}
	render() {
        return <StreamContext.Provider value={this.state}>
     		{this.props.children}
      	</StreamContext.Provider>
    }
}

export default StreamProvider;
