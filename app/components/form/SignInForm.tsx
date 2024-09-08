// app/components/form/SignInForm.tsx
'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Swal from 'sweetalert2';

const SignInForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        interface SignInResut{
            error?: string;
        }
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                setError('Invalid credentials');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid credentials!',
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Signed in successfully!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = '/dashboard'; // Redirect after showing success message
                });
            }
        } catch (err) {
            setError('An unexpected error occurred');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An unexpected error occurred!',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border rounded"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;