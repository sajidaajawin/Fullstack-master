import React, { useState, useEffect } from "react";
import axios from "axios";
import Statics from "./Statics";
import swal from "sweetalert";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  console.log("hhhhhhhhhhhh", users);
  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        console.log("API Response:", response.data);
        setUsers(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUsers([]);
      });
  }, []);

  const handleDelete = (user_id) => {
    // Find the user with the specified user_id
    const userToDelete = users.find((user) => user.user_id === user_id);

    // Check if the user was found
    if (!userToDelete) {
      console.error("User not found");
      alert("User not found. Please try again.");
      return;
    }

    // Determine if the user should be blocked or unblocked based on the 'is_deleted' attribute.
    const is_deleted = userToDelete.is_deleted;

    // Send a request to block/unblock the user using Axios.
    axios
      .put(`http://localhost:8000/deleteuser/${user_id}`)
      .then((response) => {
        console.log(user_id);
        // Handle the successful response
        if (is_deleted) {
          // alert("User unblocked successfully");
        } else {
          swal({
            title: "Done!",
            text: "User Blocked Successfully",
            icon: "success", // Fix the typo here
            confirmButtonText: "OK",
          });
        }
        // Update the user list (you may want to refetch it)
      })
      .catch((error) => {
        // Handle errors
        console.error("Error blocking/unblocking user:", error);
        alert("Failed to block/unblock the user. Please try again.");
      });
  };
  // const handleEdit = (e, userId) => {
  //   e.preventDefault();
  //   setIsEditModalOpen(true);
  //   setSelectedUserId(userId);
  // };

  return (
    <>
      <Statics />
      <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5 ml-96 mt-30">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-[#C08261]">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                State
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Role
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user, index) => (
              <tr
                key={user.user_id}
                className={`hover:bg-gray-50 ${
                  index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE]"
                }`}
              >
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={user.user_img}
                      alt=""
                    />
                    <span
                      className={`absolute right-0 bottom-0 h-2 w-2 rounded-full bg-${
                        user.active ? "green" : "red"
                      }-400 ring ring-white`}
                    ></span>
                    {/* <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {user.username}
                    </div>
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full ${
                      user.active ? "bg-green-50" : "bg-red-50"
                    } px-2 py-1 text-xs font-semibold text-${
                      user.active ? "green" : "red"
                    }-600`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        user.active ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></span>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4">{user.role}</td>
                {/* <td className="px-6 py-4"></td> */}
                <td className="px-6 py-4 ">
                  <div className="flex justify-start gap-4">
                    <button
                      className="px-4 py-2 bg-[#C08261] text-white rounded-lg"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      {user.is_deleted ? "Unblock" : "Block"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserTable;
