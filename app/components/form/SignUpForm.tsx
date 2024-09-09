'use client'
import React from 'react';
import {Form, useForm} from 'react-hook-form';
import Swal from 'sweetalert2';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useRouter} from "next/navigation";

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
    const respond = await fetch('api/user',{
        method: 'POST',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: values.name,
            surname: values.surname,
            email: values.email,
            password: values.password,
        })
    })
if(respond.ok){
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User registered successfully',
    }).then(() => {
        router.push('/sign-in');
    });
}else{
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Registration failed',
    });

}
    };

return (

    <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                {...form.register("name")}
            />
            {form.formState.errors.name && (
                <p>{form.formState.errors.name.message}</p>
            )}
        </div>

        <div>
            <label htmlFor="surname">Surname</label>
            <input
                id="surname"
                type="text"
                {...form.register("surname")}
            />
            {form.formState.errors.surname && (
                <p>{form.formState.errors.surname.message}</p>
            )}
        </div>

        <div>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                {...form.register("email")}
            />
            {form.formState.errors.email && (
                <p>{form.formState.errors.email.message}</p>
            )}
        </div>

        <div>
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                {...form.register("password")}
            />
            {form.formState.errors.password && (
                <p>{form.formState.errors.password.message}</p>
            )}
        </div>

        <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                id="confirmPassword"
                type="password"
                {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
                <p>{form.formState.errors.confirmPassword.message}</p>
            )}
        </div>

        <button type="submit" className='button'>Sign Up</button>
        <p
            onClick={() => router.push('/sign-in')}
        >
           already have an account?
        </p>
    </form>
)
};
export default SignUpForm;