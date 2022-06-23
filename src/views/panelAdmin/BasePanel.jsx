import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { Link } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import FiberNewIcon from '@mui/icons-material/FiberNew';

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const drawerWidth = 240;

export default function BasePanel() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const optionesPanel  = ["Dashboard", "Jugadores", "Managers", "Equipos", "Partidos", "Estadisticas","Torneos"];
  const opcionesPanelSecond = ["El Comunitario", "Apuestas", "Ligas del Mundo"];	

  const handleLogout = (e) => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/inicio");
      })
      .catch(() => {
        console.log("Error");
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="h6" noWrap component="div">
            Panel de Administracion
          </Typography>
       <Grid container>

        {!isLoggedIn ? (
          <>
         
            <Grid>
              <Link to="/login" sx={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    backgroundColor: "#1e2024",
                    color: "#b0bec5",
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px",
                    margin: "0",
                    marginRight: "10px",
                    border: "2px solid #b0bec5",

                    "&:hover": {
                      backgroundColor: "#cca500",
                      color: "#1e2024",
                      boxShadow: "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            </Grid>

            <Grid item sx={{ height: "50%" }}>
              <Link to="/register">
                <Button
                  sx={{
                    backgroundColor: "#b0bec5",
                    color: "#1e2024",
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px",
                    margin: "0",
                    marginRight: "10px",
                    border: "2px solid #1e2024",

                    "&:hover": {
                      backgroundColor: "#cca500",
                      color: "#1e2024",
                      boxShadow: "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                      border: "2px solid #b0bec5",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Link to="/panelAdministracion">
                <Button
                  sx={{
                    backgroundColor: "#b0bec5",
                    color: "#1e2024",
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px",
                    margin: "0",
                    marginRight: "10px",
                    border: "2px solid #1e2024",
                    "&:hover": {
                      backgroundColor: "#cca500",
                      color: "#1e2024",
                      boxShadow: "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                      border: "2px solid #b0bec5",
                    },
                  }}
                >
                  <ModeEditOutlineIcon />
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/profile">
                <Button
                  sx={{
                    backgroundColor: "#b0bec5",
                    color: "#1e2024",
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px",
                    margin: "0",
                    marginRight: "10px",
                    border: "2px solid #1e2024",
                    "&:hover": {
                      backgroundColor: "#cca500",
                      color: "#1e2024",
                      boxShadow: "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                      border: "2px solid #b0bec5",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#1e2024",
                      color: "white",
                      width: 24,
                      height: 24,
                    }}
                  >
                    P
                  </Avatar>
                </Button>
              </Link>
            </Grid>
            <Grid>
              <Button
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#b0bec5",
                  color: "#1e2024",
                  borderRadius: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px",
                  margin: "0",
                  marginRight: "10px",
                  border: "2px solid #1e2024",
                  "&:hover": {
                    backgroundColor: "#cca500",
                    color: "#1e2024",
                    boxShadow: "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
                    border: "2px solid #b0bec5",
                  },
                }}
              >
                <ExitToAppIcon />
              </Button>
            </Grid>
          </>
        )}
        </Grid>
         </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {optionesPanel.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <SwitchLeftIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {opcionesPanelSecond.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <FiberNewIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}
