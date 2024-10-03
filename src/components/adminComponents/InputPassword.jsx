import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import variablesCSS from '../../styles/adminStyles/variablescss';

export default function InputPassword({ handleInput }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
      <div>
        <FormControl variant="outlined" sx={{marginTop: '1rem', backgroundColor: variablesCSS.mainColor}}>
          <InputLabel htmlFor="outlined-adornment-password" sx={{color: 'white'}}>Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            sx={{
              input: {
                color: 'white',
                backgroundColor: variablesCSS.mainColor
              }
            }}
            onChange={handleInput}
            name={'password'}
            endAdornment={
              <InputAdornment position="end" sx={{
                backgroundColor: variablesCSS.mainColor
              }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                  sx={{
                    color: 'white',
                    backgroundColor: variablesCSS.mainColor
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
          />
        </FormControl>
      </div>
      
  );
}
