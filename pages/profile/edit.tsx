import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { db } from "../../lib/firebase";
import { getDoc, doc, setDoc } from "@firebase/firestore";
import { useRouter } from "next/router";

const ProfileForm = () => {
  const { userInfo, setUserInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    emPhone: userInfo?.emPhone || "",
    homePhone: userInfo?.homePhone || "",
    mobilePhone: userInfo?.mobilePhone || "",
    homeAddress1: userInfo?.homeAddress1 || "",
    homeAddress2: userInfo?.homeAddress2 || "",
    city: userInfo?.city || "",
    state: userInfo?.state || "",
    zipCode: userInfo?.zipCode || "",
    parkCottageName: userInfo?.parkCottageName || "",
    emAddress: userInfo?.emAddress || "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // const userDoc = doc(db, "users", userInfo.id);
    // await updateDoc(userDoc, userData);
    if (userInfo) {
      await setDoc(doc(db, "users", userInfo.id), userData, {
        merge: true,
      });

      // console.log(newDoc.data());
      let userDoc = await getDoc(doc(db, "users", userInfo.id));
      setUserInfo({ ...userDoc.data() });
      setIsLoading(false);
      router.push("/profile/details");
    } else {
      setIsLoading(false);
      console.log("User not found");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  //function to handle phone number input so that it only allows numbers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // this form will be used to update the user's profile.  Styled with tailwind css.  The user's profile will be updated in the database. The form will update userData with the new data.  The userData will be used to update the database.

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="emPhone"
          >
            Eagles Mere Phone
          </label>
          <input
            type="text"
            name="emPhone"
            id="emPhone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.emPhone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="homePhone"
          >
            Home Phone
          </label>
          <input
            type="text"
            name="homePhone"
            id="homePhone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.homePhone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="mobilePhone"
          >
            Mobile Phone
          </label>
          <input
            type="text"
            name="mobilePhone"
            id="mobilePhone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.mobilePhone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="homeAddress1"
          >
            Home Address 1
          </label>
          <input
            type="text"
            name="homeAddress1"
            id="homeAddress1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.homeAddress1}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="homeAddress2"
          >
            Home Address 2
          </label>
          <input
            type="text"
            name="homeAddress2"
            id="homeAddress2"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.homeAddress2}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.city}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="state"
          >
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="zipCode"
          >
            Zip Code
          </label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.zipCode}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="parkCottageName"
          >
            Park Cottege Name
          </label>
          <input
            type="text"
            name="parkCottageName"
            id="parkCottageName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.parkCottageName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-gray-700 text-sm font-bold mb-2"
            htmlFor="emAddress"
          >
            Eagles Mere Address
          </label>
          <input
            type="text"
            name="emAddress"
            id="emAddress"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userData.emAddress}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
