import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().min(1, "Email is required"),

    password: z.string().trim().min(1, "Password is required"),

    role: z.enum(["Buyer", "Seller"], {
        message: "You need to select a role to determine how you want to login",
    }),
});
