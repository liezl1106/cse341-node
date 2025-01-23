const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { validateContact, validateId } = require('../helpers/validate');
const validate = require('../middleware/validate');

router.get('/', contactsController.getAll); // GET all contacts
router.get('/:id', validateId, validate, contactsController.getSingle); // GET a single contact
router.post('/', validateContact, validate, contactsController.createContacts); // POST a new contact
router.put('/:id', [...validateId, ...validateContact], validate, contactsController.updateContacts); // PUT (update) a contact
router.delete('/:id', validateId, validate, contactsController.deleteContacts); // DELETE a contact

module.exports = router;