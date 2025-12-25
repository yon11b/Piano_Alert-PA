const express = require('express');
const router = express.Router();
const cors = require('cors');

const options={
  origin: ["127.0.0.1"],
  credentials: true,
  optionSuccessStatus: 200
};

// router.use((req, res, next) => {
//     res.locals.user = req.user;
//     req.session;
//     next();
// });

router.use(cors(options));
// router.get("/", (req, res) => res.redirect("/rest/main"));
router.use('/rest', require('./rest'));

module.exports = router;