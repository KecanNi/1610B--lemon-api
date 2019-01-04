var express = require('express');
var router = express.Router();

var mongo = require('../mongo');

/* GET users listing. */
router.get('/api/adduser', function (req, res, next) {
  var name = req.query.name || '';
  mongo.connect('userlist', function (err, con, colle) {
    if (err) {
      res.json({ code: 0, msg: err })
    } else {
      colle.insert({ name: name }, function (error, results) {
        if (error) {
          res.json({ code: 0, msg: error })
        } else {
          res.json({ code: 1, data: results.insertedIds })
        }
        con.close();
      })
    }
  })
});

module.exports = router;
