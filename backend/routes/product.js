import express from "express";
import Product from "../model/Product.js";
import mongoose from "mongoose";

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const { user, name, quantity, price } = req.body
    const product = await Product.create({
      user,
      name,
      quantity,
      price
    });
    res.json({
      success: true,
      message: "product is added",
      product
    })
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: `${deletedProduct.name} product is deleted`,
      deletedProduct,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

// Route for searching products
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { search } = req.query;

  try {
    const searchResults = await Product.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(id),
          name: { $regex: new RegExp(search, 'i') }
        }
      }
    ]);

    res.json(searchResults);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.find({ user: id });
    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { productId, operation } = req.body;

    let updatedProduct;

    if (operation === "add") {
      updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $inc: { quantity: 1 } },
        { new: true }
      );
    } else if (operation === "sub") {
      updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $inc: { quantity: -1 } },
        { new: true }
      );
    } else {
      return res.status(400).json({ success: false, message: "Invalid operation." });
    }

    if (updatedProduct) {
      res.json({
        success: true,
        product: updatedProduct
      });
    } else {
      res.status(404).json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update quantity." });
  }
});

export default router