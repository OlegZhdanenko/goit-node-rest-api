import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js"


export const getAllContacts = async (req, res, next) => {
    
    console.log("req.user",req.user);
    try {
        const contact = await Contact.find({ownerId:req.user._id})
        res.json(contact)
    } catch (error) {
        next(error)
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const id = req.params()
        const contact = await Contact.findOne({_id:id,ownerId:req.user.id})
        
        if (!contact) {
            throw HttpError(404);
        }
        res.status(200).json(contact)
    } catch (error) {
        next(HttpError(500));
    }
};

export const deleteContact = async (req, res) => {
    try {
        const id = req.params()
        const contact = await Contact.findByIdAndDelete({ owner: req.user._id, _id: id })
        if (contact===null) {
            throw HttpError(404);
        } res.status(200).json(contact)
    } catch (error) {
        next(HttpError(500));
    }
};

export const createContact = async (req, res, next) => {
    const contact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favorite: false,
        owner:req.user._id
    }
    try {
        const result = await Contact.create(contact);
        res.status(201).json(result);
    } catch (error) {
        next(HttpError(500))
    }
    
};
export const updateContact = async (req, res) => {
    const contact = {
        ...req.body,
        favorite: false,
    };
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate({ owner: req.user._id, _id: id },contact)
        res.status(200).json(result);
        if (!result) {
            throw HttpError(400);
        }
        res.json(result);
    } catch (error) {
        next(HttpError(500));  
    }
};
export const updateStatusContact = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const contact = await Contact.findOneAndUpdate({ owner: req.user._id, _id: id }, body)
        res.status(200).json(contact)
        if (!contact) {
            throw HttpError(404);
        }
    } catch (error) {
        next(HttpError(500));
    }
};