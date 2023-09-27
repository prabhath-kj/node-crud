import express from "express";
import { data } from "./database.js";
const port = 3000;
const app = express();

app.use(express.json());

//read
app.get("/items", (req, res) => {
  res.json(data);
});


app.get("/items/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "please provide id" });
  }
  const item = data.find((obj) => obj?.id == id);
  console.log(item);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(item);
});

//create
app.post("/items", (req, res) => {
  const newData = req.body;
  if (!data) {
    return res.status(404).json({ message: "Please provide post" });
  }
  data.push(newData);
  res.json(newData);
});

//update
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  if (!id) {
    return res.status(404).json({ message: "please provide id" });
  }
  const index = data.findIndex((obj) => obj.id == id);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  if (!data[index]) {
    return res.status(404).json({ message: "Item not found" });
  }
  data[index] = { ...data[index], ...newData };
  res.json(data[index]);
});


//delete
app.delete('/items/:id', (req, res) => {
    const {id} = req.params;
    const index = data.findIndex((obj) => obj.id == id);
    if (index === -1) {
     return res.status(404).json({ error: 'Item not found' });
    } 
      const deletedItem = data.splice(index, 1);
      res.json(deletedItem[0]);
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
