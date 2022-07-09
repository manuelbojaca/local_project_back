const Business = require("../models/business.model");
const User = require("../models/user.model");

module.exports = {
  //LIST ALL - GET
  async list(req, res) {
    try {
      const business = await Business.find();
      res.status(200).json({ message: "Businesses found", data: business });
    } catch (err) {
      res.status(400).json({ message: "Businesses no found", data: err });
    }
  },

  //SHOW BY ID - GET
  async show(req, res) {
    try {
      const { businessId } = req.params;
      const business = await Business.findById(businessId);
      res.status(200).json({ message: "Business found", data: business });
    } catch (err) {
      res.status(400).json({ message: "Business no found", data: err });
    }
  },
  //CREATE - POST
  async create(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId);
      const business = await Business.create({ ...req.body });
      user.business.push(business);
      await user.save({ validateBeforeSave: false });
      res.status(201).json({ message: "Business created" });
    } catch {
      res.status(201).json({ message: "Business couldnt be created" });
    }
  },

  //UPDATE - PUT
  async update(req, res) {
    try {
      const { businessId } = req.params;
      const business = await Business.findByIdAndUpdate(businessId, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      });
      res.status(200).json({ message: "Business updated", data: business });
    } catch (err) {
      res
        .status(400)
        .json({ mmessage: "Business couldnt be updated", data: err });
    }
  },

  //DELETE
  async destroy(req, res) {
    try {
      const businessId = req.params;
      const user = await User.findByIdAndDelete(businessId);
      res.status(200).json({ message: "User deleted", data: user });
    } catch (err) {
      res.status(400).json({ message: "User could not be deleted", data: err });
    }
  },
};
