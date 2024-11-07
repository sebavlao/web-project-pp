import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth"
import endpoints from '../data/adminData/api';
import { useAccessToken } from '../hooks/useAccessToken';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const NavBar = () => {
  const { logout, auth } = useAuth();
  const navigate = useNavigate();
  const { getToken } = useAccessToken();
  const [info, setInfo] = useState();
  const [navWorker, setNavWorker] = useState(false);

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  useEffect(() => {
    async function getInfo() {
      let res = await fetch(endpoints.me, {
        headers: {
          'x-access-token': getToken()
        }
      })

      let json = await res.json()
      setInfo(json)
      
        if (json.userType === "worker") {
          setNavWorker(<>
            <Link style={{padding: '.3rem'}}
          to="/trabajador">
            <HomeOutlinedIcon sx={{color: 'white'}} />
            <p className="text-gray-300 profile-text">Inicio</p>
          </Link>
          <Link style={{padding: '.3rem'}}
          to="/trabajador/mis-trabajos">
            <WorkIcon sx={{color: 'white'}} />
            <p className="text-gray-300 profile-text">Mis trabajos</p>
          </Link>
          <Link style={{padding: '.3rem'}}
          to="/trabajador/profile">
            <AccountCircleIcon sx={{color: 'white'}} />
            <p className="text-gray-300 profile-text">{json.username}</p>
          </Link>
          </>)
        }
    }

    getInfo()
  }, [])

  

  return (
    <nav className="w-full max-w-5xl navbar-worker">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          WorkLink
        </Link>

        {/* Botón de usuario */}
        <div>
          {auth ? (
            <div className="flex items-center space-x-4">
              { navWorker &&
                navWorker
              }
              
              <button
                className="hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md logout-btn"
                onClick={handleLogout}
              >
                <LogoutIcon sx={{color: 'whitesmoke'}}/>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 mx-2 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/registro-cliente"
                className="bg-white mx-2 text-ellipsis hover:bg-slate-300 text-black font-semibold py-2 px-4 rounded-md"
              >
                Registro cliente
              </Link>
              <Link
                to="/registro-trabajador"
                className="bg-white mx-2 text-ellipsis hover:bg-slate-300 text-black font-semibold py-2 px-4 rounded-md"
              >
                Registro trabajador
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
