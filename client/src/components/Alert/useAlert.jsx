import {useToaster} from "rsuite";
import AlertMessage from "./AlertMessage";

export function useAlert() {
    const toaster = useToaster();

    const sendAlert = (type, msg, options={}) => {
        toaster.push(<AlertMessage type={type}>{msg}</AlertMessage>, { placement: 'bottomEnd', duration: 5000 , ...options});
    };

    return sendAlert;
}
