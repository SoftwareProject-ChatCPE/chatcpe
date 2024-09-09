'use client';
import {useForm} from 'react-hook-form';
import {signIn} from 'next-auth/react';
import Swal from 'sweetalert2';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from "next/navigation";

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(2, 'Password must have than 8 characters'),
});

const SignInForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {

        try {
            const signInData = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (signInData && signInData.error) {
                // Handle sign-in error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: signInData.error,
                });
                console.error("Sign-in error:", signInData.error);
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Sign-in successful!',
                });
                router.push('/admin');

            }
        } catch (error) {
            console.error("Unexpected error during sign-in:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Unexpected error during sign-in!',
            });
        }
    };


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = form;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className={`w-full p-2 mt-1 border rounded ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`w-full p-2 mt-1 border rounded ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/sign-up')}
                            className="w-full px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-700"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInForm;