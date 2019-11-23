import React from 'react';
import styled from 'styled-components';

import { useStreamState } from '../../contexts/StreamContext';
import { localeOptions, currencyFormats, statusHash } from '../../constants';

import ListHeader from './ListHeader';

const Wrapper = styled.div`
	max-width: 800px;
`;

const ListBody = styled.div`
	height: calc(100vh - 76px);
	overflow: scroll;
`;
const Button = styled.button``;
const ListElement = styled.div`
	cursor: pointer;
	position: relative;
	padding: 10px 0;
	:hover {
		background-color: lightyellow;
	}
`;

const ItemId = styled.span``;
const ItemDate = styled.span`
	position: absolute;
	left: 100px;
`;
const ItemPrice = styled.span`
	position: absolute;
	left: 250px;
`;
const ItemDiscount = styled.span`
	padding-left: 5px;
	color: gray;
	text-decoration-line: line-through;
`;
const ItemStatus = styled.span`
	position: absolute;
	right: 0;
	padding: 6px;
	border-radius: 4px;
	:hover {
		background-color: ${props => statusHash[props.status].color};
		color: white;
	}
`;

const SortableList = ({ listItems, getMoreData }) => {
  const { sortOrder, lastRevealedPage, dataLoading } = useStreamState();
  const sortedList = JSON.parse(JSON.stringify(listItems));

  if (sortOrder === 'date') {
    sortedList.sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate));
  }
  if (sortOrder === 'status') {
    sortedList.sort((a, b) => (
      (statusHash[a.status].order < statusHash[b.status].order)
        ? -1
        : (statusHash[a.status].order > statusHash[b.status].order)
          ? 1
          : 0
    ));
  }

  return (
    <Wrapper>
      <ListHeader></ListHeader>
      <ListBody>
        {sortedList.map(item =>
          (<ListElement key={item.id}>
            <ItemId>#{item.id}</ItemId>
            <ItemDate>{new Date(item.fromDate).toLocaleString('en-GB', localeOptions)} ({(new Date(item.toDate) - new Date(item.fromDate)) / 3600 / 24 / 1000}d)</ItemDate>
            <ItemPrice>
              {currencyFormats[item.currency].format(item.price)}
              <ItemDiscount>{item.totalDiscount ? currencyFormats[item.currency].format(item.totalDiscount) : ''}</ItemDiscount>
            </ItemPrice>
            <ItemStatus status={item.status}>{statusHash[item.status].label}</ItemStatus>
          </ListElement>)
        )}
        <Button disabled={dataLoading} onClick={() => {
          getMoreData(lastRevealedPage + 1);
        }}>Load More</Button>
      </ListBody>
    </Wrapper>
  );
};

export default SortableList;
