import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import "./merchant.scss"

export function html() {
  const {
    columns,
    rowsWithId,
    isLoading,
  } = this.state;

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h1 style={{ color: '#264d73', fontSize: '22px', fontFamily: 'sans-serif', margin: '0' }}>Merchant Summary</h1>
        <Button className='downloadButton' variant="outlined" onClick={''} style={{ position: 'absolute', right: '10px', width: '250px' }}>
          Add New
        </Button>
      </div>
      <div>
        <hr className='divider' style={{ border: '1px solid #264d73', width: '100%' }} />
      </div>
      <div style={{ height: '380px', width: '100%', overflowY: 'auto' }}>
        <DataGrid
          rows={rowsWithId}
          columns={columns}
          className="custom-data-grid"
          pagination
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          loading={isLoading}
          pageSizeOptions={[ { value: -1, label: 'All' },5, 10]}
          disableColumnMenu
          disableColumnFilter
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </div>
      <Button className="downloadButton" variant="contained" onClick={this.handleDownloadClick} 
      style={{ background: '#264d73', marginTop: '-4.7%', marginLeft: '92%' }}>
        Download
      </Button>
    </div>
  );
}
