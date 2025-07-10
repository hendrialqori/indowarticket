import { UserSelect } from "@/db/schemas/User";
import { Socket } from "socket.io";

declare module "socket.io" {
    interface Socket {
        user: UserSelect;
    }
}
