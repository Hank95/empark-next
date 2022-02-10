import Link from "next/link";

const LoggedOutNav = () => {
  return (
    <ul className="flex flex-row items-center justify-center space-x-3">
      <li>
        <Link href="/">
          <a className="hover:bg-gray-200 p-2 rounded-lg">Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a className="hover:bg-gray-200 p-2 rounded-lg">About</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a className="hover:bg-gray-200 p-2 rounded-lg">Login</a>
        </Link>
      </li>
    </ul>
  );
};

export default LoggedOutNav;
