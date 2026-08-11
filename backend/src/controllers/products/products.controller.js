import { supabase } from '#lib/supbase.js';
import {query} from "express-validator"; // Укажи правильный путь к своему файлу supbase.js

export const productsController = {
    async getAllProducts(req, res) {
        try {
            const { data: products, error } = await supabase
                .from('products')
                .select('*');

            if (error) throw error;

            res.json(products || []);
        } catch (err) {
            console.error('Failed to get the product list:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getFilteredProducts(req, res) {
        try {
            const { type, filter } = req.params;
            let query = supabase
                .from('products')
                .select('*');

            if (type && type !== "ALL") {
                if (type === "CATEGORY") {
                    query = query.eq('category', filter);
                } else if (type === "SIZE") {
                    query = query.contains('size', [filter]);
                } else if (type === "COLOR") {
                    query = query.contains('color', [filter]);
                } else if (type === "STATUS") {
                    query = query.eq('status', filter);
                } else if (type === "GENDER") {
                    query = query.eq('gender', filter);
                }
            }

            const { data: products, error } = await query;
            if (error) throw error;

            res.json(products || []);
        } catch (err) {
            console.error('Failed to get the filtered product list:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getWeekProducts (req, res) {
        try{
            const sevenDayAgo = new Date();
            sevenDayAgo.setDate(sevenDayAgo.getDate() - 7);
            const dateISO = sevenDayAgo.toISOString();

            const { data: products, error } = await supabase
                .from('products')
                .select('*')
                .gte('dateCreatedProduct', dateISO)
                .order('dateCreatedProduct', { ascending: false });

            if (error) throw error;

            res.json(products || []);
        }catch(err){
            console.error('Failed to get the week product list:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getYearProducts (req, res) {
        try{
            const { type, filter } = req.params;

            const last365Days = new Date();
            last365Days.setDate(last365Days.getDate() - 365);
            const lastDate = last365Days.toISOString()

            let query = supabase
                .from('products')
                .select('*')
                .gte('dateCreatedProduct', lastDate)
                .order('dateCreatedProduct', { ascending: false });


            if(type && type !== "ALL"){
                if(type === "GENDER"){
                    query = query.eq('gender', filter);
                }
            }

            const { data: products, error } = await query;
            if (error) throw error;

            res.json(products || []);
        }catch(err){
            console.error('Failed to get the year product list:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getSearchedProducts(req, res) {
        try {
            const search = req.query.search?.trim();

            if (!search) {
                const { data: products, error } = await supabase.from('products').select('*');
                if (error) throw error;
                return res.json(products || []);
            }

            const { data: products, error } = await supabase
                .from('products')
                .select('*')
                .or(
                    `title.ilike.%${search}%,` +
                    `category.ilike.%${search}%,` +
                    `material.ilike.%${search}%,` +
                    `description.ilike.%${search}%,` +
                    `gender.ilike.%${search}%`
                );

            if (error) throw error;

            res.json(products || []);
        } catch (err) {
            console.error('Failed to get the searched product list:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getMyStackProducts(req, res) {
        try {
            const { userId } = req.params;

            const { data: stack, error } = await supabase
                .from('products')
                .select('*')
                .eq('userId', userId)
                .eq('status', 'Availability');

            if (error) throw error;

            res.json(stack || []);
        } catch (err) {
            console.error(`Failed to get my stack products:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async getMyOutOfStackProducts(req, res) {
        try {
            const { userId } = req.params;

            const { data: outOfStack, error } = await supabase
                .from('products')
                .select('*')
                .eq('userId', userId)
                .eq('status', 'Exhausted');

            if (error) throw error;

            res.json(outOfStack || []);
        } catch (err) {
            console.error(`Failed to get my out of stack products:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async getProductsById(req, res) {
        try {
            const { id } = req.params;

            const { data: product, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .maybeSingle();

            if (error) throw error;

            res.json(product || {});
        } catch (err) {
            console.error(`Failed to get the product by id ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async createdProduct(req, res) {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'Product photos are mandatory.' });
            }

            const images = req.files.map(file => `uploads/products/${file.filename}`);

            const newProduct = {
                userId: req.user.id,
                images,
                ...req.body,
                quantity: Number(req.body.quantity) || 0,
                price: Number(req.body.price) || 0,
                dateCreatedProduct: new Date(),
                favorite: false,
                checked: false
            };

            const { data: createdProduct, error } = await supabase
                .from('products')
                .insert([newProduct])
                .select()
                .single();

            if (error) throw error;

            res.status(201).json(createdProduct);
        } catch (err) {
            console.error('Failed to create the product cover:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async updateProductItem(req, res) {
        try {
            const { id } = req.params;

            const { data: updatedProduct, error } = await supabase
                .from('products')
                .update(req.body)
                .eq('id', id)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

            return res.json(updatedProduct);
        } catch (err) {
            console.error(`Failed to update the product ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;

            const { data: deletedProduct, error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

            res.json(deletedProduct);
        } catch (err) {
            console.error(`Failed to delete the product ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    }
};