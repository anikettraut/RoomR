
import { Actions } from 'react-native-router-flux'; // New code


const LOGGED_SUCCESSFULLY = 'login_success';
const LOGGED_FAILED = 'login_error';

export const login = (username, password) => {
 console.log("login Action")
 console.log("username --- "+username + " Password ---"+password)
   return dispatch =>
   fetch('https://reqres.in/api/login', {
     method: 'post',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       email: username,
       password: password,
     }),
   })
   .then(response => {
     console.log(response);
     if (response.status >= 200 && response.status < 300) {
       console.log(response);
       dispatch(loginSuccess(response));
     } else {
       const error = new Error(response.statusText);
       error.response = response;
       dispatch(loginError(error));
       throw error;
     }
   })
   .catch(error => { console.log('request failed', error); });



   // return {
   //     type: 'LOGIN',
   //     username: username,
   //     password: password
   // };
};

export function loginSuccess(response) {
   return dispatch => {
     dispatch({ response, type: LOGGED_SUCCESSFULLY });
     Actions.detailScreen();
   };
 }

 export function loginError(error) {
   return { error, type: LOGGED_FAILED };
 }