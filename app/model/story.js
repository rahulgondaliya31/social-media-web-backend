const sql = require("./db.js")

const Stories = function(story){
    this.user_id = story.user_id;
    this.video = story.video;
   
}

Stories.addStory = (storyData,result) =>{
    sql.query("INSERT INTO stories SET ?",[storyData],(err,res)=>{
        // console.log(err); return false
        result(null,res.insertId)
    })
}

Stories.deleteStory = (story_id,user_id,result) =>{
    sql.query("DELETE FROM stories WHERE id = ? AND user_id = ?",[story_id,user_id],(err,res)=>{
       result(null,res)
    })
}

Stories.getStoryCount = (follower_id,result) =>{

    var strlimit = "";
  
    sql.query(`SELECT s.user_id,CONCAT('`+nodeSiteUrl+`','/file/story/',s.video) as video,s.created_at,u.username,u.profile_picture FROM stories as s LEFT JOIN users as u ON s.user_id = u.id LEFT JOIN follows as w ON s.user_id = w.followedUserId WHERE w.followerUserId = ?`+strlimit,[follower_id],(err,res)=>{
        // console.log(err); return false
        result(null,res)
    })
}

Stories.getStory = (follower_id,sp,limit,result) =>{

    var strlimit = " LIMIT "+sp+","+limit+"";
  
    sql.query(`SELECT s.user_id,CONCAT('`+nodeSiteUrl+`','/file/story/',s.video) as video,s.created_at,u.username,u.profile_picture FROM stories as s LEFT JOIN users as u ON s.user_id = u.id LEFT JOIN follows as w ON s.user_id = w.followedUserId WHERE w.followerUserId = ?`+strlimit,[follower_id],(err,res)=>{
        // console.log(err); return false
        result(null,res)
    })
}

module.exports = Stories