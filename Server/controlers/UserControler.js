const User = require("../models/users");
const jwt = require("jsonwebtoken");
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
const getUsers = async (req, res) => {
  try {
    console.log("issa");
    const result = await User.getAllData();
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
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
  const user_id = req.params.user_id;
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  console.log("hi",  req.params.user_id)
  try {
    const result = await User.deleteUser(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const updateUser = async (req, res) => {
  const user_id = req.user;
  const { username, email, password } = req.body;

  try {
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.updateUser(
      user_id,
      username,
      email,
      hashedPassword
    );
    console.log(user_id, username, email, hashedPassword);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const bcrypt = require("bcrypt");
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
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await User.getEmailAdmin(email);
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

        // Check the role before responding
        if (user.role === "user") {
          return res.json({ message: "You Are Not Admin 😒" });
        }

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
    throw error;
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
          { user_id: user.user_id, username: user.username },
          key
        );

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
};