import { v4 as uuidv4 } from 'uuid';
import { dbService } from "#config/db.service.js";

export const productsController = {
    async getAllProducts(req, res) {
        try{
            const db = dbService.readDB()
            const products = db.products;

            res.json(products);
        }catch(err){
            console.log(`Failed to get the product list: ${products}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async getFilteredProducts (req, res) {
        try{
            const db = dbService.readDB();

            let products = db.products;

            if(req.params.type) {
                if(req.params.type === "ALL") {
                    products = db.products
                }else if(req.params.type === "CATEGORY"){
                    products = products.filter(product => product.category === req.params.filter)
                }else if(req.params.type === "SIZE") {
                    products = products.filter(product => {
                        if(Array.isArray(product.size)){
                            return product.size.some(color => color === req.params.filter)
                        }else{
                            return false;
                        }
                    })
                }else if(req.params.type === "STATUS") {
                    products = products.filter(product => product.status === req.params.filter);
                }else if(req.params.type === "GENDER") {
                    products = products.filter(product => product.gender === req.params.filter);
                }else if(req.params.type === "COLOR") {
                    products = products.filter(product => {
                        if(Array.isArray(product.color)){
                            return product.color.some(color => color === req.params.filter)
                        }else{
                            return false;
                        }
                    })
                }
            }

            res.json(products || []);
        }catch(err){
            console.log(`Failed to get the filtered product list: ${products}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async getSearchedProducts (req, res) {
        try{
            const db = dbService.readDB();

            let products = db.products;

            const search = req.query.search?.toLowerCase();
            if(search) {
                products = products.filter(product => {
                    const inTitle = product.title?.toLowerCase().includes(search) || false
                    const inCategory = product.category?.toLowerCase().includes(search) || false
                    const inMaterial = product.material?.toLowerCase().includes(search) || false
                    const inDesc = product.description?.toLowerCase().includes(search) || false
                    const inGender = product.gender?.toLowerCase().includes(search) || false

                    return inTitle || inCategory || inMaterial || inDesc || inGender
                });
            }

            res.json(products || []);
        }catch(err){
            console.log(`Failed to get the searched product list: ${products}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async getMyStackProducts (req, res) {
        try{
            const db = dbService.readDB();
            const products = db.products.filter(p => p.userId === req.params.userId)
            const stack = products.filter(p => p.status === 'Availability')
            res.json(stack || []);
        }catch (err){
            console.log(`Failed to get the product list creating by me: ${stack}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async getMyOutOfStackProducts (req, res) {
        try{
            const db = dbService.readDB();
            const products = db.products.filter(p => p.userId === req.params.userId)
            const outOfStack = products.filter(p => p.status === 'Exhausted')
            res.json(outOfStack || []);
        }catch (err){
            console.log(`Failed to get the product list creating by me: ${outOfStack}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async getProductsById (req, res) {
        try{
            const db = dbService.readDB();
            const product = db.products.find(p => p.id === req.params.id)

            res.json(product || {});
        }catch (err){
            console.log(`Failed to get the product by id: ${product}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async createdProduct (req, res) {
        try{
            const db = dbService.readDB()

            if(!req.files){
                res.status(400).json('Text fields:', req.body);
                res.status(400).json('Files from Multer:', req.files);
                return res.status(400).json({ message: 'Product photos are mandatory.'})
            }

            const images = req.files.map(file => `uploads/products/${file.filename}`);
            const newProduct = {id: uuidv4(), userId: req.user.id, images, ...req.body, quantity: Number(req.body.quantity), price: Number(req.body.price), favorite: false, checked: false}

            db.products.push(newProduct)
            dbService.writeDB(db)
            res.status(201).json(newProduct);
        }catch(err){
            console.log(`Failed to create the product cover: ${newProduct}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async updateProductItem (req, res) {
        try{
            const db = dbService.readDB()

            const index = db.products.findIndex(p => p.id === req.params.id);
            if (index !== -1) db.products[index] = { ...db.products[index], ...req.body };

            dbService.writeDB(db);
            return res.json(db.products[index] || []);
        }catch(err){
            console.log(`Failed to update the product cover: ${index}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async deleteProduct (req, res) {
        try{
            const db = dbService.readDB();

            const productIndex = db.products.findIndex(p => p.id === req.params.id);
            if (productIndex === -1) return res.status(404).json({ message: "Product not found" });
            const [deletedProduct] = db.products.splice(productIndex, 1);

            dbService.writeDB(db);
            res.json(deletedProduct);
        }catch(err){
            console.log(`Failed to delete the product cover: ${productIndex}`, err)
            res.status(500).json({error: err.message})
        }
    },
}