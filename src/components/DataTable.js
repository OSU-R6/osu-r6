import * as React from 'react'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton
} from '@mui/x-data-grid'
import { 
  createTheme, 
  ThemeProvider, 
  styled
} from '@mui/material/styles'

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  )
}

const theme = createTheme({
  palette: {
    mode: 'dark', // Set the desired mode for your component
    osu: {
      main: '#DC4405', // Example: Custom primary color
    },
    text: {
      osu: 'rgba(0,0,0,0.85)',
    },
    // Define your custom color palette for the component's theme
  },
  // Additional customizations for the component's theme
})

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: 'rgba(255,255,255,0.85)',
  button: {
    color:  '#DC4405',
  },
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `0px solid #303030`
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid #303030`
  },
  '& .MuiDataGrid-cell': {
    color: 'rgba(255,255,255,0.65)'
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0
  }
}))


const DataTable = ({rows, columns, getRowId}) => {

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log(error.message)
  }, [])

  return (
    <div style={{ width: '100%' }} id="data-table">
      <ThemeProvider theme={theme}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          getRowId = {getRowId}
          slots={{
            toolbar: CustomToolbar
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </ThemeProvider>
    </div>
  )
}
export default DataTable