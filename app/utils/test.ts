    import axios from 'axios';

    const register= async() =>{
      const res= await axios.post('http://localhost:3600/register', { username:'ADDDDDDDD', password:"ADDDDDDDD", email:'ADDDDDDDD@AD.COM' },{ withCredentials:true });
      if(res.data.code === 1){
        console.log(res.data.message)
      }

    }
    register()