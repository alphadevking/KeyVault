// src/schemas/signupSchema.ts
import { z } from 'zod';

export const signupSchema = z.object({
    name: z
        .string()
        .optional() // Make the field optional
        .transform((value) => value ? value.toLowerCase() : value) // Ensure the value is lowercase if provided
        .refine((value) => {
            if (!value) return true; // Allow empty values
            return /^[a-z0-9@]+$/.test(value);
        }, {
            message: "Username should contain only lowercase letters, numbers, and the @ symbol"
        }),

    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address")
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long")
        .refine(
            (value) => /[a-z]/.test(value),
            "Password must contain at least one lowercase letter"
        )
        .refine(
            (value) => /[A-Z]/.test(value),
            "Password must contain at least one uppercase letter"
        )
        .refine(
            (value) => /\d/.test(value),
            "Password must contain at least one digit"
        )
        .refine(
            (value) => /[\W_]/.test(value),
            "Password must contain at least one special symbol"
        ),
});