"use strict";

const db = require('../models/index');

module.exports = 
{
    read: async(req, res, next)=>{
        try {
            const result = await db.Task.findAll();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    create: async(req, res, next)=>{
        try {
            const result = await db.Task.create({
                name: req.body.name, 
                done: false
            });
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    update: async(req, res, next)=>{
        try {
            const result = await db.Task.update({
                name: req.body.name,
                done: req.body.done
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    delete: async(req, res, next)=>{
        try {
            const result = await db.Task.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.send({
                result
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
}