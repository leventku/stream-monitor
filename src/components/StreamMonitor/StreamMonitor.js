import React, { useEffect } from 'react';
import List from '../List';

import { useStreamDispatch, useStreamState, getWithPageNumber } from '../../contexts/StreamContext';

const StreamMonitor = () => {
  const { latestData } = useStreamState();
  const dispatch = useStreamDispatch();

  const getMoreData = page => getWithPageNumber(dispatch, page);

  useEffect(() => {
    getWithPageNumber(dispatch, 0);
  }, [dispatch]);

  return <List listItems={latestData} getMoreData={getMoreData}></List>;
};

export default StreamMonitor;
