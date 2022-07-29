const express= require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const postController = require('../controllers/post');


router.post("",checkAuth,extractFile,postController.addPosts);
router.get("",postController.getAllPosts);
router.get("/:id",postController.getPostById );
router.delete("/:id",checkAuth, postController.deletePostById);
router.put("/:id",checkAuth,extractFile,postController.updatePost); 
 
module.exports = router;