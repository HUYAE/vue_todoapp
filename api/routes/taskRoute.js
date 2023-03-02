"use strict";

const router = require('express').Router();

const taskController = require('../controllers/taskController');

// REST API routing     / --> /task
router.get('/', taskController.read);           // http://localhost:3000/task
router.post('/', taskController.create);        // http://localhost:3000/task
router.put('/:id', taskController.update);      // http://localhost:3000/task/id
router.delete('/:id', taskController.delete);   // http://localhost:3000/task/id

module.exports = router;