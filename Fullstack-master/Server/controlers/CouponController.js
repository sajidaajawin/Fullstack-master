const couponModel = require("../models/Coupon");
const { calculateDiscountedTotal } = require("../models/Coupon");
const applyCoupon = async (req, res) => {
  try {
    const { code ,discount_percentage } = req.body;
    console.log("dd", code);
    const cart = req.body.cart;
    // Assume that 'issa' is a valid array of items (cart)
    const coupon = await couponModel.getCouponByCode(code);

    if (!coupon) {
      return res.status(400).json({ error: "Invalid coupon code" });
    }

    // Calculate discounted total and send it to the frontend
    const discountedTotal = calculateDiscountedTotal(
      discount_percentage,
      cart
    );
    return res.status(200).json({ coupon, discountedTotal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const NewCoupon = async (req, res) => {
  try {
    const { code, discountPercentage } = req.body;
    const NewCoupon = await couponModel.createCoupon(code, discountPercentage);
    return res.status(200).json(NewCoupon.rows);
  } catch (error) {
    throw error;
  }
};

const DeleteCoupon = async (req, res) => {
  const id = req.params.id;
  try {
    const DeleteCoupon = await couponModel.deleteCoupon(id);
    return res.status(200).json(DeleteCoupon.rows);
  } catch (error) {
    throw error;
  }
};

const getCouponByCode = async (req, res) => {
  const { code } = req.body;
  try {
    const getCouponByCode = await couponModel.getCouponByCode(code);
    return res.status(200).json(getCouponByCode.rows);
  } catch (error) {}
};
const getCoupons = async (req, res) => {
  const { code } = req.body;
  try {
    const getCouponByCode = await couponModel.getCoupons();
    return res.status(200).json(getCouponByCode.rows);
  } catch (error) {}
};
const getCouponByid = async (req, res) => {
  const id = req.params.id;
  try {
    const getCouponByid = await couponModel.getCouponByid(id);
    return res.status(200).json(getCouponByid.rows);
  } catch (error) {}
};

module.exports = {
  applyCoupon,
  NewCoupon,
  DeleteCoupon,
  getCouponByCode,
  getCouponByid,
  getCoupons
};
