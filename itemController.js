import Item from "../models/items.js";

// Get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create item (admin only)
export const createItem = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "All fields (name, price, image) are required" });
  }

  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ message: "Price must be a valid, positive number" });
  }

  try {
    const newItem = new Item({ name, price, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error saving item", error });
  }
};
export const editItem = async(req,res)=>{
    try{
        const editedItem = await Item.findByIdAndUpdate(req.params.id);
        if(!editedItem){
            return res.status(404).json({message:"Item not getting edited"});
        }
        res.json({message:"Item updated successfully"});
    }catch(error){
        res.status(500).json({message:"Error updating item",error});
    }
};
// Delete item (admin only)
export const deleteItem = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Only admins can delete items" });
      }
  
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error });
    }
  };
  
// console.log("User trying to add item:", req.user);

