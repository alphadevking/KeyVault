// src/schemas/loginSchema.ts

import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address")
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .nonempty("Password is required"),
});