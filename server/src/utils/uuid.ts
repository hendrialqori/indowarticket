import crypto from "node:crypto";

export function genuuid(length: number = 8) {
    const bytes = crypto.randomBytes(length);
    const random = bytes.toString("hex");
    return random.slice(0, length);
}
