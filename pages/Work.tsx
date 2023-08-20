import Work from "../modules/work/work"
import { useSession } from "next-auth/react";
import LoginPage from "./Login";

export default function WorkPage() {
    const { data: session } = useSession();

    if(session) {
      return <Work session={session} />
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