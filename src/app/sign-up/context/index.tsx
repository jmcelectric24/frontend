'use client';
import { ReactNode } from 'react';
import { useForm, FormProvider, UseFormReturn, SubmitHandler } from 'react-hook-form';
import { SignUpFormData } from '../interfaces';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context";


interface SignUpContextWrapperProps {
    children: ReactNode;
}

export default function SignUpContextWrapper({ children }: SignUpContextWrapperProps) {

    const { auth } = useGlobalState();

    // Initialize the form methods with type

    const methods: UseFormReturn<SignUpFormData> = useForm<SignUpFormData>({
        defaultValues: {
            email: "",
        }
    });

    const onSubmit: SubmitHandler<SignUpFormData> = async ({ email }: SignUpFormData) => {

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/auth/sign-up`, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                  },
                email
            });
            if (response.status === 200) {
                toast.success(`New user created successfully: ${response.data.user}`);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Error during signup:", error.message);
                toast.error("Permission Denied");
            } else {
                console.log("Unexpected error during signup");
                toast.error("Permission Denied");
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
