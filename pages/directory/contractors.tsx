import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/authContext";
import { collection, getDocs } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../../components/layout";

const Members: NextPage = () => {
  const { userInfo } = useAuth();
  const [contractors, setContractors] = useState<any[]>([]);
  const contractorCollectionRef = collection(db, "contractors");

  useEffect(() => {
    if (userInfo) {
      const getContractors = async () => {
        const data = await getDocs(contractorCollectionRef);
        setContractors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getContractors();
    }
  }, []);

  return (
    <Layout privateRoute={true} title="Contractors">
      <main className="mb-auto">
        <h1>Members</h1>
        {contractors.map((contractor) => (
          <div key={contractor.id}>
            <h2>{contractor.name}</h2>
            <p>{contractor.email}</p>
            <p>{contractor.phone}</p>
            <p>{contractor.address}</p>
            <p>{contractor.city}</p>
            <p>{contractor.state}</p>
            <p>{contractor.zip}</p>
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default Members;
