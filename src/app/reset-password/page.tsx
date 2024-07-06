'use client';
import { useFormContext } from 'react-hook-form';
import ResetContextWrapper from '../reset-password/context';


export default function ResetPassword() {
    return (
        <div className="h-screen flex items-center justify-center">
            <ResetContextWrapper>
                <div className="container mx-auto max-w-sm p-8 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h2 className="text-center mb-4 text-xl font-bold">Reset Password</h2>
                    <div className="flex flex-col">
                        <EmailInput />
                        <SubmitButton />
                    </div>
                </div>
            </ResetContextWrapper>
        </div>

    )
}

interface EmailInputProps {
    placeholder?: string;
}

const EmailInput = ({ placeholder = "Enter your email" }: EmailInputProps) => {
    const { register } = useFormContext(); // Access form context

    return (
        <input
            type='email'
            {...register("email", { required: "Email is required" })}
            placeholder={placeholder}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
    );
}

const SubmitButton = ({ label = "Submit" }: { label?: string }) => {
    const { formState: { isSubmitting } } = useFormContext(); // useFormContext hook to access form state

    return (
        <button type="submit" disabled={isSubmitting} className="p-2 rounded bg-gray-500 text-white mx-auto">
            {isSubmitting ? 'Processing...' : label}
        </button>
    );
}

