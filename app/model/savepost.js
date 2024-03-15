const sql = require("./db.js");

const savePost = function(post){
   this.post_id = post.post_id;
   this.user_id = post.user_id;
    this.video = post.video ;
    this.description = post.description;  
    this.video = post.video;
    this.description = post.description;
    this.username = post.username;
    this.profile_picture = post.profile_picture;
    this.like = post.like;
    this.comment = post.comment;
}

savePost.selectPost = (post_id,result) =>{
    sql.query(`SELECT p.video,p.description,u.username,u.profile_picture,(SELECT COUNT(l.id) FROM likes as l LEFT JOIN posts as p ON p.id = l.posts_id WHERE posts_id = ${post_id} ) as likes,(SELECT COUNT(c.id) FROM comments as c LEFT JOIN posts as p ON p.id = c.post_id WHERE post_id = ${post_id}) as comments FROM posts as p LEFT JOIN users as u ON p.user_id = u.id WHERE p.id = ? `,[post_id],(err,res)=>{
      // console.log(res); return false
      result(null,res[0])
    })
  }
  
  savePost.savedPost = (savedData,result) =>{
    sql.query("INSERT INTO saved_posts SET ?",[savedData],(err,res)=>{
      // console.log(err); return false
      result(null,res.insertId)
    })
  }

  savePost.isFavoriteExist = (user_id, post_id, result) => {
    sql.query(`SELECT id FROM saved_posts WHERE post_id = ${post_id} AND user_id= ${user_id}`, (err, res) => {
        // console.log(err);return false;
        result(null, res[0]);
        return;
    });
}

savePost.remove = (id, result) => {
  sql.query("DELETE FROM saved_posts WHERE id = ?", [id], (err, res) => {
      result(null, res);
  });
};

savePost.getPostListingCount = (user_id,result) =>{

  var strlimit="";

  sql.query("SELECT post_id,user_id,video,description,`like`,comment,username,profile_picture FROM saved_posts WHERE user_id = ?"+strlimit,[user_id],(err,res)=>{
    // console.log(res); return false                                                  
    result(null,res)
  })
}

savePost.getPostListing = (user_id,sp,limit,result) =>{

  var strlimit = " LIMIT "+sp+","+limit+"";

  sql.query("SELECT post_id,user_id,video,description,`like`,comment,username,profile_picture FROM saved_posts WHERE user_id = ?"+strlimit,[user_id],(err,res)=>{
    // console.log(res); return false                                                  
    result(null,res)
  })
}

module.exports = savePost