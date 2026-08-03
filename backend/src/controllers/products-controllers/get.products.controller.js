import { dbService } from "../../config/db.service.js";

export const getProductsController = {
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
    async getCart (req, res){
        try{
            const db = dbService.readDB()
            const cart = db.cart.filter(item => item.userId === req.params.userId);

            res.json(cart || {});
        }catch (err){
            console.log(`Failed to get the cart list: ${cart}`, err);
            res.status(500).json({error: err.message})
        }
    },
    async getFavorites (req, res) {
        try{
            const db = dbService.readDB()
            const favorite = db.favorites.filter(item => item.userId === req.params.userId);

            res.json(favorite || {});
        }catch (err){
            console.log(`Failed to get the favorite list: ${favorite}`, err);
            res.status(500).json({error: err.message})
        }
    },
    async getOrders (req, res) {
        try{
            const db = dbService.readDB()
            const orders = db.orders.filter(item => item.userId === req.params.userId);

            res.json(orders || {});
        }catch (err){
            console.error(`Failed to get the current orders:`, err);
            res.status(500).json({error: err.message})
        }
    },
    async getFilteredOrders (req, res) {
        try{
            const db = dbService.readDB()
            const orders = db.orders.filter(item => item.userId === req.params.userId && item.status !== 'Delivered');

            res.json(orders || {});
        }catch (err){
            console.error(`Failed to get the all orders:`, err);
            res.status(500).json({error: err.message})
        }
    }
}
