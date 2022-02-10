import Link from "next/link";
import { useAuth } from "../../context/authContext";

const LoggedInNav = () => {
  const { currentUser, logout } = useAuth();
  return (
    <ul className="flex flex-row items-center justify-center space-x-3">
      <li>
        <Link href="/about">
          <a className="hover:bg-gray-200 p-2 rounded-lg">About</a>
        </Link>
      </li>
      <li>
        <Link href="/rules">
          <a className="hover:bg-gray-200 p-2 rounded-lg">Park Rules</a>
        </Link>
      </li>
      <li className="group  relative dropdown  px-4   cursor-pointer font-bold text-base uppercase tracking-wide">
        <Link href="/directory">
          <a className="hover:bg-gray-200 p-2 rounded-lg">Directory</a>
        </Link>
        <div className="group-hover:block dropdown-menu absolute hidden h-auto">
          <ul className="top-5 w-48 bg-white shadow px-6 py-8">
            <li className="py-1">
              <a className="block  font-bold text-base uppercase hover:bg-gray-200 cursor-pointer">
                Member
              </a>
            </li>
            <li className="py-1">
              <a className="block  font-bold text-base uppercase hover:bg-gray-200 cursor-pointer">
                Recommended Contractors
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li className="group  relative dropdown  px-4   cursor-pointer font-bold text-base uppercase tracking-wide">
        <Link href="/profile">
          <a className="hover:bg-gray-200 p-2 rounded-lg">Profile</a>
        </Link>
        <div className="group-hover:block dropdown-menu absolute hidden h-auto">
          <ul className="top-5 w-48 bg-white shadow px-6 py-8">
            <li className="py-1">
              <a className="block  font-bold text-base uppercase hover:bg-gray-200 cursor-pointer">
                Profile
              </a>
            </li>
            <li className="py-1">
              <a
                className="block  font-bold text-base uppercase hover:bg-gray-200 cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
};

export default LoggedInNav;
