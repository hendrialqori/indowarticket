import { Xendit } from "xendit-node";
import { XENDIT_SECRET_KEY } from "@/constants/dotenv";

export const xenditClient = new Xendit({
    secretKey: String(XENDIT_SECRET_KEY),
});
