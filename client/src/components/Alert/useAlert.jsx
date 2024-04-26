import {useToaster} from "rsuite";
import AlertMessage from "./AlertMessage";

export function useAlert() {
    const toaster = useToaster();

    const sendAlert = (type, msg) => {
        toaster.push(<AlertMessage type={type}>{msg}</AlertMessage>, { placement: 'topEnd', duration: 5000 });
    };

    return sendAlert;
}
