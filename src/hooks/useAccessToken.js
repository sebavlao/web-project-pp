export const useAccessToken = () => {
    const getToken = () => {
        
        return localStorage.getItem('x-access-token');
    };
  
    const getUser = () => {
    
      return localStorage.getItem('user');
    };

    const getPassword = () => {
    
        return localStorage.getItem('password');
      };
  
    return { getToken, getUser,getPassword };
  };