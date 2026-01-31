import { response } from "express";
import productModel from "../Model/productSchema.js";

/**
 * Function to post a lost/found item
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const postProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId) {
            return res.status(404).json("There is no userId");
        }

        const {title, description, category, image, location, type} = req.body;
        if(!title || !description || !location || !type) {
            return res.status(404).json("title, description, location and type are required");
        }

        // check is it lost or found
        if(type != 'lost' && type != "found") {
            return res.status(404).json("type should be either lost or found")
        }

        // save to database
        const savedItem = await productModel.create({
            title, description, category, image, location, type, owner: userId
        })
        
        res.status(201).json({message: "Product Added Successfully", details: savedItem})
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Something Went Wrong");
    }
}



/**
 * Function to get list of all posts
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const allPosts = async (req, res) => {
    try {
        const allPosts = await productModel.find();

        if(allPosts.length < 1) {
            return res.status(200).json([]);
        }
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Something Went Wrong");
    }
}



/**
 * Function to get details of specific product
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const productDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await productModel.findById(id);
        if(!product) {
            return res.status(404).json("Product Not Found");
        }

        // show details
        res.status(200).json(product)
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Something Went Wrong");
    }
}



/**
 * Function to update Status
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        // find the product
        const product = await productModel.findById(id);

        // check is access to do it for user
        const userId = req.user.id;
        if(!userId) {
            return res.status(404).json("There is no userId");
        }
        if(product.owner.toString() !== userId) {
            return res.status(403).json("You have no access to update this item")
        }
        
        // check is status active or resolved
        if(status != 'active' && status != 'resolved') {
            return res.status(404).json("status should be either active or resolved")
        }
        const updatedProduct = await productModel.findByIdAndUpdate(id, {status}, 
            {new: true, runValidators: true});

        if(!updatedProduct) {
            return res.status(404).json("Product Not Found With Provided Id");
        }

        res.status(200).json({message: "Updated seccessfully", updatedProduct})
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Something Went Wrong")
    }
}



/**
 * Function to delete items
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await productModel.findById(id);

        // check access of user
        const userId = req.user.id;
        if(!userId) {
            return res.status(404).json("There is no userId Provided");
        }
        if(product.owner.toString() !== userId) {
            return res.status(404).json("You have no access to delete it")
        }

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if(!deletedProduct) {
            return res.status(404).json("There is no product with provided id");
        }

        res.status(200).json({message: "Deleted Successfully", deletedProduct});
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Something Went Wrong");
    }
}