const Agents = require("../models/agent");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");

const getAll = asyncWrapper(async (req, res, next) => {
  const { state: state } = req.query;
  const data = await Agents.find({ state: state });
  res.status(201).json({ length: data.length, data });
});

module.exports = {
  getAll,
};
