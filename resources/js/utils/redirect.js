export function redirect(path, params){
   let url = path;

   if(params){
      for(let i = 0; i < params.length; i++){
         const param = params[i].key + '=' + params[i].value
         const add = i === 0 ? '?' + param : '&' + param;
         url += add;
      }
   }

   window.history.pushState(
      {},
      '',
      url
   );
   window.dispatchEvent(new PopStateEvent('popstate'));
}