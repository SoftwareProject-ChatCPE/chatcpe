import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Loading from "@/app/user/loading";
import React, { Suspense } from "react";
import AdminNavbar from "@/app/components/AdminNavbar";

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
            {/* Include shared UI here like the Admin Navbar */}
            <AdminNavbar />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </section>
    );
}