import Loading from "@/app/user/loading";
import React, {Suspense} from "react";
import AdminNavbar from "@/app/components/AdminNavbar";

export default function AdminLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <AdminNavbar />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </section>
    )
}