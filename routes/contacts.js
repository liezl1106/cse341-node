const express = require('express');
const contactsController = require('../controllers/contacts');
const router = express.Router();

// GET /feed/posts
// router.get('/', contactsController.getData); this is sample

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/:id', contactsController.createContacts);

router.put('/:id', contactsController.updateContacts);

router.delete('/:id', contactsController.deleteContacts);

// localhost:3000/contacts/
module.exports = router;