import React, { useContext, useEffect, useState } from 'react';
import SortableList from '../SortableList'

import {getWithPageNumber} from '../../services/transactions';

import StreamContext from '../../contexts/StreamContext';

const StreamMonitor = props => {
	const [data, setData] = useState([]);
	const context = useContext(StreamContext);
	
	const getMoreData = (page) => {
		return getWithPageNumber(page).then((newData) => {
			if (newData) {
				setData(prevData => [...prevData, ...newData]);
				context.setNextPage();
			}
		})
	}

	useEffect(() => {
		getMoreData(0)
	}, [])
	
	return <SortableList listItems={data} getMoreData={getMoreData}></SortableList>
}

export default StreamMonitor;
