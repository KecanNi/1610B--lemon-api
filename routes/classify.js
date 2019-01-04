var express = require('express');
var router = express.Router();
var mongo = require('../mongo');


// icon图标
router.get('/api/iconlist', function (req, res, next) {
  mongo.connect('iconlist', function (err, con, colle) {
    if (err) {
      res.json({ code: 0, msg: err })
    } else {
      colle.find().toArray(function (error, results) {
        if (error) {
          res.json({ code: 0, msg: error })
        } else {
          res.json({ code: 1, data: results })
        }
        con.close();
      })
    }
  })
});
//分类
router.get('/api/classify', function (req, res, next) {
  var uid = req.query.uid;
  mongo.connect('classify', function (err, con, colle) {
    if (err) {
      res.json({ code: 0, msg: err })
    } else {
      colle.find({ $or: [{ uid: '*' }, { uid: uid }] }).toArray(function (error, results) {
        if (error) {
          res.json({ code: 0, msg: error })
        } else {
          res.json({ code: 1, data: results })
        }
        con.close()
      })
    }
  })
})
module.exports = router;
