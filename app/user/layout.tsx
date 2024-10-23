import Loading from "@/app/user/loading";
import React, {Suspense} from "react";
import UserNavbar from "@/app/components/UserNavbar";

export default function UserLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <UserNavbar />
     <Suspense fallback={<Loading />}>
            {children}
     </Suspense>
        </section>
    )
}