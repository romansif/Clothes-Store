import { z } from "zod";

export const updateUserNameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Name is required'),
})

export const updateUserSurNameSchema = z.object({
    surName: z
        .string()
        .trim()
        .min(1, 'Last name is required'),
})

export const updateUserPhoneSchema = z.object({
    phone: z
        .string()
        .trim()
        .min(1, 'Phone is required'),
})

export const updateUserEmailSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
})

export const updateUserPasswordSchema = z.object({
    oldPassword: z
        .string()
        .trim()
        .min(1, 'Old password is required'),

    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(12, 'Password must be at most 12 characters')
        .regex(
            /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-zА-Яа-я\d@$!%*#?&]+$/,
            'Include a letter, number, and special character'
        ),
})