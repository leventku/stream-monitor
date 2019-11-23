import React, { useEffect } from 'react';
import SortableList from '../SortableList';

import { useStreamDispatch, useStreamState, getWithPageNumber } from '../../contexts/StreamContext';

const StreamMonitor = () => {
  const { latestData } = useStreamState();
  const dispatch = useStreamDispatch();

  const getMoreData = page => getWithPageNumber(dispatch, page);

  useEffect(() => {
    getWithPageNumber(dispatch, 0);
  }, [dispatch]);

  return <SortableList listItems={latestData} getMoreData={getMoreData}></SortableList>;
};

export default StreamMonitor;
