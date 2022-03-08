import Link from "next/link";
import Image from "next/image";
import LoggedInNav from "./loggedinNav";
import LoggedOutNav from "./loggedOutNav";
import { useAuth } from "../../context/authContext";

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="sticky top-0 grid grid-cols-2 z-50">
      <Link href="/">
        <a className="ml-5">
          <Image src="/logo.svg" alt="logo" width={200} height={100} />
        </a>
      </Link>

      {currentUser ? <LoggedInNav /> : <LoggedOutNav />}
    </nav>
  );
};

export default NavBar;
