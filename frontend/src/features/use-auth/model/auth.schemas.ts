import { z } from 'zod'

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required'),

    password: z
        .string()
        .trim()
        .min(1, 'Password is required'),

    role: z.enum(['Buyer', 'Seller'], {
        message: 'Select a role'
    }),
})

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Name is required'),

    surName: z
        .string()
        .trim()
        .min(1, 'Last name is required'),

    phone: z
        .string()
        .trim()
        .min(1, 'Phone is required'),

    email: z
        .string()
        .trim()
        .min(1, 'Email is required'),

    password: z
        .string()
        .trim()
        .min(1, 'Password is required')
        .min(8, 'Password must be 8-12 characters')
        .max(12, 'Password must be 8-12 characters')
        .regex(
            /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-zА-Яа-я\d@$!%*#?&]+$/,
            'Include a letter, number, and special character'
        ),
})