import {
    CardContent,
    Container,
    FormControl,
    Grid,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import { useState,useEffect   } from "react";
  import { useForm } from "react-hook-form";
  import Button from "@mui/material/Button";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { login } from "../../redux/authSlice";
  import { clearMessage } from "../../redux/message";
  import { FormText } from "../../components/forms/imputs/FormText";
  import SnackBarComponent from "../../components/common/SnackBarComponent";
  import BackDropComponent from "../../components/common/BackDropComponent";
  import backgroundLogin from "../../assets/images/generales/login-bg.jpg";
  import InputLabel from '@mui/material/InputLabel';

  import "./login.css";



  const Login = (props) => {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [openSnackAlert, setOpenSnackAlert] = useState({
      open: false,
      message: "",
      severity: "",
    });
  
    const [backDrop, setBackDrop] = useState(false);
  
  
    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
      } = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
      });

      useEffect(() => {
        dispatch(clearMessage());
      }, [dispatch]);

      const onSubmit = (formValue) => {
       
        setLoading(true);
        dispatch(login(formValue))
          .unwrap()
          .then(() => {
            navigate("/panelAdministracion/dashboard");
          })
          .catch(() => {
            setLoading(false);
          });
      };
    
    return (
        <>
        <Container
          fixed
          sx={{
            display: "flex",
            justifyContent: "start",
            backgroundImage: `url(${backgroundLogin})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          className="container-login"
        >
          <Box
            elevation={4}
            sx={{
              bgcolor: "#546e7a40 ",
              
              height: "80%",
              width: "50%",
              borderRadius: "15px",
              boxShadow: "1px 2px 5px 3px rgba(0,0,0,0.75)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
            }}
          >
            <Typography
              sx={{ fontSize: 19, paddingTop: "10px", fontWeight: "bold" }}
              color="#1e2024"
              gutterBottom
            >
              Vuelta a los Entrenamientos
            </Typography>
            <CardContent sx={{height:"100%",   display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around", }}>
              <FormControl>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      
                    }}
                  >
                    <Grid item xs={12}>
                      <FormText
                        control={control}
                        errors={errors}
                        register={register}
                        bgcolor="#1e2024"
                        name="email"
                        rulesBol={true}
                        labelText="Ingrese su email"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormText
                        type="password"
                        control={control}
                        errors={errors}
                        register={register}
                        name="password"
                        rulesBol="true"
                        variant="outlined"
                        labelText="Ingrese su Password"
                        color="#212121"
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{
                          width: "100%",
                          height: "50px",
                          borderRadius: "15px",
                          backgroundColor: "#212121",
                          boxShadow: "1px 2px 5px 3px rgba(0,0,0,0.75)",
                          border: "1px solid #ccc",
                          marginTop: "10px",
                          marginBottom: "10px",
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#fff",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#cca500",
                            boxShadow: "1px 2px 5px 3px rgba(0,0,0,0.75)",
                            border: "1px solid #ccc",
                            color: "#fff",
                            cursor: "pointer",
                          },
                        }}
                      >
                        {loading ? "Cargando..." : "Enviar"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </FormControl>
            </CardContent>
          </Box>
          <BackDropComponent open={backDrop} />
          {openSnackAlert.open && 
          <SnackBarComponent options={openSnackAlert}/>
          }
        </Container>
      </>
    );
  };
  
  export default Login;