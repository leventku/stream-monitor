import React, { useContext, useEffect, useState } from 'react';
import SortableList from '../SortableList'

import {getWithPageNumber} from '../../services/transactions';

import {useStreamDispatch} from '../../contexts/StreamContext';

const StreamMonitor = props => {
	const [data, setData] = useState([]);
	const dispatch = useStreamDispatch()
	
	const getMoreData = (page) => {
		dispatch({type: 'dataRequested'})
		return getWithPageNumber(page, () => {dispatch({type: 'dataFinished'})})
			.then((newData) => {
				if (newData) {
					setData(prevData => [...prevData, ...newData]);
					dispatch({type: 'dataArrived', payload: newData})
					dispatch({type: 'pageIncrement'})
				}
			})
	}

	useEffect(() => {
		getMoreData(0)
	}, [])
	
	return <SortableList listItems={data} getMoreData={getMoreData}></SortableList>
}

export default StreamMonitor;
