import axios from 'axios'



function getCliente(){
  axios.get('http://localhost:3000/cliente').then((response) =>{
  return response.data;
    //console.table(this.datos);
  });
}

export default getCliente;
