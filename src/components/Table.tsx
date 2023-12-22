import React, { TableHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TableI extends TableHTMLAttributes<HTMLTableElement> {};

const StyleTable = styled.table`
  width: 100%;
  th{
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: .7rem;
  }
  td{
    border-top: 1px solid rgba(0,0,0,0.1);
    padding-top: 10px;
  }
`;

const Table:React.FC<TableI> = (props) => {
  return <StyleTable {...props} />
};

export default Table;