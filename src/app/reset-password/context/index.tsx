'use client';
import { ReactNode } from 'react';
import { useForm, FormProvider, UseFormReturn, SubmitHandler } from 'react-hook-form';
import { ResetFormData } from '../interfaces';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from "next/navigation";


interface ResetContextWrapperProps {
    children: ReactNode;
}

export default function ResetContextWrapper({ children }: ResetContextWrapperProps) {
    const router = useRouter();

    // Initialize the form methods with type

    const methods: UseFormReturn<ResetFormData> = useForm<ResetFormData>({
        defaultValues: {
            email: "",
        }
    });

    const onSubmit: SubmitHandler<ResetFormData> = async ({ email }: ResetFormData) => {

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/auth/reset-password`, {
                email
            });
            if (response.status === 200) {
                router.replace('/login');
                toast.success(response.data.message);
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Error during reset password:", error.message);
                toast.error(error.message);
            } else {
                console.log("Unexpected error during reset password");
                toast.error("Unexpected error during reset password");
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
