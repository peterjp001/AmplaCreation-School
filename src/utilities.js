import { Notyf } from "notyf";
const notyf = new Notyf();


const NotyfMessage = (message, type) => {
    let msg = null;
    const duration = 3000;
    const dismissible = true;

    if(type == 'success'){
        msg = notyf.success({
            message: message,
            duration: duration,
            dismissible: dismissible,
          });
    }else{
        msg = notyf.error({
            message: message,
            duration: duration,
            dismissible: dismissible,
          });
    }
    return msg;
  }
  
export { NotyfMessage };