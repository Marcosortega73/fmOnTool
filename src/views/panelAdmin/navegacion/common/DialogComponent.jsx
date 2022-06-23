import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";

//CONSTRUCCION DEL FORM
import { useForm } from "react-hook-form";
import { FormText } from "../../../../components/forms/imputs/FormText";
import { FormSelect } from "../../../../components/forms/imputs/FormSelect";
import { Container, FormControl, Grid } from "@mui/material";
import jugadoresServices from "../../../../services/api/jugadores/jugadoresService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogComponent(props) {
  const { open, setOpen, setLoading, equipos } = props;
  const { nations } = useSelector((state) => state.nacionalidad);


  const handleClose = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      nombre: "",
      nacionalidad:0,
      equipo: 0,
      altura: 0,
      peso: 0,
      ca: 0,
      cp: 0,
      valor: 0,
    },
  });

  console.log("nations", nations);

  const onSubmit = (formValue) => {
    console.log(formValue);
    jugadoresServices.createJugadorService(formValue);
     setOpen(false);  
     setLoading(true);     
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Button
              autoFocus
              color="inherit"
              onClick={handleSubmit(onSubmit)}
              endIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar> */}
        <Container sx={{ mt: 5 }}>
          <FormControl fullWidth>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Item>
                  <h4>ID Jugador</h4>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="id"
                      rulesBol={true}
                      variant="outlined"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                  <h4>Nombre</h4>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="nombre"
                      rulesBol={true}
                      variant="outlined"                   
                      type="text"
                    />
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                  <h4>Nacionalidad</h4>
                    <FormSelect
                      control={control}
                      errors={errors}
                      register={register}
                      name="nacionalidad"
                      rulesBol={true}
                      variant="outlined"
                      opcion={nations.nations}
                    />
                  </Item>
                </Grid>

                <Grid item>
                <Item>
                    <h4>EQUIPO</h4>
                    <FormSelect
                      control={control}
                      errors={errors}
                      register={register}
                      name="club"
                      rulesBol={true}
                      variant="outlined"
                      opcion={equipos}
                    />
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                  <h4>Altura</h4>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="altura"
                      rulesBol={true}
                      variant="outlined"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                  <h4>Peso</h4>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="peso"
                      rulesBol={true}
                      variant="outlined"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                  <h4>Calidad Actual</h4>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="ca"
                      rulesBol={true}
                      variant="outlined"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                  <h4>Calidad Potencial</h4>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="cp"
                      rulesBol={true}
                      variant="outlined"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                  <h4>Valor</h4>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="valor"
                      rulesBol={true}
                      variant="outlined"
                      type="number"
                    />
                  </Item>
                </Grid>
          
              </Grid>
              <Grid >
                  <Item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<SaveIcon />}
                    >
                      Guardar
                    </Button>
                  </Item>             
                </Grid>
            </form>
          </FormControl>
        </Container>
      </Dialog>
    </div>
  );
}
