const router = require('express').Router();
const { where } = require('sequelize/types');
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create(req.res)({  // CHECK REQ.res CORRECT!!!
      // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD
    where:{...body},
      // TODO: SET USERID TO LOGGEDIN USERID
      loginId: req.session.userId,
    })
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
      id: req.session.id,
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.destroy(req.body, {  // check if await and req.body correct
      // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
      id: req.session.id,
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;