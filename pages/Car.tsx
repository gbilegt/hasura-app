import Car from "../modules/car/car"
import { useSession } from "next-auth/react";
import LoginPage from "./Login";

export default function CarPage() {
    const { data: session } = useSession();

    if(session) {
      return <Car session={session} />
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