import { v4 as uuidv4 } from 'uuid';
import { dbService } from "../../config/db.service.js";

export const productsAddController = {
    async createdProduct (req, res) {
        try{
            const db = dbService.readDB()

            if(!req.files){
                res.status(400).json('Текстовые поля:', req.body);
                res.status(400).json('Файлы от Multer:', req.files);
                return res.status(400).json({ message: 'Product photos are mandatory.'})
            }

            const images = req.files.map(file => `uploads/products/${file.filename}`);
            const newProduct = {id: uuidv4(), userId: req.user.id, images, ...req.body, quantity: Number(req.body.quantity), price: Number(req.body.price), favorite: false, checked: false}

            db.products.push(newProduct)
            dbService.writeDB(db)
            res.status(201).json(newProduct);
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async addToCart (req, res) {
        try{
            const db = dbService.readDB()

            const product = db.products.find(p => p.id === req.body.productId)
            if(!product) return res.status(400).json({message: 'Product not found'})
            const newCartItem = {id:uuidv4(), userId: req.user.id, ...req.body}

            db.cart.push(newCartItem)
            dbService.writeDB(db);
            res.status(201).json({message: 'Product added to cart'})
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async addToFavorite (req, res) {
        try{
            const db = dbService.readDB()
            const newFavoriteItem = {id:uuidv4(), userId: req.user.id, productId: req.body.productId, ...req.body}

            db.favorites.push(newFavoriteItem)
            dbService.writeDB(db);
            res.status(201).json({message: 'Product added to favorite'})
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async addOrder (req, res) {
        try{
            const db = dbService.readDB()
            const newOrderItems = {id:uuidv4(), userId: req.user.id, ...req.body}

            db.orders.push(newOrderItems)
            dbService.writeDB(db);
            res.status(201).json({message: 'Product added to orderItems'})
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }
}