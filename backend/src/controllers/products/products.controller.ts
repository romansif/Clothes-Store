import { supabase } from '#lib/supabase.js';
import { type Request, type Response } from 'express';
import { type AuthenticatedRequest } from '../../interfaces.ts';

export const productsController = {
    async getAllProducts(_req: Request, res: Response) {
        try {
            const { data: products, error } = await supabase
                .from('products')
                .select('*');

            if (error) throw error;

            res.json(products || []);
        } catch (err) {
            console.error('Failed to get the product list:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getFilteredProducts(req: Request, res: Response) {
        try {
            const { type, filter } = req.params;
            let query = supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (type && type !== "ALL") {
                if (type === "CATEGORY") {
                    query = query.eq('category', filter);
                } else if (type === "SIZE") {
                    query = query.contains('sizes', JSON.stringify([filter]));
                } else if (type === "COLOR") {
                    query = query.contains('colors', JSON.stringify([{ colorName: filter }]));
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getWeekProducts (_req: Request, res: Response) {
        try{
            const sevenDayAgo = new Date();
            sevenDayAgo.setDate(sevenDayAgo.getDate() - 7);
            const dateISO = sevenDayAgo.toISOString();

            const { data: products, error } = await supabase
                .from('products')
                .select('*')
                .gte('created_at', dateISO)
                .order('created_at', { ascending: false });

            if (error) throw error;

            res.json(products || []);
        }catch(err){
            console.error('Failed to get the week product list:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getYearProducts (req: Request, res: Response) {
        try{
            const { type, filter } = req.params;

            const last365Days = new Date();
            last365Days.setDate(last365Days.getDate() - 365);
            const lastDate = last365Days.toISOString()

            let query = supabase
                .from('products')
                .select('*')
                .gte('created_at', lastDate)
                .order('created_at', { ascending: false });


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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getSearchedProducts(req: Request, res: Response) {
        try {
            const search = String(req.query.search || '').trim();

            if (!search) {
                const { data: products, error } = await supabase.from('products').select('*');
                if (error) throw error;
                return res.json(products || []);
            }

            const { data: products, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getMyProducts(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const { data: myProducts, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('userId', userId)

            if (error) throw error;

            res.json(myProducts || []);
        } catch (err) {
            console.error(`Failed to get my stack products:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getProductsById(req: Request, res: Response) {
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async createdProduct(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'Product photos are mandatory.' });
            }

            const files = req.files as Express.Multer.File[]

            const images = files.map((file: any) => `uploads/products/${file.filename}`);

            const newProduct = {
                userId: req.user?.id,
                images,
                ...req.body,
                quantity: Number(req.body.quantity) || 0,
                price: Number(req.body.price) || 0,
                created_at: new Date(),
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async updateProductItem(req: Request, res: Response) {
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async deleteProduct(req: Request, res: Response) {
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    }
};