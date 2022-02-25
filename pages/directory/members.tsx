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

  useEffect(() => {
    if (userInfo) {
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getUsers();
    }
  }, []);

  console.log(members);

  return (
    <Layout privateRoute={true} title="Members">
      <main>
        <h1>Members</h1>
        {members.map((member) => (
          <ContactCard key={member.id} member={member} />
        ))}
      </main>
    </Layout>
  );
};

export default Members;
