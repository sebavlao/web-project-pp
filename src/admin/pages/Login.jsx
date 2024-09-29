import React, { useState, useContext } from 'react';
import { TextField, Button} from '@mui/material';
import InputPassword from '../components/InputPassword';
import fetchWithBody from '../utilities/fetchWithBody';
import { AuthAdminContext } from '../hooks/useAuth';
import endpoints from '../data/api';
import { Navigate } from 'react-router-dom';

export default function LoginAdmin() {
  const [form, setForm] = useState();
  const [errorText, setErrorText] = useState(<></>);
  const { token, setToken, setRole } = useContext(AuthAdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await fetchWithBody(endpoints.authAdmin, "POST", form);
    
    (!serverResponse.token) ? setErrorText(<p style={{color: 'red', fontSize: '.8rem', textAlign: 'center'}}>Datos incorrectos.</p>) : setErrorText(<></>);

    if (serverResponse.token) { setToken(serverResponse.token) };
    if (serverResponse.role) { setRole(serverResponse.role) }
  }

  const handleInput = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

    if (token) {
      return <Navigate to={'/admin'}/>
    } else {
      return (
        <div style={styles.container}>
            <form method="POST" onSubmit={handleSubmit} style={styles.form}>
                {/* name */}
                <TextField id="outlined-basic" label="Usuario" variant="outlined" name='username' onChange={handleInput}/>
               
               {/* password */}
                <InputPassword handleInput={handleInput}></InputPassword>
                
                {/* posible error */}
                { errorText }
                {/* submit */}
                <Button variant="outlined" type='submit'>Iniciar sesión</Button>
            </form>
        </div>
      )
    }
}



const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        backgroundColor: 'orange'
    },
    container: {
      backgroundColor: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  }
}