'use client';
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {Button, Spinner} from 'flowbite-react'; 
import Swal from 'sweetalert2';

/**
 * Defines the schema for the sign-up form using Zod.
 * 
 * The schema includes validation rules for the following fields:
 * - `name`: A required string with a maximum length of 30 characters.
 * - `surname`: A required string with a maximum length of 30 characters.
 * - `email`: A required string that must be a valid email format.
 * - `password`: A required string with a minimum length of 8 characters.
 * - `confirmPassword`: A required string that must match the `password` field.
 * 
 * The schema also includes a refinement to ensure that the `password` and `confirmPassword` fields match.
 * 
 * @returns A Zod schema object for form validation.
 */
const FormSchema = z
    .object({
        name: z.string().min(1, 'Name is required').max(30),
        surname: z.string().min(1, 'Surname is required').max(30),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have at least 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });


/**
 * Renders a Sign-Up Form component.
 *
 * The SignUpForm component provides interfacing for users to sign up by entering their name, surname,
 * email, password, and confirm password. It utilizes React Hook Form for form validation and state management,
 * and Zod for schema-based validation. Upon form submission, it attempts to register a new user via an API call.
 *
 * @returns {JSX.Element} The rendered component JSX element.
 */
const SignUpForm = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        setIsLoading(true);
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
            }),
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User registered successfully',
            }).then(() => {
                router.push('/sign-in');
            }
            );
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                       <label className="block text-left text-[#8366CD] font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            {...register('name')}
                            className={`w-full p-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600`}
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-left text-[#8366CD] font-semibold mb-1">Surname</label>
                        <input
                            type="text"
                            {...register('surname')}
                            className={`w-full p-2 rounded-lg border ${errors.surname ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600`}
                        />
                        {errors.surname && <p className="text-red-500 text-xs">{errors.surname.message}</p>}
                    </div>

                    <div>
                        <label className="block text-left text-[#8366CD] font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className={`w-full p-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600`}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-left text-[#8366CD] font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`w-full p-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600`}
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-left text-[#8366CD] font-semibold mb-1">Confirm Password</label>
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            className={`w-full p-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-purple-600`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <Button type="submit" color="purple" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <Spinner className="mr-2" size="sm" light={true} />
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                </form>
            </div>

            <div className="absolute bottom-4 right-4">
                <Link
                    href="/admin"
                    className="bg-[#8366CD] text-white py-2 px-4 hover:bg-purple-600 rounded-full text-center inline-block"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default SignUpForm;