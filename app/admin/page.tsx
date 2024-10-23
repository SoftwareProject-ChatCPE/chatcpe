import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import SessionInvalid from "@/app/components/InvalidSession";
import StatPage from "@/app/admin/stat/page";

const page = async ()  =>{
    const session = await getServerSession(authOptions);

    if (session?.user) {
        return <StatPage />;
    }
    else {
        return <SessionInvalid />;
    }
    }

export default page;