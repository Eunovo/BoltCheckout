import { FC } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GetInvoicesResponse } from '../../types';

const formatter = new Intl.NumberFormat('en-Us', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const columns: GridColDef<GetInvoicesResponse['data']['results'][number]>[] = [
  {
    field: 'buyer',
    headerName: 'Buyer Name',
    width: 300,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.value.firstName} ${params.value.lastName}`,
  },
  {
    field: 'buyerEmail',
    headerName: 'Buyer Email',
    width: 200,
    valueGetter: (params: GridValueGetterParams) => params.row.buyer.email,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150,
    valueGetter: (params) =>
        params.row.payments[0]
            ? `${params.row.payments[0].value} mSat`
            : '-- --'
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    valueGetter: (params: GridValueGetterParams) => params.value.status,
  },
  {
    field: 'lastActivityTime',
    headerName: 'Last Updated At',
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
        new Date(params.row.status.date).toDateString()
  }
];

export const InvoicesTable: FC<{ rows: GetInvoicesResponse['data']['results'] }> = ({ rows }) => {
  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id ?? ''}
      />
    </div>
  );
}
