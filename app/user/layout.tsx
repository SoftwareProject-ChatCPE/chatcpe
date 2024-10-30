import Loading from "@/app/user/loading";
import React, {Suspense} from "react";
import UserNavbar from "@/app/components/UserNavbar";

/**
 * UserLayout component wraps its children with shared UI elements such as a header or sidebar.
 *
 * @param {object} props - The props object for the UserLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @return {JSX.Element} The JSX layout containing the shared UI and children components.
 */
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