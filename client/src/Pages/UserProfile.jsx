import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error parsing JSON for key '${key}':`, error);
    return null;
  }
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({});
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log('Stored Token:', token);

    if (token !== null) {
      axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "token"
      )}`;
      axios.get("http://localhost:8000/user")
        .then((response) => {
          console.log("User Data:", response.data[0])
          setFormValues(response.data[0])
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setUser(false);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPhotoName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!error) {
      const storedToken = getLocalStorage('token');
      const updatedUser = new FormData();
      updatedUser.append('user_id', user.user_id);
      updatedUser.append('username_user', formValues.username);
      updatedUser.append('email', formValues.email);

      try {
        axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
          "token"
        )}`;
        const response = await axios.put(
          `http://localhost:8000/updateuser`,
          formValues
        );
        console.log("Server Response:", response.data[0]);
        setSuccessMessage("Profile updated successfully!");

        // Add SweetAlert for profile update success
        swal({
          title: "Success",
          text: "Profile updated successfully!",
          icon: "success",
          button: "OK",
        });
      } catch (error) {
        console.error("Error updating Information", error);
        setSuccessMessage("");
        setError("Error updating information. Please try again.");
      }
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      if (newPassword !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        return;
      }

      const response = await axios.put(
        'http://localhost:8000/updateuser',
        {
          user_id: user.user_id,
          currentPassword: formValues.password,
          newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log('Password Change Response:', response.data);
      setSuccessMessage('Password changed successfully!');
      setError('');
      setConfirmPasswordError('');

      // Add SweetAlert for password change success
      swal({
        title: "Success",
        text: "Password changed successfully!",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
      console.error('Error changing password:', error.response?.data || error.message);
      setSuccessMessage('');
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center ml-20 items-center">
      <div className="w-9/12 h-5/6 bg-white my-6 md:ml-24 px-10 py-8 rounded-lg shadow-md">
        <form>
          <div className="flex justify-center">
            <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="text-center">
                <div className="mt-2">
                  <span
                    className="block w-40 h-40 rounded-full m-auto shadow"
                    style={{
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundImage: `url('${
                        photoPreview !== null
                          ? photoPreview
                          : photoPreview
                      }')`,
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-[#C08261] border-[#C08261] rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-[#E2C799] focus-outline-none focus-border-indigo-400 focus-shadow-outline-indigo active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                  onClick={handleSelectPhoto}
                >
                  Select New Photo
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-col justify-start">
              <label htmlFor="username" className="self-start p-2 text-[#C08261]">
                Full Name
              </label>
              <input
                className="w-full mb-3 p-2 border rounded-md bg-gray-200"
                onChange={handleInputChange}
                type="text"
                name="username"
                value={formValues.username}
              />
            </div>

            <div className="flex flex-col justify-start">
              <label htmlFor="Email" className="self-start p-2 text-[#C08261]">
                Email
              </label>
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                onChange={handleInputChange}
                name="email"
                value={formValues.email}
              />
            </div>

            <div className="flex flex-col justify-start">
              <label htmlFor="password" className="self-start p-2 text-[#C08261]">
                Password
              </label>
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                onChange={handleInputChange}
                type="password"
                name="password"
              />
            </div>

            <div className="flex flex-col justify-start">
              <label htmlFor="confirmPassword" className="self-start p-2 text-[#C08261]">
                Confirm Password
              </label>
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                name="confirmPassword"
                value={confirmPassword}
              />
              {confirmPasswordError && (
                <p className="text-red-600 mt-2">{confirmPasswordError}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="w-1/4 mr-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
              type="button"
            >
              Cancel
            </button>
            <button
              className="w-auto py-2 px-3 bg-[#C08261] text-white rounded-xl mr-2"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="w-auto py-2 px-3 bg-[#C08261] text-white rounded-xl"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
