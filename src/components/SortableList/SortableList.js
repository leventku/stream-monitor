import React, {useContext} from 'react';
import StreamContext from '../../contexts/StreamContext';
import styled from 'styled-components';

import ListHeader from './ListHeader'

const ListBody = styled.div``;
const Button = styled.button``;
const ListElement = styled.li`
	list-style-type: none;
`;

const SortableList = ({listItems, getMoreData}) => {
	const context = React.useContext(StreamContext)
	const sortedList = JSON.parse(JSON.stringify(listItems))
	if (context.sortOrder === 'date') {
		sortedList.sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate))
	}
	if (context.sortOrder === 'status') {
		sortedList.sort((a, b) => ((a.status < b.status) ? -1 : (a.status > b.status) ? 1 : 0))
	}
	return (
		<>
			<ListHeader></ListHeader>
			<ListBody>
				<ul>
					{sortedList.map(item => <ListElement key={item.id}>#{item.id} {new Date(item.fromDate).toLocaleString()} {item.status}</ListElement>)}
				</ul>
				<Button onClick={() => {
					getMoreData(context.lastRevealedPage + 1)
				}}>Load More</Button>
			</ListBody>
		</>
	)
};

export default SortableList;
