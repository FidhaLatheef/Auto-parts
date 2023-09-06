var BrandModel = require('../Model/BrandModel')

module.exports = {
    addBrand: async (req, res) => {
        try {
            const { brandName } = req.body
            const imagePath = req.file.path

            let brand = await BrandModel.create({
                brandName: brandName,
                image: imagePath
            })
            console.log(brand)
            res.status(201).json({ "message": "Brand added successfully" })
            console.log('brand added')
        } catch (err) {
            console.log(err)
        }
    },
    brandList: async (req, res) => {
        try {
            let brandList = await BrandModel.find()
            console.log(brandList)
            return res.status(201).send({ "data": brandList})
        } catch (err) {
            console.log(err)
        }
    },
    deleteBrand:async(req,res)=>{
        const {id} =req.params;
        try{
            await BrandModel.findByIdAndDelete(id);
            return res.status(204).send('Deleted Succesfully')
        }catch(err){
            console.log(err)
        }
    },
    getBrandById:async(req,res)=>{
        const {id}=req.params;
        try{
            let data=await BrandModel.findById(id);
            console.log(data)
            res.json(data)
        }catch(err){
            console.log(err)
        }
    },
    editBrand:async(req,res)=>{
        const {id}=req.params;
        const {brandName}=req.body;
        try{
            let brand= await BrandModel.findById(id);
            if(!brand){
                return res.status(404).json({ message: 'Brand not found' });
            }
            if(!brandName || brandName.trim()===''){
                return res.status(400).json({ message: 'Brand name cannot be empty' });
            }else{
                brand.brandName=brandName;

            }if (req.file && req.file.path) {
                const newImage = req.file.path.replace(/\\/g, '/');
                brand.image = newImage;
            }
            await brand.save();
            return res.status(200).json({ message: 'Category updated successfully' });
        }catch(err){
            console.log(err)
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}