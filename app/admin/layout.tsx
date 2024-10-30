import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Loading from "@/app/user/loading";
import React, { Suspense } from "react";
import AdminNavbar from "@/app/components/AdminNavbar";

/**
 * AdminLayout component that checks user authentication and conditionally renders admin content.
 * If the user is not authenticated, it redirects to the sign-in page.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The protected content to be displayed if authenticated.
 * @return {React.ReactElement|null} The rendered admin layout or null if redirected.
 */
export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    // Check if the user is authenticated
    const session = await getServerSession(authOptions);

    // If no session exists, redirect to sign-in page
    if (!session) {
        redirect("/sign-in");
        return null;
    }

    // If session exists, render the layout with the protected content
    return (
        <section>
            <AdminNavbar />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </section>
    );
}