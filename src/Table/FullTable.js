import React from 'react'
import PerPageSelector from '../Navigation/PerPageSelector';
import Pagination from '../Navigation/Pagination';
import './Table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MaterialTable from './MaterialTable';
import Box from '@material-ui/core/Box';

const FullTable = () => {

  console.warn = console.error = () => { };
  return (
    <div style={{
      textAlign: 'center',
      margin: 'auto',
      width: '90%',
      padding: '10px'
    }}>
      <div>
        <Box width="95%" mt={+5}>
          <div style={{
            borderLeft: '2px solid grey',
            borderRight: '2px solid grey',
            borderBottom: '2px solid grey'
          }}>
            <MaterialTable />
          </div>
        </Box>
        <Box width="95%" mb={+5} mt={3}>
          <div class='Wrapper'>
            <Pagination />
            <PerPageSelector />
          </div>
        </Box>
      </div>
    </div>
  )
}

export default FullTable;