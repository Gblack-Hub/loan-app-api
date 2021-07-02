"use strict";
const Loan = require("../models/loan");
// const jwt = require('jsonwebtoken')

let response = {
  error: null,
  message: null,
  data: null,
};

let handleResultDisplay = (result, res, message) => {
  response = {
    error: false,
    message: message,
    data: result,
  };
  res.status(200).send(response);
};
let handleError = (err, res) => {
  response = {
    error: true,
    message: err.message,
    data: null,
  };
  res.status(500).send(response);
};

let loans = {
  addLoan: async (req, res) => {
    if (!req.body.amount_requested || req.body.amount_requested < 1000) {
      res.status(400).send({
        message: "Loan amount cannot be empty or less than &#8358;1,000",
      });
      return;
    }

    try {
      let { amount_requested, owner } = req.body;
      let loanData = new Loan({
        amount_requested,
        owner,
      });

      const result = await loanData.save();
      let message = "Loan request created successfully";
      handleResultDisplay(result, res, message);
    } catch (err) {
      handleError(err, res);
    }
  },
  getLoans: async (req, res) => {
    try {
      const result = await Loan.find({}).exec();
      let message = "All loan records available";
      handleResultDisplay(result, res, message);
    } catch (err) {
      handleError(err, res);
    }
  },
  getOneLoan: async (req, res) => {
    const { id } = req.params;
    try {
      // if(typeof req.header('Authorization') !== undefined){  //check if bearer is undefined
      // const token = req.header('Authorization').replace('Bearer ', '')
      // const user = jwt.verify(token, process.env.JWT_KEY)
      const result = await Loan.findById(id).exec();
      let message = "Loan data fetched successfully";
      handleResultDisplay(result, res);
      // } else {
      // 	response.sendStatus(403); //forbidden
      // }
    } catch (err) {
      handleError(err, res, message);
    }
  },
};

module.exports = loans;
