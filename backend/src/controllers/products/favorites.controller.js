import { v4 as uuidv4 } from "uuid";
import { dbService } from "#config/db.service.js";

export const favoritesController = {
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

    async addToFavorite (req, res) {
        try{
            const db = dbService.readDB()
            const newFavoriteItem = {id:uuidv4(), userId: req.user.id, productId: req.body.productId, ...req.body}

            db.favorites.push(newFavoriteItem)
            dbService.writeDB(db);
            res.status(201).json({message: 'Product added to favorite'})
        }catch(err){
            console.log(`Failed to add the product to the favorite: ${newFavoriteItem}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async updateFavoriteItems (req, res) {
        try{
            const db = dbService.readDB()

            const index = db.favorites.findIndex(f => f.id === req.params.id || f.productId === req.params.id)
            if (index !== -1) db.favorites[index] = { ...db.favorites[index], ...req.body };

            dbService.writeDB(db);
            res.json(db.favorites[index] || []);
        }catch(err){
            console.log(`Failed to update the favorite item: ${index}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async deleteFavorite (req, res) {
        try{
            const db = dbService.readDB();

            const index = db.favorites.findIndex(f => f.productId === req.params.id);
            if (index === -1) return res.status(404).json({ message: "Favorite Product not found" });
            const [deletedProduct] = db.favorites.splice(index, 1);

            dbService.writeDB(db);
            res.json(deletedProduct);
        }catch(err){
            console.log(`Failed to delete the product at favorite: ${index}`, err)
            res.status(500).json({error: err.message})
        }
    }
}
