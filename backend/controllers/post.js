const Post = require("../model/post");

exports.addPosts = 
  (req,res,next)=>{
     
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userid
    });
   post.save().then(createdPost=>{
         res.status(201).json({
            message: "Post Added successfully",
            post: {
              ...createdPost,
              id: createdPost._id
              
            }
         });
      });
   
   
}

exports.getAllPosts = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery
      .then(documents => {
        fetchedPosts = documents;
        return Post.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: fetchedPosts,
          maxPosts: count
        });
      });
}


exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    });
}

exports.deletePostById = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id ,
      creator: req.userData.userid}).then(result => {
        if(result.deletedCount  > 0){
          res.status(200).json({
            message: "Posts updated succesfully! "
         });
        }
        else {
          res.status(401).json({
            message: "Not Authorized! "
         });
        }
      });
}

exports.updatePost = 
(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
     _id: req.body.id,
     title: req.body.title,
  content: req.body.content,
  imagePath: imagePath,
  creator: req.userData.userId
  });
  Post.updateOne({_id: req.params.id,
    creator: req.userData.userid
  },post).then(postData =>{
   // console.log("testing:= @93 ", postData);
  //  if(postData.modifiedCount   > 0){ //matchedCount:
      res.status(200).json({
        message: "Posts updated succesfully! "
     });
  //  }
   /*if(postData.modifiedCount   = 0 &&
       postData.matchedCount == 0){
      console.log(postData);
      res.status(401).json({
        message: "Not Authorized! "
     });
    }
    if(
      postData.modifiedCount   = 0){ //matchedCount:
      res.status(200).json({
        message: "Posts updated succesfully! "
     });
    }*/
    
  });
  
}
