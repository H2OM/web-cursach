'use client';

import { useContext } from "react";
import '../notification.scss';
import ClientContext from "@/lib/context/ClientContext";

export default function Notification() {
    const {notification } = useContext(ClientContext);

    return (
        <div className={
            "Notification " + (notification.message ? "Notification_show " : "")
            + (!notification.status ? "Notification_red " : "") }><div className="Notification__message">{notification.message}</div></div>
    )
}