import { useCallback, useState } from "react";
import { useAnimation, useTimeout, useStateUpdate } from 'danholibraryrjs';
import { NotificationProps } from "./NotificationTypes";

export default function Notification({ notification, timeout, onClick }: NotificationProps) {
    const { message, amount } = notification ?? {};
    const [closeClicked, setCloseClicked] = useState(false);
    const getDefaultVisibilityState = useCallback(() => !closeClicked && !!amount, [closeClicked, amount]);
    const visisble = useStateUpdate(
        getDefaultVisibilityState(), 
        { before: getDefaultVisibilityState }, 
        [amount, closeClicked]
    );

    const fadeOut = useAnimation(".notification", "fade-out", "500ms");
    const onClose = useCallback(async () => {
        await fadeOut();
        setCloseClicked(true);
    }, [fadeOut]);

    const { clear } = useTimeout(onClose, timeout ?? Number.POSITIVE_INFINITY);
    if (!amount) clear();

    return visisble ? (
        <article className="notification" onClick={onClick}>
            <h1>{message}</h1>
            <span onClick={onClose}>&times;</span>
        </article>
    ) : null;
}