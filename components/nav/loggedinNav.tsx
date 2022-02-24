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
          <ul className="top-6 w-48 bg-white shadow px-3 py-4">
            <li className="py-1">
              <Link href="/directory/members">
                <a className="block  font-bold text-base uppercase hover:bg-gray-200 cursor-pointer rounded-lg p-2 text-center">
                  Members
                </a>
              </Link>
            </li>
            <li className="py-1">
              <Link href="/directory/contractors">
                <a className="block  font-bold text-base uppercase hover:bg-gray-200 cursor-pointer rounded-lg p-2 text-center">
                  Recommended Contractors
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="group  relative dropdown  px-4   cursor-pointer font-bold text-base uppercase tracking-wide">
        <Link href="/profile/details">
          <a className="hover:bg-gray-200 p-2 rounded-lg">Profile</a>
        </Link>
        <div className="group-hover:block dropdown-menu absolute hidden h-auto right-0">
          <ul className="top-5 w-48 bg-white shadow px-3 py-4">
            <li className="py-1">
              <Link href="/profile/details">
                <a className="block  font-bold text-base uppercase hover:bg-gray-200 cursor-pointer rounded-lg p-2 text-center">
                  Profile
                </a>
              </Link>
            </li>
            <li className="py-1">
              <a
                className="block  font-bold text-base uppercase hover:bg-gray-200 cursor-pointer rounded-lg p-2 text-center"
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
