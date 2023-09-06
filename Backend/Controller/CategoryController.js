var categoryModel = require('../Model/CategoryModel')

module.exports = {
    addCategory: async (req, res) => {
        const { categoryName } = req.body
        const imagePath = req.file.path;
        try {
            const category = await categoryModel.create({
                categoryName: categoryName,
                image: imagePath
            })
            res.json({ message: 'category created' })
            console.log(category)
        } catch (err) {
            console.log(err)
        }
    },
    categoryList: async (req, res) => {
        try {
            let categories = await categoryModel.find();
            console.log(categories)
            return res.status(201).send({ "data": categories })
        }
        catch (err) {
            console.log(err)
        }
    },
    deleteCategory: async (req, res) => {
        var { id } = req.params;
        try {
            await categoryModel.findByIdAndDelete(id);
            return res.status(204).send("Deleted successfully");
        } catch (err) {
            console.log(err)
        }
    },
    getCategoryById: async (req, res) => {
        const { id } = req.params;
        try {
            let category = await categoryModel.findById(id);
            console.log(category)
            res.json(category)
        } catch (err) {
            console.log(err)

        }
    },
    editCategory: async (req, res) => {
        const { id } = req.params;
        const { categoryName } = req.body;
        try {
            let category = await categoryModel.findById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            if (!categoryName || categoryName.trim() === '') {
                return res.status(400).json({ message: 'Category name cannot be empty' });
            } else {
                category.categoryName = categoryName;
            }            
            if (req.file && req.file.path) {
                const newImage = req.file.path.replace(/\\/g, '/');
                category.image = newImage;
            }
            await category.save();
            return res.status(200).json({ message: 'Category updated successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    


}