import React from 'react'
import PerPageSelector from '../Navigation/PerPageSelector';
import Pagination from '../Navigation/Pagination';
import './Table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MaterialTable from './MaterialTable';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';

const FullTable = () => {

const themeColor = useSelector(state => state.themeColor)
  console.warn = console.error = () => { };
  return (
    <div style={{
      textAlign: 'center',
      width: '100%',
    }}>
      <div>
        <Box width="95%" mt={+5} boxShadow={50}>
          <div style={{ border: themeColor==='red' ? '2px solid red ' : themeColor==='blue' ? '2px solid darkblue ' :  '2px solid green ' }}>
            <MaterialTable />
          </div>
        </Box>
        <Box width="95%" mb={+5} mt={3} boxShadow={50}>
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