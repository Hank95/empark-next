import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/authContext";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/layout";
import ContactCard from "../../components/contactCard";

const Members: NextPage = () => {
  const { userInfo } = useAuth();
  const [members, setMembers] = useState<any[]>([]);
  const [docSnapShotLast, setDocSnapShotLast] = useState<any>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    if (userInfo) {
      const getUsers = async () => {
        const initialQuery = query(
          usersCollectionRef,
          orderBy("lastName", "asc"),
          limit(2)
        );
        const data = await getDocs(initialQuery);
        setDocSnapShotLast(data.docs[data.docs.length - 1]);
        setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getUsers();
    }
  }, []);

  // function to search for members using the firestore where clause
  const searchMembers = async () => {
    const queryData = query(
      usersCollectionRef,
      where("firstName", ">=", searchTerm),
      where("firstName", "<=", searchTerm + "\uf8ff"),
      where("lastName", ">=", searchTerm),
      where("lastName", "<=", searchTerm + "\uf8ff"),
      orderBy("lastName", "asc"),
      limit(5)
    );
    const data = await getDocs(queryData);
    setDocSnapShotLast(data.docs[data.docs.length - 1]);
    setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getMoreUsers = async () => {
    const queryData = query(
      usersCollectionRef,
      orderBy("lastName", "asc"),
      startAfter(docSnapShotLast),
      limit(2)
    );
    const data = await getDocs(queryData);
    setDocSnapShotLast(data.docs[data.docs.length - 1]);
    setMembers([
      ...members,
      ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    ]);
  };

  // when the user scrolls close to the bottom of the page, get more users
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      getMoreUsers();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout privateRoute={true} title="Members">
      <main className="mb-auto">
        <h1>Members</h1>
        {/* Search bar */}
        <div className="flex flex-wrap justify-center">
          <form onSubmit={searchMembers} className="w-full max-w-sm">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Search
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              type="text"
              placeholder="Search by first or last name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input type="submit" value="Search" />
          </form>
        </div>
        {members.map((member) => (
          <ContactCard key={member.id} member={member} />
        ))}
        {/* add loading indicator when loading more members */}

        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={getMoreUsers}
            disabled={docSnapShotLast === ""}
          >
            Load More
          </button>
        </div>
      </main>
    </Layout>
  );
};

//   console.log(docSnapShotLast);

//   // dis
//   return (
//     <Layout privateRoute={true} title="Members">
//       <main>
//         <h1>Members</h1>
//         <div className="flex flex-wrap justify-center">
//           {members.map((member) => (
//             <ContactCard key={member.id} member={member} />
//           ))}
//         </div>
//       </main>
//     </Layout>
//   );
// };

export default Members;
