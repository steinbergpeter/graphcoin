import { useEffect, useState } from 'react';

import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
// import { useLatestTrades } from '../../api/hooks';
import {
  type TransformedLatestTrades,
  type TransformedTrade,
} from '../../api/types';
import { Box } from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  data: TransformedLatestTrades | undefined;
};
const LatestTradesGrid = ({ data }: Props) => {
  const [colDefs] = useState<ColDef<TransformedTrade>[]>([
    { field: 'Symbol ID', filter: true },
    { field: 'Time Exchange' },
    // { field: 'Time CoinAPI' },
    // { field: 'ID' },
    { field: 'Price' },
    { field: 'Size' },
    { field: 'Taker Side', filter: true },
  ]);

  const [rowData, setRowData] = useState<TransformedTrade[]>([]);

  useEffect(() => {
    if (data) {
      setRowData(data);
    }
  }, [data]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        border: '4px solid primary',
        borderRadius: '8px',
        backgroundColor: 'red',
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        domLayout='autoHeight'
        animateRows={true}
        suppressMovableColumns={false}
        suppressRowDrag={true}
      />
    </Box>
  );
};

export { LatestTradesGrid };
