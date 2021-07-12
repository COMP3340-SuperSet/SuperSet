import React from 'react';
import { toast as t, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

/**
 * type: the theme of the toast. 
 *      options: [info, success, warning, error, default, dark]
 *      defaults to: dark
 * 
 * options: object with key values. Must exists here: https://fkhadra.github.io/react-toastify/api/toast
 * 
 * toast(message): Dark toast, default options
 * toast(message, type): Toast with theme = type, default options
 * toast(message, type, options): Custom message and theme. options overwrites and adds to defaultOptions object.
 */
 export function toast(message, type, options) {
    if(!message){
        console.error('Cannot create Toast without a message');  
        return;
    }

    //if type is empty or invalid, defaults to dark
    if(!type || !t[type]) type = 'dark';

    //overwrites default options with any input by user
    const tempOptions = {...defaultOptions};

    if(options){
        const keys = [...Object.keys(options)];

        for(let i = 0; i < keys.length; i++){
            const key = keys[i];
            tempOptions[keys] = options[key];
        }
    }

    const tempToast = t[type];

    t[type](message, tempOptions);
}

const Toast = () => {
    return (
        <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}

export default Toast;