const mongodb = require('../query/mongodb');

module.exports.Controller = async (req, res) => {
    const result = await mongodb.people(req.cookies.rt);
    res.status(200).json(result);
}