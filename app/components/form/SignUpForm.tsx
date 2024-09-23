'use client'
import React from 'react';
import { Form, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import Link from 'next/link';

type FormValues = {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const FormSchema = z
    .object({
        name: z.string().min(1, 'name is required').max(30),
        surname: z.string().min(1, 'surname is required').max(30),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have than 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match',
    });
const SignUpForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const respond = await fetch('api/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
            })
        })
        if (respond.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User registered successfully',
            }).then(() => {
                router.push('/sign-in');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Registration failed',
            });

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F1EAFF] p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-[#8366CD] mb-4">Sign Up</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-left text-[#8366CD] font-semibold text-sm">Name</label>
                        <input
                            id="name"
                            type="text"
                            {...form.register("name")}
                            className={`w-full px-3 py-2 border rounded-[25px] ${form.formState.errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
                        />
                        {form.formState.errors.name && (
                            <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="surname" className="text-left text-[#8366CD] font-semibold text-sm">Surname</label>
                        <input
                            id="surname"
                            type="text"
                            {...form.register("surname")}
                            className={`w-full px-3 py-2 border rounded-[25px] ${form.formState.errors.surname ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
                        />
                        {form.formState.errors.surname && (
                            <p className="text-red-500 text-xs">{form.formState.errors.surname.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-left text-[#8366CD] font-semibold text-sm">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...form.register("email")}
                            className={`w-full px-3 py-2 border rounded-[25px] ${form.formState.errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
                        />
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-left text-[#8366CD] font-semibold text-sm">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...form.register("password")}
                            className={`w-full px-3 py-2 border rounded-[25px] ${form.formState.errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
                        />
                        {form.formState.errors.password && (
                            <p className="text-red-500 text-xs">{form.formState.errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="text-left text-[#8366CD] font-semibold text-sm">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            {...form.register("confirmPassword")}
                            className={`w-full px-3 py-2 border rounded-[25px] ${form.formState.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
                        />
                        {form.formState.errors.confirmPassword && (
                            <p className="text-red-500 text-xs">{form.formState.errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className=" w-full bg-[#8366CD] text-white py-2 text-sm hover:bg-purple-400 transition duration-300 rounded-[25px]"
                    >
                        Sign Up
                    </button>
                </form>

                <p
                    onClick={() => router.push('/sign-in')}
                    className="mt-4 text-center text-[#8366CD] cursor-pointer hover:underline text-xs"
                >
                    Already have an account? <a href="/sign-in" className="text-purple-900 cursor-pointer hover:underline font-bold">Sign In</a>
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

export default SignUpForm;