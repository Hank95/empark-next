import { useState } from "react";

interface UserInfo {
  admin: boolean;
  city: string;
  country: string;
  email: string;
  firstName: string;
  homeAddress1: string;
  homeAddress2: string;
  homePhone: string;
  emPhone: string;
  lastName: string;
  mobilePhone: string;
  parkCottageName: string;
  emAddress: string;
  state: string;
  zipCode: string;
  id: string;
}

// card component that displays name, phone numbers, and email. Then if it is clicked, it will display all of the memebers info.  Styled with Tailwind.
export default function ContactCard({ member }: { member: UserInfo }) {
  const [isClicked, setIsClicked] = useState(false);
  const formatPhone = (phone: string) => {
    let phoneFormatted = phone.replace(/[^\d]/g, "");
    if (phoneFormatted.length === 10) {
      phoneFormatted = `(${phoneFormatted.substring(
        0,
        3
      )}) ${phoneFormatted.substring(3, 6)}-${phoneFormatted.substring(6, 10)}`;
    }
    return phoneFormatted;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full ${
        isClicked ? "bg-gray-100" : "bg-white"
      } rounded-lg shadow-lg p-4 m-2`}
      onClick={() => setIsClicked(!isClicked)}
    >
      <h1 className="text-xl font-bold text-gray-800">
        {member.firstName} {member.lastName}
      </h1>
      <p className="text-gray-600 m-2">{member.email}</p>
      {member.emPhone && (
        <p className="text-gray-600 m-2">
          Eagles Mere Phone: {formatPhone(member.emPhone)}
        </p>
      )}
      {member.homePhone && (
        <p className="text-gray-600 m-2">
          Home Phone: {formatPhone(member.homePhone)}
        </p>
      )}
      {member.mobilePhone && (
        <p className="text-gray-600 m-2">
          Mobile Phone: {formatPhone(member.mobilePhone)}
        </p>
      )}
      {isClicked && (
        <div className="grid grid-cols-2 gap-4 mx-auto w-3/4 sm:w-2/3 lg:w-1/2">
          <div className="bg-gray-100 p-4 rounded-lg col-span-2">
            <p className="text-gray-600 m-2">{member.parkCottageName}</p>
            <p className="text-gray-600 m-2">{member.emAddress}</p>
            <p className="text-gray-600 m-2">
              {member.city}, {member.state} {member.zipCode}
            </p>
            <p className="text-gray-600 m-2">{member.country}</p>
          </div>
        </div>
      )}
    </div>
  );
}
