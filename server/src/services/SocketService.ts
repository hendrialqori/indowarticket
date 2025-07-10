import { Server } from "socket.io";
import http from "node:http";
import { CLIENT_URL } from "@/constants/dotenv";
import { PAYMENT, STATUS } from "@/constants/enum";

let io: Server;

const CONNECTION = "connection";
const PAYMENT_NOTIFICATION = "payment_notification";

export function initialize(server: http.Server) {
    io = new Server(server, {
        cors: {
            origin: CLIENT_URL,
            credentials: true,
        },
        pingTimeout: 50_000,
        path: "ws",
    });

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;

        next();
    });

    io.on(CONNECTION, (socket) => {
        console.log(socket);
    });
}

export function paymentNotification() {
    io.emit(PAYMENT_NOTIFICATION, (status: keyof typeof PAYMENT) => {});
}
