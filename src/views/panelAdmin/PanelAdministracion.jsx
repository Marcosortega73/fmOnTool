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
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { Link, NavLink, Outlet } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import FiberNewIcon from "@mui/icons-material/FiberNew";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

import "./panelAdministracion.css";
import userAdminService from "../../services/api/entity/userAdminService";

const drawerWidth = 240;
let activeStyle = 
{
  textDecoration: "underline",

};

export default function PanelAdministracion({ data, dataSecond }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({
  });

  //NO PUDE HACERLO DESDE REDUX
  const user  = JSON.parse(localStorage.getItem('user'));


React.useEffect(() => {
  if (user) {
    userAdminService(user).then((response) => {
      setUserData(response);
    });

    }
}, [isLoggedIn]); // eslint-disable-line

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
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap component="div">
              Panel de Administracion
            </Typography>
            <div>
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
                            boxShadow:
                              "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
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
                            boxShadow:
                              "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
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
                            boxShadow:
                              "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
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
                            boxShadow:
                              "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
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
                          boxShadow:
                            "-2px -2px 14px 1px rgba(245, 245, 245, 0.75)",
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
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              backgroundColor: "#1A2027",
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar >
          <div style={{ display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"center", padding:"4px", margin:"4px"}}>  
              <div style={{marginBottom:"15px"}}> 
              <Avatar></Avatar>
              </div>
              <div>
              <Typography variant="h6"   >
                {user ? userData.email : "Usuario"}
              </Typography>
              </div>
              </div>
            </Toolbar>

          <Divider />
          <List>
            {data.map((item, index) => (
              <NavLink key={index} to={item.path}   style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
              <ListItem  disablePadding >
                
                  <ListItemButton className="buttonList" sx={{
                    color:"#f5f5f5",
                  }}>
                    <ListItemIcon>
                      <SwitchLeftIcon />
                    </ListItemIcon>
                    <ListItemText color="white" primary={item.name} />
                  </ListItemButton>
              
              </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {dataSecond.map((item, index) => (
              <NavLink key={index} to={item.path}   style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
              <ListItem key={index} disablePadding>
            
                  <ListItemButton sx={{
                    color:"#f5f5f5",
                  }}>
                    <ListItemIcon>
                      <FiberNewIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
              
              </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Box>
          <Outlet />
        </Box>
        </Box>
       
      </Box>
    </>
  );
}
