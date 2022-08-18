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
import grafico from "../../../../assets/images/jugadores/analisisGraficoAtributos.png"

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/system";

import Silueta from "../../../../assets/images/persons/silueta.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Img = styled("img")({
  width: "33%",
  height: "33%",
});

const ImgSm = styled("img")({
  width: "10%",
  height: "10%",
});

const ImgLogo = styled("img")({
  width: "33%",
  height: "33%",
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  height: 123,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

export default function DialogJugadorDetails({ open, setOpen, jugador }) {
  console.log("Mirando Jugador en el Cliente Detail", jugador);

  const handleClose = () => {
    setOpen(false);
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
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {jugador?.nombre}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <AppBar position="static">
          <StyledToolbar>
            <Grid container spacing={3} sx={{ maxHeight: 200 }}>
              <Grid item xs={4}>
                <Item>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: 123,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          Datos Personales
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Nombre: </strong>
                          {jugador?.nombre}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Edad: </strong>
                          {jugador?.edad + " años"}
                        </Typography>

                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                          sx={{ display: "flex", pt: 0.1 }}
                        >
                          <strong>Nacionalidad: </strong>
                          <ImgSm
                            sx={{ px: 1 }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png"
                            alt="Bandera Nacion"
                          />
                          <span>
                            {jugador?.Nacionalidad?.gentilicio?.toUpperCase()}
                          </span>
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image="https://pbs.twimg.com/media/Bryrze3IAAEj7oU.png"
                      alt="Face Jugador"
                    />
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: 123,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          Contratado por
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          {" "}
                          <strong>Equipo: </strong>
                          {jugador?.Equipo?.nombre}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Liga: </strong>
                          Ligue 1
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                          sx={{ display: "flex", pt: 0.1 }}
                        >
                          <strong>Pais: </strong>
                          <ImgSm
                            sx={{ px: 1 }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/270px-Flag_of_France.svg.png"
                            alt="Nacionalidad Equipo"
                          />
                          <span>
                            {jugador?.Equipo?.Nacionalidad?.nombre?.toUpperCase()}
                          </span>
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image="https://assets.stickpng.com/images/580b57fcd9996e24bc43c4d8.png"
                      alt="Logo Equipo"
                    />
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: 123,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          Ojeo Rapido
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <strong>Posiciones: </strong>
                          {jugador?.posiciones}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          {/* TODO: Agregar pie como atributo del jugador  */}
                          <strong>Pierna Buena: </strong>
                          Zurda
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                          sx={{ display: "flex" }}
                        >
                          <strong style={{ paddingRight: "3px" }}>
                            Altura:{" "}
                          </strong>
                          <span>{jugador?.altura + " cm"}</span>
                          <strong
                            style={{ paddingLeft: "7px", paddingRight: "3px" }}
                          >
                            Peso:{" "}
                          </strong>
                          <span>{jugador?.peso + " kg"}</span>
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardContent>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alingItem: "center",
                        }}
                      >
                        <Chip
                          variant="filled"
                          color="secondary"
                          sx={{ mb: 2 }}
                          label={"Calidad Actual: " + jugador?.ca}
                        />
                        <Chip
                          variant="filled"
                          color="secondary"
                          label={"Calidad Potencial: " + jugador?.cp}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Item>
              </Grid>
            </Grid>
          </StyledToolbar>
        </AppBar>
        <Box sx={{
        width:"100%",mt:3,
        height:"100%"
        }}>
          <Grid container spacing={3} 
          sx={{
            width:"100%",
            height:"100%"
            }}>
            <Grid item xs={4}>
              <Item  sx={{
            width:"100%",
            height:"100%"
            }}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={grafico}
                    alt="Grafico Atributos"
                  />
                </Card>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item  sx={{
            width:"100%",
            height:"100%"
            }}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Item sx={{
                  width:"100%",
                    height:"100%",
                    mr:2
                    }  }>
                  <CardContent>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alingItem: "center",
                        }}
                      >
                        <Chip
                          variant="filled"
                          color="secondary"
                          sx={{ mb: 2 }}
                          label={"Calidad Actual: " + jugador?.ca}
                        />
                        <Chip
                          variant="filled"
                          color="secondary"
                          label={"Calidad Potencial: " + jugador?.cp}
                        />
                      </Box>
                    </CardContent>
                    </Item>
                    <Item sx={{
                      width:"100%",
                    height:"100%",
                    mr:2
                    }  
                    }>
                  <CardContent>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alingItem: "center",
                        }}
                      >
                        <Chip
                          variant="filled"
                          color="secondary"
                          sx={{ mb: 2 }}
                          label={"Calidad Actual: " + jugador?.ca}
                        />
                        <Chip
                          variant="filled"
                          color="secondary"
                          label={"Calidad Potencial: " + jugador?.cp}
                        />
                      </Box>
                    </CardContent>
                    </Item>
                    <Item sx={{
                      width:"100%",
                    height:"100%",
                    mr:2
                      
                     } }>
                  <CardContent>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alingItem: "center",
                        }}
                      >
                        <Chip
                          variant="filled"
                          color="secondary"
                          sx={{ mb: 2 }}
                          label={"Calidad Actual: " + jugador?.ca}
                        />
                        <Chip
                          variant="filled"
                          color="secondary"
                          label={"Calidad Potencial: " + jugador?.cp}
                        />
                      </Box>
                    </CardContent>
                    </Item>

            
                </Card>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
