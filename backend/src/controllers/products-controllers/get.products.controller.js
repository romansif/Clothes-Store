import { dbService } from "../../config/db.service.js";

export const getProductsController = {
    async getAllProducts(req, res) {
        try{
            const db = dbService.readDB()
            const products = db.products;

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            res.json(products);
        }catch(err){
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

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            res.json(products || []);
        }catch(err){
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
            res.status(500).json({error: err.message})
        }
    },
    async getMyProducts (req, res) {
        try{
            const db = dbService.readDB();
            const product = db.products.filter(p => p.userId === req.params.userId)
            res.json(product || []);
        }catch (err){
            res.status(500).json({error: err.message})
        }
    },
    async getProductsById (req, res) {
        try{
            const db = dbService.readDB();
            const product = db.products.find(p => p.id === req.params.id)

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            res.json(product || {});
        }catch (err){
            res.status(500).json({error: err.message})
        }
    },
    async getCart (req, res){
        try{
            const db = dbService.readDB()
            const cart = db.cart.filter(item => item.userId === req.params.userId);

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            res.json(cart || {});
        }catch (err){
            console.error(`Не удалось получить данные по корзине: ${cart}`, err);
            res.status(500).json({error: err.message})
        }
    },
    async getFavorites (req, res) {
        try{
            const db = dbService.readDB()
            const favorite = db.favorites.filter(item => item.userId === req.params.userId);

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            res.json(favorite || {});
        }catch (err){
            console.error(`Не удалось получить данные по избранному: ${favorite}`, err);
            res.status(500).json({error: err.message})
        }
    },
    async getOrders (req, res) {
        try{
            const db = dbService.readDB()
            const orders = db.orders.filter(item => item.userId === req.params.userId);

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            res.json(orders || {});
        }catch (err){
            console.error(`Не удалось получить данные по сем заказам: ${orders}`, err);
            res.status(500).json({error: err.message})
        }
    },
    async getFilteredOrders (req, res) {
        try{
            const db = dbService.readDB()
            const orders = db.orders.filter(item => item.userId === req.params.userId && item.status !== 'Delivered');

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            res.json(orders || {});
        }catch (err){
            console.error(`Не удалось получить данные по сем заказам: ${orders}`, err);
            res.status(500).json({error: err.message})
        }
    }
}
