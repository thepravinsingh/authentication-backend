const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "username must be a string" })
    .trim()
    .min(3, { message: "name will not be less than 3 letters" })
    .max(255, { message: "name will not be more than 255  letters" }),

  email: z
    .string({ required_error: "email must be a string" })
    .trim()
    .email("email will be a string")
    .trim()
    .max(100, { message: "Email will not more than 100 characters" }),
  phone: z
    .string({ message: "Phone will be a number" })
    .min(10, { message: "phone number will not more than of 10 letters" })
    .max(10, { message: "phone number will not more than 10 letters" }),
  password: z
    .string({ message: "password will be a string" })
    .min(5, { message: "password will ne atleast of 5 letters" })
    .max(10, { message: "password will be not more than of 10 letters" }),
});

module.exports = signupSchema;
