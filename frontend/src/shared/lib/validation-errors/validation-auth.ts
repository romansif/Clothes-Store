import type { z, ZodError } from "zod";
import {loginSchema, registerSchema} from "@/features/use-auth/model/auth.schemas.ts";
import {loginFormErrors, registerFormErrors} from "@/features/use-auth/model/auth.errors.ts";
import {loginFormErrorMessages, registerFormErrorMessages} from "@/features/use-auth/model/auth.forms.ts";

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export const loginValidationErrors = (err: ZodError<LoginData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof loginFormErrors.value;

        loginFormErrors.value[field] = true;
        loginFormErrorMessages.value[field] = issue.message;
    })
};

export const registerValidationErrors = (err: ZodError<RegisterData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof registerFormErrors.value;

        registerFormErrors.value[field] = true;
        registerFormErrorMessages.value[field] = issue.message;
    })
};

