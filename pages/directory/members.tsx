import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/authContext";
import { collection, getDocs } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/layout";
import ContactCard from "../../components/contactCard";

const Members: NextPage = () => {
  const { userInfo } = useAuth();
  const [members, setMembers] = useState<any[]>([]);
  const usersCollectionRef = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    if (userInfo) {
      getUsers();
    }
  }, []);

  console.log(members);

  // search for a member by lastName or firstName with autocomplete
  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(members);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    const filtered = members.filter((member) => {
      return (
        member.lastName?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.firstName?.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFilteredMembers(filtered);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMembers(filteredMembers);
  };

  // group contacts by lastName with the first letter of the last name displayed as a header
  const groupedMembers = members.reduce((acc, curr) => {
    const lastName = curr.lastName?.charAt(0).toUpperCase();
    if (!acc[lastName]) {
      acc[lastName] = [];
    }
    acc[lastName].push(curr);
    return acc;
  }, {});

  return (
    <Layout privateRoute={true} title="Members">
      <main>
        {/* Title that says Members Directory */}
        <h1>Members</h1>
        {/*Styled Search bar form */}
        <form
          className="flex flex-row items-center justify-center w-full"
          onSubmit={handleSearchSubmit}
        >
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            type="text"
            placeholder="Search for a member"
            value={search}
            onChange={handleSearch}
          />
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Search"
          />
          {/* reset search */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setSearch("")}
          >
            Reset
          </button>
        </form>
        {/* List of members */}
        <div className="">
          {Object.keys(groupedMembers).map((key) => {
            return (
              <div className="flex flex-col items-center" key={key}>
                <h2 className="text-2xl font-bold text-gray-800">{key}</h2>
                {groupedMembers[key].map((member) => {
                  return <ContactCard key={member.id} member={member} />;
                })}
              </div>
            );
          })}
        </div>
        {/* {members.map((member) => (
          <ContactCard key={member.id} member={member} />
        ))} */}

        {/* pagination buttons */}
        {/* <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(members.length / membersPerPage)
            }
          >
            Next
          </button>
        </div> */}
      </main>
    </Layout>
  );
};

export default Members;
