import {useToaster} from "rsuite";
import NotificationMessage from "./NotificationMessage";

export function useNotification() {
    const toaster = useToaster();

    const sendNoti = (type, msg, options={}) => {
        toaster.push(<NotificationMessage type={type} toaster={toaster}>{msg}</NotificationMessage>, { placement: 'topCenter', ...options});
    }

    return sendNoti;
}
