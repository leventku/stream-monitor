import React, { useContext } from 'react';

import styled from 'styled-components';

import {useStreamDispatch} from '../../contexts/StreamContext';

const Select = styled.select`
	appearance: none;
	border: none;
	font-size: 1.1em;
	outline: none;
	color: black;
	padding: 6px;
	background-color: #ffb03b;
`
const DropdownHolder = styled.div`
	background-color: #ffb03b;
	display: block;
	border: 1px solid black;
	color: black;
	border-radius: 5px;
	::after {
		content: '▼';
		display: inline-block;
		padding-right: 6px;
	}
`;
const Dropdown = props => {
	const dispatch = useStreamDispatch()
	return (
		<DropdownHolder>
			<Select defaultValue="default" onChange={(e) => {dispatch({type: 'sortOrderChange', payload: e.currentTarget.value})}}>
				<option value="default" disabled>{props.children}</option>
				{props.options.map(val => (
					<option key={val} value={val}>{val[0].toUpperCase() + val.substr(1)}</option>
				))}
			</Select>
		</DropdownHolder>
	)
}

export default Dropdown;
