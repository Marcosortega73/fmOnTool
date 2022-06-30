import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
//CONSTRUCCION DEL FORM
import { useForm } from "react-hook-form";
import { FormText } from "../../../../components/forms/imputs/FormText";
import { FormSelect } from "../../../../components/forms/imputs/FormSelect";
import { Container, FormControl, Grid } from "@mui/material";

import equiposServices from "../../../../services/api/equipos/equiposServices";

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

export default function DialogComponentEquipos(props) {
  const { open, setOpen, setLoading,managers,torneos } = props;
  const { nations } = useSelector((state) => state.nacionalidad);






  const handleClose = () => {
    setOpen(false);
  };
  console.log("managers", managers);
  console.log("torneos", torneos);
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
      manager_id: 0,
      torneo_id: 0,
    },
  });

  console.log("nations", nations);

  const onSubmit = (formValue) => {
    console.log(formValue);
    equiposServices.createEquipos(formValue);
     setOpen(false);  
     setLoading(true);     
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
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
        </AppBar>
        <Container sx={{ mt: 5 }}>
          <FormControl fullWidth>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item >
                  <Item>
                  <h4>ID Equipo</h4>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="id"
                      rulesBol={true}
                      labelText="ID Equipo"
                      type="number"
                    />
                  </Item>
                </Grid>
                <Grid item>
                  <Item>
                  <h4>Nombre</h4>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="nombre"
                      rulesBol={true}
                      labelText="Nombre"             
                      type="text"
                    />
                  </Item>
                </Grid>
                <Grid item >
                  <Item>
                  <h4>Nacionalidad</h4>
                    <FormSelect
                      control={control}
                      errors={errors}
                      register={register}
                      name="nacionalidad"
                      rulesBol={true}
                      labelText="Nacionalidad"
                      opcion={nations.nations}
                    />
                  </Item>
                </Grid>

                <Grid item>
                <Item>
                    <h4>Managers</h4>
                    <FormSelect
                      control={control}
                      errors={errors}
                      register={register}
                      name="manager_id"
                      rulesBol={true}
                      labelText="Manager"
                      opcion={managers}
                    />
                  </Item>
                </Grid>
                <Grid item>
                <Item>
                    <h4>Torenos</h4>
                    <FormSelect
                      control={control}
                      errors={errors}
                      register={register}
                      name="torneo_id"
                      rulesBol={true}
                      labelText="Torneo"
                      opcion={torneos}
                      multiple={true}
                    />
                  </Item>
                </Grid>
    

              </Grid>
            </form>
          </FormControl>
        </Container>
      </Dialog>
    </div>
  );
}
