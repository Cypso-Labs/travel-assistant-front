'user server'

import { signUpSchema } from "@/app/lib/schemas";
import { parseWithZod } from "@conform-to/zod";
import axios from "axios";

export const registerUser = async (
    prevState: unknown,
    formData: FormData
    // userDetails: Readonly<{ username: string; email: string; password: string }>
) => {
    const submission = parseWithZod(formData, {
        schema: signUpSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    axios
        .post(
            "http://localhost:5000/api/v1/register",
            {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};