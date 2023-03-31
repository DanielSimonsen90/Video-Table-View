import { useCallback, useMemo, useState } from "react";
import { useAnimation, useTimeout, useStateUpdate, ClickEvent } from 'danholibraryrjs';
import { NotificationProps } from "./NotificationTypes";

export default function Notification({ folder, timeout, onClick }: NotificationProps) {
    const [closeClicked, setCloseClicked] = useState(false);

    const amount = useMemo(() => folder?.folders.reduce((acc, folder) => acc + folder.videos.length, 0) ?? 0, [folder]);
    const getDefaultVisibilityState = useCallback(() => !closeClicked && !!amount, [closeClicked, amount]);

    const visisble = useStateUpdate(
        getDefaultVisibilityState(), 
        { before: getDefaultVisibilityState }, 
        [amount, closeClicked]
    );

    const fadeOut = useAnimation(".notification", "fade-out", "500ms");
    const onClose = useCallback(async (event?: ClickEvent<HTMLSpanElement>) => {
        event?.stopPropagation();
        await fadeOut();
        setCloseClicked(true);
    }, [fadeOut]);

    const { clear } = useTimeout(onClose, timeout ?? Number.POSITIVE_INFINITY);
    if (!amount) clear();

    return visisble ? (
        <article className="notification" onClick={onClick}>
            <h1>{amount} new {amount > 1 ? 'clips' : 'clip'}</h1>
            <span onClick={onClose}>&times;</span>
        </article>
    ) : null;
}