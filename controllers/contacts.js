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

module.exports = { 
  //getData,
  getAll,
  getSingle 
};