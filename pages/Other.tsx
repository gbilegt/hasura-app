import Other from "../modules/other/other"
import { useSession } from "next-auth/react";
import LoginPage from "./Login";

export default function OtherPage() {
    const { data: session } = useSession();

    if(session) {
      return <Other session={session} />
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