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
import { visuallyHidden } from '@mui/utils';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogComponent from './common/DialogComponent';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {getNations}  from  '../../../redux/nacionalidadSlice';
import {useDispatch} from 'react-redux';
import jugadoresServices from '../../../services/api/jugadores/jugadoresService';
import equiposServices from '../../../services/api/equipos/equiposServices';
import { IconButton } from '@mui/material';

import Swal from 'sweetalert2'




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
    label: 'Nombre',
  },
  {
    id: 'nacionalidad_id',
    numeric: true,
    label: 'Nacionalidad',
  },
  {
    id: 'equipo_id',
    numeric: true,
    label: 'Equipo',
  },
  {
    id: 'altura',
    numeric: true,
    label: 'Altura',
  },
  {
    id: 'peso',
    numeric: true,
    label: 'Peso',
  },
  {
    id: 'ca',
    numeric: true,
    label: 'Calidad Actual',
  },
  {
    id: 'cp',
    numeric: true,
    label: 'Calidad Potencial',
  },
  {
    id: 'valor',
    numeric: true,
    label: 'Valor',
  },
  {
    id: 'actions',
    numeric: true,
    label: 'Acciones',
  },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };



  return (
    <TableHead
    sx={{
      backgroundColor:"#292c31",
      color: '#fff',
      
      '& th': {
        color: '#fff',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '0.5rem',
        borderBottom: '1px solid #fff',
        '&:hover': {
          backgroundColor: '#fff',
          color: '#292c31',
        },
        '&:active': {
          backgroudColor: '#fff',
          color: '#292c31',
        },
        '&:focus': {
          backgroundColor: '#fff',
          color: '#292c31',
        }

      },
      '.css-1f12udi-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active': {
        backgroundColor: '#fff',
        color: '#292c31',
        padding: '0.5rem',   
      }
    
    }}>
      <TableRow
      sx={{
        'th': {
          '&:active': {
            backgroudColor: 'red',
            color: '#fff',
          },
          '&:focus': {
            backgroundColor: 'red',
            color: '#fff',
          }
          },
        '.css-1s5sh37-MuiTableRow-root th': {
          backgroundColor: 'red',
        }
        
      }}>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{color:'#fff'}}
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
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              cursor: 'pointer',
              '&:active': {
                backgroundColor: '#fff',
                color: '#292c31',
              },
            }}

          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                cursor: 'pointer',
                fontSize: '0.8rem',
                '&:hover': {
                  color: 'primary',
                },
              }}
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
          {numSelected} Jugadores seleccionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Jugadores
        </Typography>
        
      )}
     
      
    </Toolbar>
    </>

  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Jugadores() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nombre');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);



  const [openDialog,setOpenDialog] = React.useState(false);
  const [jugadores , setJugadores] = React.useState([])

  const [jugadorSelect, setJugadorSelect] = React.useState({
    id: 0,
    nombre: "",
    nacionalidad:[],
    equipo: 0,
    altura: 0,
    peso: 0,
    ca: 0,
    cp: 0,
    valor: 0,
  })

  const [actionSelect, setActionSelect] = React.useState('');
  const [equipos , setEquipos] = React.useState([])


  const [loading,setLoading] = React.useState(true);
  const dispatch = useDispatch();
  
  
  const getEquipos = async () =>{
    const {clubes} = await equiposServices.getEquipos();
    setEquipos(clubes)
    console.log("Holas",clubes);
}

  const getJugadores = async () =>{
      const players = await jugadoresServices.getJugadoresService();
      console.log(players);
      setJugadores(players)
      console.log(jugadores);
      setLoading(false);
  } 
 

  React.useEffect(() => {
    dispatch(getNations());
    getEquipos()
    getJugadores()  
  }
  ,[loading]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleJugadorSelect = (jugador,action) => {
    setActionSelect(action)

    if(action === 'edit'){
      setJugadorSelect({
        id: jugador.id,
        nombre: jugador.nombre,
        nacionalidad: jugador.Nacionalidad.id,
        equipo: jugador.Equipo.id,
        altura: jugador.altura,
        peso: jugador.peso,
        ca: jugador.ca,
        cp: jugador.cp,
        valor: jugador.valor,
      })
    }
    else if (action === 'ver'){
      setJugadorSelect({
        id: jugador.id,
        nombre: jugador.nombre,
        nacionalidad: jugador.Nacionalidad.nombre,
        equipo: jugador.Equipo.nombre,
        altura: jugador.altura,
        peso: jugador.peso,
        ca: jugador.ca,
        cp: jugador.cp,
        valor: jugador.valor,
      })
    }
    handleOpenDialog()
  }
 const handleCreateJugador = () => {
    setActionSelect('create')
    setJugadorSelect({})
    handleOpenDialog()
 }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = jugadores.map((n) => n.nombre);
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

  const handleDelete = async (id) => {
    console.log("ID DE JUGADOR",id);
    Swal.fire({
      title: 'Advertencia',
      text: '¿ Esta seguro que desea eliminar el jugador ?',
      icon: 'warning',
      iconColor: '#e8b71c',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      confirmButtonColor: '#1e2024',
      cancelButtonText: 'No, Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
       const res = await jugadoresServices.deleteJugadorService(id);
       console.log("QUE ONDA",res);

        if(res.status === 200){
          await getJugadores()
        Swal.fire(
          'Eliminado!',
        `${res.message}`,
          'success'
        )
        }
        else{
          Swal.fire(
            'Error!',
            'El jugador no ha sido eliminado. Ocurrio un error en el servidor',
            'error'
          )
        }
      }
    })
  }




  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%',borderBottom:"none",  }}>
      <Paper sx={{ width: '100%', mb: 2,  borderBottom:"none",   boxShadow: "1px 1px 4px 2px rgba(0,0,0,0.45)",}}>
        <Box > 
        <div style={{display:"flex", justifyContent:"space-between" , paddingTop:32}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Tooltip title="Agregar Jugador">
        <Button onClick={handleCreateJugador} variant="contained" endIcon={<AddCircleIcon />}>
          Crear jugador
        </Button>
        </Tooltip>
        </div>
        </Box>

        <Paper sx={{mt:4, borderTop:"solid 2px #546e7a",borderBottom:"none"}}> 

        <TableContainer >
         
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
              rowCount={jugadores.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(jugadores, getComparator(order, orderBy))
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
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.nombre&&row.nombre}</TableCell>
                      <TableCell align="left">{row.Nacionalidad&&row.Nacionalidad.nombre}</TableCell>
                      <TableCell align="left">{row.Equipo&&row.Equipo.nombre}</TableCell>
                      <TableCell align="left">{row.altura+"cm"}</TableCell>
                      <TableCell align="left">{row.peso+"kg"}</TableCell>
                      <TableCell align="left">{row.ca}</TableCell>
                      <TableCell align="left">{row.cp}</TableCell>
                      <TableCell align="left">{"€ "+row.valor}</TableCell>
                      <TableCell align="left">
                        <Tooltip title="Ver">

                          <IconButton aria-label="ver" onClick={() => handleJugadorSelect(row,"ver")}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Editar">
                          <IconButton aria-label="edit" onClick={() => handleJugadorSelect(row, "edit")}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                          <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>


                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={jugadores.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Filas por página"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{borderBottom:"none"}}
        />
        </Paper>
      </Paper>
      <DialogComponent open={openDialog} setOpen={setOpenDialog} jugador={jugadorSelect} setJugadorSelect={setJugadorSelect} action={actionSelect} equipos={equipos} setLoading={setLoading} />
    </Box>
  );
}
