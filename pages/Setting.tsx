import { useSession } from "next-auth/react";
import LoginPage from "./Login";
import Setting from "../modules/setting/setting";

export default function SettingPage() {
    const { data: session } = useSession();

    if(session) {
      return <Setting session={session} />
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