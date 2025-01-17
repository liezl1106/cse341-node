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
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res, next) => {
  const contactsId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({_id: contactsId});
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContacts = async (req, res, next) => {
  const contacts = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contacts);
  if (response.acknowledge > 0) {
    res.status(200).json(send);
  } else {
    res.status(404).json(response.error || 'Some error occured while uploading the contacts.');
  }
};

const updateContacts = async (req, res, next) => {
  const contactsId = new ObjectId(req.params.id);
  const contacts = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({_id: contactsId}, contacts);
  if (response.modifiedCount > 0) {
    res.status(200).json(send);
  } else {
    res.status(404).json(response.error || 'Some error occured while uploading the contacts.');
  }
};

const deleteContacts = async (req, res, next) => {
  const contactsId = new ObjectId(req.params.id);
  const contacts = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({_id: contactsId});
  if (response.deleteCount > 0) {
    res.status(200).json(send);
  } else {
    res.status(404).json(response.error || 'Some error occured while uploading the contacts.');
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