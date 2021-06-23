export function fetchToken () {
    return {
       token: localStorage.getItem('token')
    };
 }

 export function storeToken (token) {
    localStorage.setItem('token', token);
 }