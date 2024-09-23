'use client';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Swal from 'sweetalert2';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import Link from 'next/link';

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
        formState: { errors },
    } = form;

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F1EAFF] p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-sm">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#8366CD] text-center mb-8">Sign In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="text-left">
                        <label className="block text-[#8366CD] text-lg sm:text-xl font-bold mb-2">Username</label>
                        <input
                            type="email"
                            {...register('email')}
                            className={`w-full p-3 rounded-full border-2 ${errors.email ? 'border-red-500' : 'border-purple-400'} focus:outline-none focus:ring-2 focus:ring-purple-400`}
                        />
                        {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="text-left">
                        <label className="block text-[#8366CD] text-lg sm:text-xl font-bold mb-2">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`w-full p-3 rounded-full border-2 ${errors.password ? 'border-red-500' : 'border-purple-400'} focus:outline-none focus:ring-2 focus:ring-purple-400`}
                        />
                        {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
                    </div>
                    <div className="flex items-center mb-6">
                        <input type="checkbox" id="rememberMe" className="mr-2" />
                        <label htmlFor="rememberMe" className="text-purple-700 text-sm font-bold">Remember me</label>
                    </div>
                    <button type="submit" className=" w-full bg-[#8366CD] text-white py-2 px-4 rounded-full text-sm">Sign In</button>
                </form>
                <p className="text-center text-[#8366CD] text-sm cursor-pointer hover:underline mt-4">
                    Don't have an account yet? <a href="/sign-up" className="text-purple-900 cursor-pointer hover:underline font-bold">Sign up</a>
                </p>
            </div>
            <div className="absolute bottom-4 right-4">
                <Link href="/" className="bg-[#8366CD] border-none text-white py-2 text-sm px-4 hover:bg-purple-400 text-center inline-block  cursor-pointer rounded-full">
                    Back to Home
                </Link>
            </div>
        </div>

    );
};

export default SignInForm;