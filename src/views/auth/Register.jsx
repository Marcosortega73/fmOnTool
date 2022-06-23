import {
  CardContent,
  Container,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";

import Box from "@mui/material/Box";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { FormCheck } from "../../components/forms/imputs/FormCheck";
import { FormText } from "../../components/forms/imputs/FormText";

import AuthService from "../../services/api/auth/authService";
import SnackBarComponent from "../../components/common/SnackBarComponent";
import BackDropComponent from "../../components/common/BackDropComponent";

import { useNavigate } from "react-router-dom";

//DATA

const Register = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [openSnackAlert, setOpenSnackAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [backDrop, setBackDrop] = useState(false);
  const navigate = useNavigate();

//   const [severityAlert, setSeverityAlert] = useState("");
//   const [messageAlert, setMessageAlert] = useState("");
//   const [titleAlert, setTitleAlert] = useState("");



  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkbox: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    setOpenSnackAlert({
        open: false,
        message: "",
        severity: "",
    })
    
    console.log(data);
    setBackDrop(true);
    //POST DE REGISTER
    await AuthService.registerAdmin(data)
      .then((res) => {
        console.log(res, "ressadsa");
        setBackDrop(false);
        if (res.status === 200) {
        setOpenSnackAlert({
            open: true,
            message: "Usuario registrado correctamente",
            severity: "success",
        })
        navigate("/login");
        }
        else{
            setOpenSnackAlert({
                open: true,
                message: "Error al registrar usuario",
                severity: "error",
            })
            navigate("/register");
        }
        
        setLoading(false);
      })
      .catch((err ) => {
    console.log("EERROR en el servidor", err);
        setBackDrop(false);
        setOpenSnackAlert({
            message: "Error al registrar usuario",
            severity: "error",
           })
           navigate("/register");
        setLoading(false);
      });
  };

  //simulando una espera

  return (
    <>
      <Container
        fixed
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          elevation={4}
          sx={{
            bgcolor: "#cca500",
            height: "100%",
            width: "50%",
            borderRadius: "15px",
            boxShadow: "1px 2px 5px 3px rgba(0,0,0,0.75)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            mt: "50px",
          }}
        >
          <Typography
            sx={{ fontSize: 17, paddingTop: "5px" }}
            color="black"
            gutterBottom
          >
            Conviertete en manager
          </Typography>
          <CardContent>
            <FormControl>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12}>
                    <FormText
                      control={control}
                      errors={errors}
                      register={register}
                      name="email"
                      rulesBol={true}
                      variant="outlined"
                      labelText="Ingrese su Username"
                      color="red"
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

                  <Grid item xs={12}>
                    <FormCheck
                      control={control}
                      errors={errors}
                      name="checkbox"
                      rulesBol={true}
                      variant="filled"
                      labelText="Aceptar las politicas de privacidad"
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
                        backgroundColor: "#cca500",
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

export default Register;
