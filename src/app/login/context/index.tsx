'use client';
import { ReactNode } from 'react';
import { useForm, FormProvider, UseFormReturn, SubmitHandler } from 'react-hook-form';
import { LoginFormData } from '../interfaces';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context";


interface LoginContextWrapperProps {
    children: ReactNode;
}

export default function LoginContextWrapper({ children }: LoginContextWrapperProps) {
    const router = useRouter();

    const { auth, setAuth } = useGlobalState();

    // Initialize the form methods with type

    const methods: UseFormReturn<LoginFormData> = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<LoginFormData> = async ({ email, password }: LoginFormData) => {

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/auth/login`, {
                email, password
            });
            if (response.status === 200) {

                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token,
                });

                localStorage.setItem("auth", JSON.stringify(response.data));
                router.replace('/');

                toast.success(response.data.message);
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Error during login:", error.message);
                toast.error(error.message);
            } else {
                console.log("Unexpected error during login");
                toast.error("Unexpected error during login");
            }
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="block">
                {children}
            </form>
        </FormProvider>
    );
}
