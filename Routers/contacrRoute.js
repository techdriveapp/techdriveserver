const express = require("express");
const { createContact, getContact } = require("../controler/contect");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/createcontact", createContact);

router.get("/getcontact", getContact);

module.exports = router;
