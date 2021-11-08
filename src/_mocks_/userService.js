 import Axios from 'axios';
// import React, { useEffect, useState } from 'react';
// // eslint-disable-next-line no-unused-vars

// const userService = () => {
//   return Axios.get('http://localhost:8082/users')
//       .then(response =>{
//         if(response.status === 200){
//             console.log("Service",JSON.stringify(response.data))
//          // navigate('/login', { replace: true });
//         } 
//       });
// }

// export default userService;

// function userService() {
//     return Axios.get('http://localhost:8082/users')
//     .then(response =>{
//       if(response.status === 200){
//           console.log("Service",JSON.stringify(response.data))
//        // navigate('/login', { replace: true });
//       } 
//     });
//   }

//   export default userService;

export class UserService{
//     userService() {
//     return Axios.get('http://localhost:8082/users')
//     .then(response =>{
//       if(response.status === 200){
//           console.log("Service",JSON.stringify(response.data))
//        // navigate('/login', { replace: true });
//       } 
//     });
//   }
constructor() {
    this._data = null;
  }

getMyService() {
    Axios.get('http://localhost:8082/users')
    .then(response =>{
      if(response.status === 200){
          this._data=response.data
          console.log("Service",JSON.stringify(this._data))
          return response.data;
       // navigate('/login', { replace: true });
      } 
    });
    
  }
}