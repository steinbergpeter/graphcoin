import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import type { ColDef } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import type {
  TransformedTradesResponse,
  TransformedTrade,
} from '../../api/types'
import styles from '../../styles/styles'

ModuleRegistry.registerModules([AllCommunityModule])

type Props = {
  data: TransformedTradesResponse | undefined
}

const LatestTradesGrid = ({ data }: Props) => {
  const [colDefs] = useState<ColDef<TransformedTrade>[]>([
    { field: 'Exchange', filter: true },
    { field: 'Market Type', filter: true },
    { field: 'Base Asset', filter: true },
    { field: 'Quote Asset', filter: true },
    { field: 'Price' },
    { field: 'Size' },
    { field: 'Taker Side', filter: true },
  ])

  const [rowData, setRowData] = useState<TransformedTrade[]>([])

  useEffect(() => {
    if (data) {
      setRowData(data)
    }
  }, [data])

  const defaultColDef: ColDef = {
    flex: 1,
  }

  return (
    <Box sx={styles.tableHolder}>
      <AgGridReact
        rowData={rowData}
        rowHeight={40}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={false}
        animateRows={true}
        suppressMovableColumns={false}
        suppressRowDrag={true}
        scrollbarWidth={10}
        suppressHorizontalScroll={false} // Ensures horizontal scrolling is enabled
        suppressAutoSize={false} // Prevents automatic column resizing
      />
    </Box>
  )
}

export { LatestTradesGrid }
