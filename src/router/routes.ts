import express from "express";
import Item from "../models/item";
import itemsRepository from "../repositories/items-repository";

const itemsRouter = express.Router();

itemsRouter.post('/items', (req, res) => {
    const item: Item = req.body;
    itemsRepository.create(item, (id) => {
        if (id) {
            res.status(201).location(`/items/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
});

itemsRouter.get('/items', (req, res) => {
    itemsRepository.readAll((items) => res.json(items));
});

itemsRouter.get('/items/:id', (req, res) => {
    const id: number = +req.params.id
    itemsRepository.read(id, (item) => item ? res.json(item) : res.status(404).send());
});

itemsRouter.put('/items/:id', (req, res) => {
    const id: number = +req.params.id
    itemsRepository.update(id, req.body, (notFound) => notFound ? res.status(404).send() : res.status(204).send());
});

itemsRouter.delete('/items/:id', (req, res) => {
    const id: number = +req.params.id
    itemsRepository.delete(id, (notFound) => notFound ? res.status(404).send() : res.status(204).send());
});

export default itemsRouter;