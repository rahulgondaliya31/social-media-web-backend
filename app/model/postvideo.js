const sql = require("./db.js");

const Posts = function(post){
    this.id = post.id
    this.user_id = post.user_id
    this.video = post.video 
    this.description = post.description
   
}
 
Posts.addPost = (postData,result) =>{
    sql.query("INSERT INTO posts SET ?",[postData],(err,res)=>{
        // console.log(err); return false
        result(null,res.insertId);
        return;
    })
}

Posts.getPostsCount = (user_id,id,result) =>{

    var strlimit = ""

    sql.query(`SELECT COUNT(l.id) as likes,p.id,p.user_id,CONCAT('`+nodeSiteUrl+`','/file/post/',video) as video,p.description,p.created_at,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture,if((SELECT COUNT(id) FROM likes WHERE posts_id = p.id AND user_id = ${user_id})>0,1,0) as is_favourite FROM posts as p LEFT JOIN users as u ON u.id = p.user_id LEFT JOIN likes as l ON l.posts_id = p.id WHERE p.user_id = ? GROUP BY p.id `+strlimit,[id],(err,res)=>{ 
    // console.log(res); return false
     result(null,res);   
     return;
    })
 }

Posts.getPosts = (user_id,id,sp,limit,result) =>{

    var strlimit = "LIMIT "+sp+","+limit+"";

   sql.query(`SELECT COUNT(l.id) as likes,p.id,p.user_id,CONCAT('`+nodeSiteUrl+`','/file/post/',video) as video,p.description,p.created_at,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture,if((SELECT COUNT(id) FROM likes WHERE posts_id = p.id AND user_id = ${user_id})>0,1,0) as is_favourite FROM posts as p LEFT JOIN users as u ON u.id = p.user_id LEFT JOIN likes as l ON l.posts_id = p.id WHERE p.user_id = ? GROUP BY p.id   `+strlimit,[id],(err,res)=>{
    // console.log(err); return false
    if(res == undefined)
        {
           result(null, []);
          return;  
        }
        else
        {
           result(null, res);
          return;  
        }
   })
}

Posts.deletePost = (post_id,result) =>{
    sql.query(`DELETE FROM posts WHERE id = ?`,[post_id],(err,res)=>{
        result(null,res)
    })
}
// Posts.getCountPost = (user_id,post_id,result) =>{


//     sql.query(`SELECT COUNT(l.id) as likes,p.id,p.user_id,CONCAT('`+nodeSiteUrl+`','/file/post/',video) as video,p.description,p.created_at,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture,if((SELECT COUNT(id) FROM likes WHERE posts_id = p.id AND user_id = ${user_id})>0,1,0) as is_favourite FROM posts as p LEFT JOIN users as u ON u.id = p.user_id LEFT JOIN likes as l ON l.posts_id = p.id WHERE p.id = ?`[user_id,post_id],(err,res)=>{
//      // console.log(res); return false   
//         result(null,res[0])
//         return;
//     })
//  }

// Posts.getPost = (user_id,post_id,result) =>{


//    sql.query(`SELECT COUNT(l.id) as likes,p.id,p.user_id,CONCAT('`+nodeSiteUrl+`','/file/post/',video) as video,p.description,p.created_at,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture,if((SELECT COUNT(id) FROM likes WHERE posts_id = p.id AND user_id = ${user_id})>0,1,0) as is_favourite FROM posts as p LEFT JOIN users as u ON u.id = p.user_id LEFT JOIN likes as l ON l.posts_id = p.id WHERE p.id = ?`,[post_id],(err,res)=>{
//     // console.log(err); return false   
//        result(null, res[0]); 
//       return;   
//    })
// }
 
// Posts.postCount = (user_id,result) =>{

//     var strlimit = ""

//     sql.query(`SELECT COUNT(l.id) as likes,COUNT(c.id) as comments,p.id,p.user_id,CONCAT('`+nodeSiteUrl+`','/file/post/',video) as video,p.description,p.created_at,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture,if((SELECT COUNT(id) FROM likes WHERE posts_id = p.id AND user_id = ${user_id})>0,1,0) as is_favourite FROM posts as p LEFT JOIN users as u ON u.id = p.user_id LEFT JOIN follows as f ON p.id = f.followedUserId LEFT JOIN likes as l ON l.posts_id = p.id LEFT JOIN comments as c ON c.post_id = p.id  WHERE f.followerUserId = ? OR p.user_id = ? GROUP BY p.id ORDER BY p.id DESC`+strlimit,[user_id,user_id],(err,res)=>{
//         // console.log(err); return false
//       result(null,res)
//       return;  
//     })
//   }

Posts.postListing = (user_id,result) =>{

    sql.query(`SELECT COUNT(l.id) as likes,((SELECT COUNT(id) FROM comments WHERE post_id = p.id AND user_id=${user_id} )) as comments,p.id,p.user_id,CONCAT('`+nodeSiteUrl+`','/file/post/',video) as video,p.description,p.created_at,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture,if((SELECT COUNT(id) FROM likes WHERE posts_id = p.id AND user_id = ${user_id})>0,1,0) as is_favourite FROM posts as p LEFT JOIN users as u ON u.id = p.user_id LEFT JOIN follows as f ON p.id = f.followedUserId LEFT JOIN likes as l ON l.posts_id = p.id  WHERE f.followerUserId = ? OR p.user_id = ? GROUP BY p.id ORDER BY p.id DESC`,[user_id,user_id],(err,res)=>{
        // console.log(res); return false
        if(res == undefined)  
        {     
           result(null, []);
          return;    
        }
        else
        {
           result(null, res);
          return;  
        }
    })
  }

  // Posts.Userpost = (user_id,result) =>{

    

  //   sql.query(`SELECT COUNT(l.id) as likes,p.id,p.user_id,CONCAT('`+nodeSiteUrl+`','/file/post/',video) as video,p.description,p.created_at,u.username,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture,if((SELECT COUNT(id) FROM likes WHERE posts_id = p.id AND user_id = ${user_id})>0,1,0) as is_favourite FROM posts as p LEFT JOIN users as u ON u.id = p.user_id LEFT JOIN likes as l ON l.posts_id = p.id  WHERE p.user_id = ? GROUP BY p.created_at`+strlimit,[user_id],(err,res)=>{
  //       // console.log(res); return false
  //     result(null,res)
  //     return;  
  //   })
  // }



//   Stories.getStory = (follower_id,sp,limit,result) =>{

//     var strlimit = " LIMIT "+sp+","+limit+"";
  
//     sql.query(`SELECT s.user_id,CONCAT('`+nodeSiteUrl+`','/file/story/',s.video) as video,s.created_at,u.username,u.profile_picture FROM stories as s LEFT JOIN users as u ON s.user_id = u.id LEFT JOIN follows as w ON s.user_id = w.followedUserId WHERE w.followerUserId = ?`+strlimit,[follower_id],(err,res)=>{
//         // console.log(err); return false
//         result(null,res)
//     })
// }





module.exports = Posts
