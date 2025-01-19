const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const getData = async (req, res, next) => {
//   const result = await mongodb.getDb().db().collection('contacts').find();
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists[0]); // we just need the first one (the only one)
//     //res.status(200).json(lists); // all list
//   });
// };

const getAll = async (req, res, next) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDb().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Contacts']
  const contactsId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().collection('contacts').find({ _id: contactsId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContacts = async (req, res, next) => {
  //#swagger.tags=['Contacts']
  const contacts = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().collection('contacts').insertOne(contacts);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContacts = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contactsId = new ObjectId(req.params.id); // Get the contact ID
    const contacts = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb.getDb().collection('contacts').replaceOne(
      { _id: contactsId }, // Find the contact by ID
      contacts // Replace with the new data
    );

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Contact updated successfully', response });
    } else {
      res.status(404).json({ message: 'No contact found with the provided ID', response });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred while updating the contact.' });
  }
};

const deleteContacts = async (req, res, next) => {
  //#swagger.tags=['Contacts']
  const contactsId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactsId });
  if (response.deletedCount > 0) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { 
  //getData,
  getAll,
  getSingle,
  createContacts,
  updateContacts,
  deleteContacts
};