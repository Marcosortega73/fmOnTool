import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import SearchIcon from "@mui/icons-material/Search";
import AuthService from "../../services/api/auth/authService";

import { logout} from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./styles-components/SearchBar";

import "./navBar.css";

import logo from "../../assets/images/entherprise/logo.png";

import { Link, NavLink } from "react-router-dom";

const pages = [
  "Inicio",
  "Torneos Y Competencias",
  "El Comunitario",
  "Apuestas",
  "Conviertete en Manager",
  "Ligas del Mundo",
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: (theme.palette.mode = "#292c31"),
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "73px",
  marginTop: "10px",
  maxWidth: "100%",
}));

const PREFIX = "MyCard";
const classes = {
  root: `${PREFIX}-root`,
  cta: `${PREFIX}-cta`,
  content: `${PREFIX}-content`,
};

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const NavBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    const handleLogout = (e) => {
        dispatch(logout())
          .unwrap()
          .then(() => {
            navigate("/inicio");
          })
          .catch(() => {
            console.log("Error");
          });
    }

  return (
    <>
      <AppBar position="static">
        <Paper
          sx={{
            margin: "0",
            maxWidth: "1",
            flexGrow: 1,
            fontSize: ".5rem",
            backgroundColor: (theme) => (theme.palette.mode = "#1A2027"),
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Link to="/">
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={logo} />
                </ButtonBase>
              </Link>
            </Grid>
            <Grid item xs={12} sm container sx={{ mt: 2 }}>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Buscar…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>

                  <Toolbar
                    disableGutters
                    className="paralelogramo"
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      height: "40%",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      backgroundColor: "#292c31",
                      width: "100%",
                      mt: "20px",
                    }}
                  >
                    {/* CELULAR */}
                    <Box
                      sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {pages.map((page,index) => (
                          <MenuItem
                            key={index}
                            onClick={handleCloseNavMenu}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <NavLink
                              to={`/${page.toLowerCase().replaceAll(" ", "")}`}
                            >
                              <Typography
                                sx={{ fontSize: ".8rem" }}
                                textAlign="center"
                              >
                                {page}
                              </Typography>
                            </NavLink>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                    {/* PANTALLA COMPLETA */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexGrow: 1,
                      }}
                    >
                      {pages.map((page,index) => (
                        <NavLink
                          sx={{}}
                          to={`/${page.toLowerCase().replaceAll(" ", "-")}`}
                          key={index}
                        >
                          <Button
                         
                            onClick={handleCloseNavMenu}
                            sx={{
                              color: "white",
                              display: "block",
                              fontSize: ".8rem",
                            }}
                          >
                            {page}
                          </Button>
                        </NavLink>
                      ))}
                    </Box>
                  </Toolbar>
                </Grid>
              </Grid>

              {

                !isLoggedIn ? (
                    <>
                <Grid >
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
                          border:"2px solid #b0bec5",
    
                        '&:hover': {
                            backgroundColor: "#cca500",
                            color: "#1e2024",
                            boxShadow: '-2px -2px 14px 1px rgba(245, 245, 245, 0.75)',
                        }
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
                          border:"2px solid #1e2024",
    
                        '&:hover': {
                            backgroundColor: "#cca500",
                            color: "#1e2024",
                            boxShadow: '-2px -2px 14px 1px rgba(245, 245, 245, 0.75)',
                            border:"2px solid #b0bec5",
                        }
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Grid>
                </>) : (<>
                    <Grid item >
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
                                border:"2px solid #1e2024",
                                '&:hover': {
                                    backgroundColor: "#cca500",
                                    color: "#1e2024",
                                    boxShadow: '-2px -2px 14px 1px rgba(245, 245, 245, 0.75)',
                                    border:"2px solid #b0bec5",
                                }
                            }}
                        >
                            <ModeEditOutlineIcon/>
                        </Button>
                    </Link>
                    </Grid>
                <Grid item >
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
                                border:"2px solid #1e2024",
                                '&:hover': {
                                    backgroundColor: "#cca500",
                                    color: "#1e2024",
                                    boxShadow: '-2px -2px 14px 1px rgba(245, 245, 245, 0.75)',
                                    border:"2px solid #b0bec5",
                                }
                            }}
                        >
                            <Avatar sx={{ bgcolor: "#1e2024", color:"white", width: 24, height: 24 }}>P</Avatar>
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
                                border:"2px solid #1e2024",
                                '&:hover': {
                                    backgroundColor: "#cca500",
                                    color: "#1e2024",
                                    boxShadow: '-2px -2px 14px 1px rgba(245, 245, 245, 0.75)',
                                    border:"2px solid #b0bec5",
                                }
                            }}
                        >
                           <ExitToAppIcon/>
                        </Button>
                </Grid>
                </>)

              }
             
            </Grid>
          </Grid>
        </Paper>
      </AppBar>
    </>
  );
};
export default NavBar;
