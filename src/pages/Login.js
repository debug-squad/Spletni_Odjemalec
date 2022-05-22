import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAxiosState } from '../contexts/AxiosProvider';
import { useClientState } from '../contexts/ClientProvider';
import { styled, useTheme } from "@mui/system";

export default function Login(){
    const {client, setToken, setClient} = useClientState();
    const { publicAxios } = useAxiosState();
    const theme = useTheme();
    const [clientName, setClientName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const Login = async () => {

        setError("");

        const response = await publicAxios.post('/client/login', {
            "client_name": clientName,
            "password": password
        });
        const data = response.data;

        if(data.success !== true) {
            setError("Failed to login");
            return;
        }

        setToken(data.data.token);
        setClient(data.data.client);
    };

    return(
        <Box sx={{ 
            marginTop:"5em",padding:"1em",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:theme.palette.background.onDefault,
            color:theme.palette.text.primary,
            [theme.breakpoints.up("xs")]: {
                width:"90%",
                marginLeft:"5%"
              },
              [theme.breakpoints.up("sm")]: {
                width:"70%",
                marginLeft:"15%"
              },
             [theme.breakpoints.up("md")]:{
                 width:"50%",
                 marginLeft:"25%"
             },
        }}>
            { client ? <Navigate to="/"/>: null}
            <h1>Login</h1>
            <TextField required error={error} helperText={error} defaultValue="Insert Password" label="Insert name" color="primary" focused value={clientName} onChange={(e) => setClientName(e.target.value)}  />
            <TextField required  error={error} helperText={error}  sx={{marginTop:"1em",marginBottom:"1em"}} type="password" label="Insert password" color="primary" focused value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={Login} sx={{color:theme.palette.text.primary, backgroundColor:theme.palette.background.menu}} >Log In</Button>
        </Box>
    );
}