import React from 'react'
import TableData from './TableData';
import TableHeader from './TableHeader.js';
import PerPageSelector from '../Navigation/PerPageSelector';
import Pagination from '../Navigation/Pagination';
import './Table.css'

const Table = () => {

  console.warn = console.error = () => { };
  return (
    <div class='Wrapper'>
      <table class={"table table-bordered text-center"}>
        <thead class="thead-dark">
          <TableHeader
          />
        </thead>
        <tbody>
          <TableData
          />
        </tbody>
      </table>
      <Pagination />
      <PerPageSelector />
    </div>
  )
}

export default Table;