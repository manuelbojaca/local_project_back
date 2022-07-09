const Store = require("../models/store.model");
const User = require("../models/user.model");

module.exports = {
  //LIST ALL - GET
  async list(req, res) {
    try {
      const store = await Store.find();
      res.status(200).json({ message: "storees found", data: store });
    } catch (err) {
      res.status(400).json({ message: "storees no found", data: err });
    }
  },

  //SHOW BY ID - GET
  async show(req, res) {
    try {
      const { storeId } = req.params;
      const store = await Store.findById(storeId);
      res.status(200).json({ message: "store found", data: store });
    } catch (err) {
      res.status(400).json({ message: "store no found", data: err });
    }
  },
  //CREATE - POST
  async create(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId);
      const store = await store.create({ ...req.body });
      user.store.push(store);
      await user.save({ validateBeforeSave: false });
      res.status(201).json({ message: "store created" });
    } catch {
      res.status(201).json({ message: "store couldnt be created" });
    }
  },

  //UPDATE - PUT
  async update(req, res) {
    try {
      const { storeId } = req.params;
      const store = await Store.findByIdAndUpdate(storeId, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      });
      res.status(200).json({ message: "store updated", data: store });
    } catch (err) {
      res.status(400).json({ mmessage: "store couldnt be updated", data: err });
    }
  },

  //DELETE
  async destroy(req, res) {
    try {
      const storeId = req.params;
      const user = await Store.findByIdAndDelete(storeId);
      res.status(200).json({ message: "User deleted", data: user });
    } catch (err) {
      res.status(400).json({ message: "User could not be deleted", data: err });
    }
  },
};
