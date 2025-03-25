const express = require('express');
const router = express.Router();
const person = require('../models/person')

router.post("/", async (req, res) => {
    try {
      const newPerson = new person(req.body);
      const savedPerson = await newPerson.save();
      console.log("data save successfully");
      res.status(200).json(savedPerson);
    } catch (error) {
      console.error("Error saving person", error);
      res.status(500).json({ error: "internal server error" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const data = await person.find().limit(50);
      console.log("data fetched successfully");
      res.status(200).json(data);
    } catch (err) {
      console.error("Error while fetching data", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/:workType", async (req, res) => {
    try {
      const workType = req.params.workType;
      if (workType == "chef" || workType == "manager" || workType == "waiter") {
        const response = await person.find({ work: workType }).limit(50);
        console.log("response fetched");
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "Invalid work type" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.put('/:id',async (req, res) => {
    try {
      const personId = req.params.id;
      const updatedPersonData = req.body;

      const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
        new: true, // return the updates document
        runValidators: true, // run mongoose validation like required.
      });

      console.log("data updated");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({err: "Internal server error"});
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      
     const personId = req.params.id;
     const response = await person.findByIdAndDelete(personId);

     if(!response){
      return res.status(404).json("Person Not Found");
     }

     console.log("deleted person details");
     res.status(200).json({message : "item deleted successfully"});

    } catch (err) {
      console.log(err);
      res.status(500).json({err: "Internal server error"});
    }
  })

  module.exports = router