export function fetchReferer () {
    return sessionStorage.getItem('referer');
 }

 export function storeReferer (referer) {
    sessionStorage.setItem('referer', referer);
 }