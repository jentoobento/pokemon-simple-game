const mongodb = require('../mongodb');
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
}

function readAll(req, res) {
    conn.db().collection('pokemon')
        .find()
        .map(result => {
            result._id = result._id.toString()
            return result
        })
        .toArray()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
}

function readById(req, res) {
    conn.db().collection('pokemon')
        .find({ "_id": ObjectId(req.params.id) })
        .next()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
}

function create(req, res) {
    conn.db().collection('pokemon')
        .insertOne(req.body)
        .then(result => {
            res.status(200).send(result.insertedId.toString());
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
}

function update(req, res) {
    conn.db().collection('pokemon')
        .update({ "_id": ObjectId(req.params.id) }, {$set: req.body})
        .then(() => {
            res.status(200).send('success')
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error)
        })
}

function _delete(req, res) {
    conn.db().collection('pokemon')
        .deleteOne({ "_id": ObjectId(req.params.id) })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
}