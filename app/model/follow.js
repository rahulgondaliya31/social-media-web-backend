const sql = require("./db.js")

const Follow = function(folow){
    this.followerUserId = folow.followerUserId;
    this.followedUserId = folow.followedUserId;

}


Follow.isFollowExist = (follower_id, followed_id, result) => {
    sql.query(`SELECT id FROM follows WHERE followerUserId = ${follower_id} AND followedUserId= ${followed_id}`, (err, res) => {
        // console.log(err);return false;
        result(null, res[0]);
        return;
    });
}

Follow.addFollow = (followData,result) =>{
   sql.query("INSERT INTO follows SET ?",[followData],(err,res)=>{
    result(null,res.insertId)
    return;
   })
}

Follow.Unfollow = (id,result) =>{
   sql.query("DELETE FROM follows WHERE id =  ?",[id],(err,res)=>{
    result(null,res)
    return;
   })
}

Follow.getFollowCount = (followed_id,result) =>{

  var strlimit="";

  sql.query("SELECT followerUserId FROM follows WHERE followedUserId = ?"+strlimit,[followed_id],(err,res)=>{
    result(null,res)
  })
}

Follow.getFollow = (followed_id,sp,limit,result) =>{

  var strlimit = " LIMIT "+sp+","+limit+"";

  sql.query("SELECT followerUserId FROM follows WHERE followedUserId = ?"+strlimit,[followed_id],(err,res)=>{
    result(null,res)
  })
}



module.exports = Follow