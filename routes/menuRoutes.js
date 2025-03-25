const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');

router.post("/", async (req, res) => {
    try {
      const newMenu = new Menu(req.body);
      const savedMenu = await newMenu.save();
      console.log("Menu save successfully");
      res.status(200).json(savedMenu);
    } catch (error) {
      console.error("Error saving menu", error);
      res.status(500).json({ error: "internal server error" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const data = await Menu.find();
      console.log("data fetched successfully");
      res.status(200).json(data);
    } catch (err) {
      console.error("Error while fetching data", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get('/:menuTaste',async (req, res) => {
    try {
      const menuTaste = req.params.menuTaste;
      if(menuTaste == "sweet" || menuTaste == "sour" || menuTaste == "spicy"){
        const response = await Menu.find({taste: menuTaste});
        console.log("data fetched");
        res.status(200).json(response);
      }else{
        res.status(404).json({ error: "Invalid menu taste" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({err : "Internal server error"});
    }
  })

  router.put('/:id', async (req, res) => {
    try {
      const menuId = req.params.id;
      const updatedMenuData = req.body;
      const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
        new: true,
        runValidators: true
      })

      if(!response){
        return res.status(404).json({error: "Person Not Found"});
      }

      console.log("data updated");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({err: "Internal server error"});
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const menuId = req.params.id;

      const response = await Menu.findByIdAndDelete(menuId);
      if(!response){
        return res.status(404).json({error: "Item Not Found"});
      }

      console.log("data deleted");
      res.status(200).json({message : "item deleted successfully"});

    } catch (err) {
      console.log(err);
      res.status(500).json({err: "Internal server error"});
    }
  })

  module.exports = router;