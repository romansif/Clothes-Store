import { z } from "zod";

export const addContactInfoSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required'),

    phone: z
        .string()
        .trim()
        .min(1,'Phone is required'),

    firstName: z
        .string()
        .trim()
        .min(1, 'First name is required'),

    lastName: z
        .string()
        .trim()
        .min(1, 'Last name is required'),

    country: z
        .string()
        .trim()
        .min(1, 'Country is required'),

    stateRegion: z
        .string()
        .trim()
        .min(1, 'State or region is required'),

    address: z
        .string()
        .trim()
        .min(1, 'Address is required'),

    city: z
        .string()
        .trim()
        .min(1, 'City is required'),

    postalCode: z
        .string()
        .trim()
        .min(1, 'Postal code is required'),
})