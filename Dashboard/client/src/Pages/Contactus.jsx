import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Contactus() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/getContactMessageByuser"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenEnvelope = (user) => {
    setSelectedUser(user);
  };

  const handleCloseEnvelope = () => {
    setSelectedUser(null);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5 ml-96 mt-30">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-[#C08261]">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Email
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Status
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {userData.map((user, index) => (
            <tr
              key={user.id}
              className={`hover:bg-gray-50 ${
                index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
              }`}
            >
              <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="text-sm">
                  <div className="font-medium text-gray-700">
                    {user.contact_name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm">
                  <div className="font-medium text-gray-700">
                    {user.contact_email}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {/* You can customize the icon and color based on user status */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-green-500"
                  >
                    {/* Customize the checkmark icon */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {user.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-start gap-4">
                  <button
                    className={`text-grey-500 px-4 py-2 rounded ${
                      user === selectedUser
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleOpenEnvelope(user)}
                    disabled={user === selectedUser}
                  >
                    {/* Envelope Font Awesome icon */}
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-6 w-6 text-[#C08261]"
                    />
                    {/* End Envelope Font Awesome icon */}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 max-w-md rounded-md">
            <h2 className="text-lg font-semibold mb-4">
              {selectedUser.contact_name}'s Message
            </h2>
            <p className="text-gray-700">{selectedUser.contact_message}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#C08261] text-white rounded-md"
              onClick={handleCloseEnvelope}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contactus;
