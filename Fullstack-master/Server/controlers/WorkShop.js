const workshop = require("../models/workshop");

const getAllShop = async (req, res) => {
  try {
    const result = await workshop.getAllShop();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getShopid = async (req, res) => {
  const workshop_id = req.params.workshop_id;
  try {
    const result = await workshop.getShopid(workshop_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const newShop = async (req, res) => {
  const url = res.locals.site;

  try {
    const {
      workshop_name,
      workshop_dis,
      workshop_title,
    } = req.body;
   
    
    const newblog = await workshop.newShop(
      workshop_name,
      workshop_dis,
      workshop_title,
      url
    
    );

    return res.status(200).json(newblog.rows);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

const deleteShop = async (req, res) => {
  const workshop_id = req.params.workshop_id;
  try {
    const result = await workshop.deleteShop(workshop_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updateShop = async (req, res) => {
  const workshop_id = req.params.workshop_id;
  const {
    workshop_name,
    workshop_dis,
    workshop_title,
    workshop_start,
    workshop_end,
  } = req.body;
  try {
    const result = await workshop.updateShop(
      workshop_id,

      workshop_name,
      workshop_dis,
      workshop_title,
      workshop_start,
      workshop_end
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updatedImage = async (req, res) => {
  const workshop_id = req.params.workshop_id;
  const workshop_img = res.locals.site;
  console.log(workshop_img);

  // console.log(birthday);
  try {
    const result = await workshop.updatedImage(
      workshop_id,

      workshop_img
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  getAllShop,
  getShopid,
  newShop,
  deleteShop,
  updateShop,
  updatedImage
};
