import { Notyf } from "notyf";
const notyf = new Notyf();


const NotyfMessage = (message, type) => {
    let msg = null;

    if(type == 'success'){
        msg = notyf.success({
            message: message,
            duration: 9000,
            dismissible: true,
          });
    }else{
        msg = notyf.error({
            message: message,
            duration: 9000,
            dismissible: true,
          });
    }
    return msg;
  }
  
export { NotyfMessage };