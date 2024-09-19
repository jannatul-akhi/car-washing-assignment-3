import { z } from 'zod';

// TAuth validation schema
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
};
