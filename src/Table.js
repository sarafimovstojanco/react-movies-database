import React from 'react'
import TableData from './TableData';
import TableHeader from './TableHeader.js';
import PerPageSelector from './PerPageSelector';
import Pagination from './Pagination';
import './Table.css'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
      <Pagination/>
      <PerPageSelector/>
    </div>
  )
}

export default Table;