const { sendErrorResponse } = require("../helpers/send.error.response");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

const getAllAdmins = async (req, res) => {
  try {
    const allAdmin = await Admin.findAll();
    res.status(200).json({ message: "All Admins", data: allAdmin });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addAdmin = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      phone_number,
    } = req.body;

    const isHasAdmin = await Admin.findOne({ where: { email } });
    if (isHasAdmin) {
      return sendErrorResponse({ message: "Bunday admin mavjud!" }, res, 403);
    }

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 8);
    const newAdmin = await Admin.create({
      first_name,
      last_name,
      email,
      password: hashed_password,
      phone_number,
    });
    res.status(201).json({ message: "New Admin added", data: newAdmin });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      confirm_password,
    } = req.body;

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }
    const editAdmin = await Admin.update(
      {
        first_name,
        last_name,
        email,
        password,
        phone_number,
      },
      { where: { id }, returning: true }
    );
    res.status(201).json({ message: "A admin edited", data: editAdmin[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const checkAdmin = await Admin.findByPk(id);
    if (!checkAdmin) {
      return res.status(201).json({ message: "This Admin Id not found" });
    }
    await Admin.destroy({ where: { id } });
    res.status(201).json({ message: "A Admin deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneAdminByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneAdmin = await Admin.findByPk(id);
    res.status(201).json({ message: "A Admin", data: oneAdmin });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getOneAdminByID,
};
