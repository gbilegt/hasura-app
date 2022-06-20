import Dashboard from "../modules/dashboard/dashboard"
import { useSession } from "next-auth/react";
import LoginPage from "./Login";

export default function DashboardPage() {
    const { data: session } = useSession();

    if(session) {
      return <Dashboard session={session} />
    }
    if(!session) {
      if(typeof session === 'undefined') {
        return 'undefined'
      }
      if(typeof session === 'object') {
        return <LoginPage />
      }
    }
  }