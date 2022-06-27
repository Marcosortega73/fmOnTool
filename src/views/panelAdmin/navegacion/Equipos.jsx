import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogComponentEquipos from './common/DialogComponentEquipos';
import Button from "@mui/material/Button";

import {getNations}  from  '../../../redux/nacionalidadSlice';
import { getEquipos } from '../../../redux/equiposSlice';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import jugadoresServices from '../../../services/api/jugadores/jugadoresService';
import equiposServices from '../../../services/api/equipos/equiposServices';
// import {getJugadores} from '../../../redux/jugadoresSlice';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: true,
    label: 'Id de Jugador',
  },
  {
    id: 'nombre',
    numeric: true,
    label: 'Nombre',
  },
  {
    id: 'nacionalidad_id',
    numeric: true,
    label: 'Nacionalidad',
  },
  {
    id: 'manager_id',
    numeric: true,
    label: 'Manager',
  },
  {
    id: 'torneo_id',
    numeric: true,
    label: 'Torneo',
  },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };



  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {

  const { numSelected } = props;


  return (
    <>  
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Equipos
        </Typography>
        
      )}
     
      
    </Toolbar>
    </>

  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Equipos() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nacionalidad');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const [openDialogEquipos,setOpenDialogEquipos] = React.useState(false);
  const [managers , setManagers] = React.useState([])
  const [torneos , setTorneos] = React.useState([])
  const [equipos , setEquipos] = React.useState([])
  const [loading,setLoading] = React.useState(true);


  const dispatch = useDispatch();

  const getEquipos = async () =>{
    const {clubes} = await equiposServices.getEquipos();
    setEquipos(clubes)
    console.log("Holas",clubes);
}
const getTorneos = async () =>{

  setTorneos([{
    id:1,
    nombre:"Torneo 1",
    tipo:"Liga",
    nacionalidad:"Argentina",
    total_equipos:10,
    total_grupos:2,
    temporada:"15",
  }])
}
const getManagers = async () =>{

  setManagers([{
    id:1,
    email:"mortega@hotmail.com",
    username:"mortega",
    nombre:"Marcos",
    apellido:"Ortega",
    fecha_nacimiento:"01/01/1990",
    nacionalidad:"Argentina"
  }])
}




  React.useEffect(() => {
    dispatch(getNations());
    getEquipos()
    getTorneos()
    getManagers();
    setLoading(false);
  }
  ,[loading]);

  console.log("Equipos =>",equipos);

  const handleOpenDialogEquipos = () => {
    setOpenDialogEquipos(true);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = equipos.map((n) => n.nombre);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{display:"flex", justifyContent:"space-between"}}> 
        <EnhancedTableToolbar numSelected={selected.length} />
        <Tooltip title="Agregar Equipo">
        <Button onClick={handleOpenDialogEquipos} variant="contained" endIcon={<AddCircleIcon />}>
          Crear Equipo
        </Button>
        </Tooltip>
        </Box>
       
        <TableContainer>
         
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={equipos.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(equipos, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.nombre);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.nombre)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.nombre}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        id={labelId}
                      >
                        {row.id && row.id }
                      </TableCell>
                      <TableCell>{row&&row.nombre&&row.nombre}</TableCell>
                      <TableCell>{row && row.Nacionalidad&& row.Nacionalidad.nombre}</TableCell>
                      <TableCell>{row &&row.managers&&row.managers.nombre}</TableCell>
                      <TableCell>{row &&row.torneo&&row.torneo.nombre}</TableCell>
      
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={equipos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DialogComponentEquipos open={openDialogEquipos} setOpen={setOpenDialogEquipos} torneos={torneos} managers={managers} setLoading={setLoading} />
    </Box>
  );
}
