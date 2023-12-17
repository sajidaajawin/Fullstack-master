const User = require("../models/users");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

require("dotenv").config();

const key = "issa";

const newUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(password);
    const role = "user";
    const existUser = await User.getEmail(email);

    if (existUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }
    const newUser = await User.newUser(username, email, password, role);

    return res.status(200).json(newUser.rows);
  } catch (error) {
    console.log(error);
  }
};
// const getpagi = async (req, res) => {
//   try {
//     const page = req.params.page;
//     const limit = 5;
//     const offset = (page - 1) * limit;
//     console.log("I am here", page, limit);
//     console.log("🤣🤣🤣🤣🤣", page, limit);

//     const result = await products.getAllblogss(limit, offset);

//     if (!result) {
//       console.error("Error fetching blog data");
//       return res.status(500).json({ error: "Internal Server Error" });
//     }

//     const totalCount = await products.getTotalCount(); // Implement a function to get the total count of products

//     if (totalCount === undefined || totalCount === null) {
//       console.error("Error fetching total count");
//       return res.status(500).json({ error: "Internal Server Error" });
//     }

//     const totalPages = Math.ceil(totalCount / limit);

//     const pagination = {
//       current: page,
//       prev: page > 1 ? page - 1 : null,
//       next: page < totalPages ? parseInt(page) + 1 : null,
//       total: totalPages,
//     };

//     res.json({ result, totalPages, pagination, limit });
//   } catch (error) {
//     console.error("Error in getpagi:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

const getUsers = async (req, res) => {
  try {
    const page = req.params.page;
    const limit = 3;
    const offset = (page - 1) * limit;
    console.log("I am here", page, limit);
    console.log("🤣🤣🤣🤣🤣", page, limit);

    const result = await User.getAllData(limit, offset);
    console.log("issa");
    // const result = await User.getAllData();

    if (!result) {
      console.error("Error fetching blog data");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const totalCount = await User.getTotalCounts(); // Implement a function to get the total count of products

    if (totalCount === undefined || totalCount === null) {
      console.error("Error fetching total count");
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const totalPages = Math.ceil(totalCount / limit);

    const pagination = {
      current: page,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? parseInt(page) + 1 : null,
      total: totalPages,
    };

    res.json({ result, totalPages, pagination, limit });
  } catch (error) {
    console.error("Error in :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUser = async (req, res) => {
  const user_id = req.user;
  try {
    const result = await User.getUser(user_id);
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getAllUsers = async (req, res) => {
  try {
    const result = await User.getAllUsers();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (req, res) => {
  const user_id = req.user;
  const { currentPassword, newPassword } = req.body;

  try {
    // Retrieve the user from the database using the modified method
    const user = await User.getUserById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password provided matches the stored password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const result = await User.updatePassword(user_id, hashedPassword);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const decode = (req, res) => {
  const { token } = req.body;
  try {
    const result = User.decodeToken(token, key);
    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};
const deleteUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const result = await User.deleteUser(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const updateUser = async (req, res) => {
  const user_id = req.user;
  const user_img = res.locals.site;
  console.log(user_img);
  const { username, email, phone_number, birthday } = req.body;
  console.log(birthday);
  try {
    // تشفير كلمة المرور

    const result = await User.updateUser(
      user_id,
      username,
      email,

      user_img,
      phone_number,
      birthday
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await User.getEmail(email);
    console.log(result.rows);
    if (result.rows.length > 0) {
      // User found
      const user = result.rows[0];

      // Verify the provided password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Passwords match, create a token
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, role: user.role }, // Payload
          key
        );

        // Update the 'active' field to true in the database
        await User.setActiveStatus(user.user_id, true);

        console.log(token);
        res.cookie("token", token, { httpOnly: true });

        return res.json({ user, token });
      } else {
        return res.json({ message: "Incorrect password" });
      }
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
const validateEmail = (email) => {
  return validator.isEmail(email);
};
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password presence
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const result = await User.getEmailAdmin(email);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, role: user.role },
          key
        );

        await User.setActiveStatus(user.user_id, true);

        if (user.role === "user") {
          return res.status(403).json({ message: "You are not an admin." });
        }

        res.cookie("token", token, { httpOnly: true });

        return res.json({ user, token });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const logout = async (req, res) => {
  const user_id = req.user;
  try {
    await User.setActiveStatus(user_id, false);
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const google = async (req, res) => {
  try {
    console.log("object");
    const { id, email, name, picture } = req.body;
    const user_img = picture;

    const role = "user";
    const existUser = await User.getEmail(email);

    if (existUser.rows.length > 0) {
      try {
        const user = existUser.rows[0];

        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, role: user.role },
          key
        );
        await User.setActiveStatus(user.user_id, true);

        return res.json({ user, token });
      } catch (error) {
        throw error;
      }
    }
    const newUser = await User.newUser(name, email, id, role, user_img);

    return res.status(200).json(newUser.rows);
  } catch (error) {
    console.log(error);
  }
  // console.log(req.body)
};

const getUserProfile = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const userBookings = await User.UserProfile(user_id); // افترض أن `db` هو كائن الاتصال بقاعدة البيانات

    return res.status(200).json(userBookings.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  newUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
  decode,
  google,
  getUserProfile,
  logout,
  loginAdmin,
  updatePassword,
  validateEmail,
  getAllUsers
};