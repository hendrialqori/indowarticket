import { UserSelect } from "@/db/schemas/User";
import { ApiError } from "@/utils/errors/ApiError";
import { Request, Response, NextFunction } from "express";
import status from "http-status";

export function roleMiddleware(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req.user as UserSelect).role!;
        if (!allowedRoles.includes(userRole)) {
            throw new ApiError(status.FORBIDDEN, "forbidden");
        }
        next();
    };
}
