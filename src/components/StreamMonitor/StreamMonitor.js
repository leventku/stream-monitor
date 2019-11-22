import React, { useContext, useEffect, useState } from 'react';
import SortableList from '../SortableList'

import {useStreamDispatch, useStreamState, getWithPageNumber} from '../../contexts/StreamContext';

const StreamMonitor = props => {
	const {latestData} = useStreamState()
	const dispatch = useStreamDispatch()
	
	const getMoreData = page => getWithPageNumber(dispatch, page)

	useEffect(() => {
		getMoreData(0)
	}, [])
	
	return <SortableList listItems={latestData} getMoreData={getMoreData}></SortableList>
}

export default StreamMonitor;
