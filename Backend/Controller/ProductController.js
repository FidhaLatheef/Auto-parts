var productModel = require('../Model/ProductModel');


module.exports = {
    
  addProduct: async (req, res) => {
    const {productName, description, price,brandName,categoryName,modelName } = req.body;
    const imagePaths = req.files.map(file => file.path);
    try {
      const product = await productModel.create({
        productName: productName,
        description: description,
        price: price,
        brandName:brandName,
        modelName:modelName,
        categoryName :categoryName ,
        images: imagePaths
      });
      console.log('Product created:', product);
      res.send({ message: 'Product created successfully.' });
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json({ message: 'Failed to create the product.' });
    }
  },
  productList: async (req, res) => {
    try {
      let products = await productModel.find();
      console.log(products);
      products = products.map((product) => {
        if (product.images) {
          return {
            ...product.toObject(),
            images: product.images.map((image) => `${image}`), 
          };
        }
        return product;
      });
      res.json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving products' });
    }
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params
    try {
      await productModel.findByIdAndDelete(id)
      console.log('product Deleted Succesfully')
      res.json({ message: 'product Deleted Succesfully' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Errorr Deleting Product' })
    }
  },
  getProductById: async (req, res) => {
    const { id } = req.params
    try {
      let product = await productModel.findById(id)
      console.log(product)
      res.json(product)
    } catch (err) {
      console.log('errorr...', err)
    }
  },
  updateProductById: async (req, res) => {
    const { id } = req.params;
    const { productName, description, price,brandName,categoryName,modelName  } = req.body;
    const newImages = req.files.map((file) => file.path);
  
    try {
      const product = await productModel.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      // Update the product fields
      product.productName= productName;
      product.description= description;
      product.price=price;
      product.brandName=brandName;
      product.modelName=modelName;
      product.categoryName=categoryName ;
     
  
      // Concatenate the new images with the existing ones
      product.images = product.images.concat(newImages);
  
      await product.save(); // Save the updated product
  
      return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  filterProducts:async(req,res)=>{

    try {
      const { brandName, categoryName } = req.query;
  
      const filters = {};
      if (brandName) filters.brandName = brandName;
      if (categoryName) filters.categoryName = categoryName;
  
      const filteredProducts = await productModel.find(filters);
  
      res.json(filteredProducts);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  }
 
