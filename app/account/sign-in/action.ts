'user server'

import { signInSchema } from "@/app/lib/schemas";
import { parseWithZod } from "@conform-to/zod";
import axios from "axios";
// import { useRouter } from "next/router";

export const logInUser = async (
    prevState: unknown,
    formData: FormData
) => {
    // const router = useRouter();

    const submission = parseWithZod(formData, {
        schema: signInSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    axios
        .post(
            "http://localhost:5000/api/v1/login",
            {
                email: formData.get('email'),
                password: formData.get('password')
            })
        .then((response) => {
            console.log(response);

            localStorage.setItem('UserData', JSON.stringify(response.data))
            // setTimeout(() => {
            //     router.push('/account/profile-creation');
            // }, 1500)
        })
        .catch((error) => {
            console.log(error);
        });
};