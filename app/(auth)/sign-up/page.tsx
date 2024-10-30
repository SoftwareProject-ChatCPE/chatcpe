import SignUpForm from "@/app/components/SignUpForm";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";



/**
 * Asynchronous function representing a page component that fetches the server-side
 * session using NextAuth.js. If the session does not exist, it redirects to the sign-in page.
 *
 * @returns {JSX.Element | null} JSX element representing the rendered page if session exists,
 *                               otherwise null after redirecting to sign-in page.
 */
const page = async () => {
    /**
     * Fetch the server-side session using NextAuth.js.
     *
     * @type {import('next-auth/client').UserSession | null}
     */
    const session = await getServerSession(authOptions);

    // If no session exists, redirect to sign-in page
    if (!session) {
        redirect("/sign-in");
        return null;
    }

    return (
        <div className='w-full'>
            <SignUpForm />
        </div>
    );
};

export default page;