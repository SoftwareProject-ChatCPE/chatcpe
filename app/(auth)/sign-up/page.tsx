import SignUpForm from "@/app/components/form/SignUpForm";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";


const page = async () => {
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