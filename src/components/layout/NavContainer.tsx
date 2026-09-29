import { getAdminSession } from "@/src/app/(admin)/auth";
import NavBar from "./NavBar";


export default async function NavContainer({}) {
const session = await getAdminSession();

  return (
    <nav className="sticky top-0 z-40 w-full transition-all duration-200">
      <NavBar session={session}/>
    </nav> 
  );
}