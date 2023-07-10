//jshint esversion:6
var items = [];
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/army");
const app = express();

const Itemschema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model("Item", Itemschema);//model

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/", function (req, res) {
  
  res.render("list", { newlistitem:items});
});
app.post("/", function (req, res) {
  item = req.body.newItem;
  items.push(item);
  run(item);
  
  res.redirect("/");
  
});
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
async function run() {
  await Item.create({
    name: item
  });
  console.log("inserted in db success");
  return;
}
