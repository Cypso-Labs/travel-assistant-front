'user server'

import { signInSchema } from "@/app/lib/schemas";
import { parseWithZod } from "@conform-to/zod";
import axios from "axios";
import router from "next/router";
import Swal from "sweetalert2";
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

            if (response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: "Successfully logged in.",
                    icon: "success"
                });
            }
            localStorage.setItem('UserData', JSON.stringify(response.data))

            setTimeout(() => {
                router.push('/account/profile-creation');
            }, 1500)
        })
        .catch((error) => {

            const { response } = error;

            if (response.status === 401) {
                Swal.fire({
                    title: "Error!",
                    text: "Invalid Email or Password",
                    icon: "error"
                });
            }
            console.log(error);
        });
};