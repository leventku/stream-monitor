import React from 'react';
import styled from 'styled-components';

import logo from '../../../pub/logo.svg';
import Dropdown from '../Dropdown';

const Title = styled.div``;
const Text = styled.p`
  display: inline-block;
  width: 60px;
  padding: 0 10px;
  margin: 0;
`;
const Logo = styled.img`
  width: 50px;
  display: inline-block;
`;
const ListHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ListHeader = () => (
  <ListHeaderWrapper>
    <Title>
      <Logo src={logo}></Logo>
      <Text>Stream Monitor</Text>
    </Title>
    <Dropdown options={['date', 'status']}>Sort by</Dropdown>
  </ListHeaderWrapper>
);

export default ListHeader;
