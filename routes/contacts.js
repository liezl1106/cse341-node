const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll); // GET all contacts
router.get('/:id', contactsController.getSingle); // GET a single contact
router.post('/', contactsController.createContacts); // POST a new contact
router.put('/:id', contactsController.updateContacts); // PUT (update) a contact
router.delete('/:id', contactsController.deleteContacts); // DELETE a contact

module.exports = router;