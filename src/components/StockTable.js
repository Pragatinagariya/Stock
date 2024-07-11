// src/components/StockTable.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-root': {
    border: 'none',
  },
  '& .MuiDataGrid-cell': {
    padding: '4px 8px',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#f5f5f5',
    padding: '2px 8px',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '0.8075rem',
    fontWeight: 'bold',
    maxHeight: '90px !important',
    minHeight: '40px !important',
  },
  '& .MuiDataGrid-cellContent': {
    fontSize: '0.875rem',
  },
  '& .MuiDataGrid-row': {
    maxHeight: '40px !important',
    minHeight: '40px !important',
  },
  '& .MuiDataGrid-columnHeaders': {
    minHeight: '40px !important',
    maxHeight: '40px !important',
  },
  '& .MuiDataGrid-footerContainer': {
    minHeight: '40px !important',
    maxHeight: '40px !important',
  },
}));

const StockTable = ({ rows, columns }) => {
 
  const gridColumns = columns || [];

  return (
    <div style={{ height: 600, width: '100%', margin:'10px'}}>
      <StyledDataGrid rows={rows} columns={gridColumns} pageSize={10} />
    </div>
  );
};

export default StockTable;
