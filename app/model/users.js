
const sql = require("./db.js")

const Users = function(users){
    this.username = users.username;
    this.password = users.password;
    this.email = users.email;
    this.name = users.name;
    this.gender = users.gender;
    this.bio = users.bio;
    this.profile_picture = users.profile_picture   
}

Users.findEmailExist = (email,result) =>{
  sql.query(`SELECT * FROM users WHERE email = ?`,[email],(err,res)=>{
    result(null,res[0])
    return;
  })
}

Users.addUser = (userData,result) =>{
  sql.query(`INSERT INTO users SET ?`,[userData],(err,res)=>{
    // console.log(err); return false
    result(null,res.insertId)
    return;
  })
}

Users.findUserInfo = (user_id,result) =>{
  sql.query(`SELECT * FROM users WHERE id = ?`,[user_id],(err,res)=>{
    result(null,res[0])
    return;
  })
}

Users.loginUser = (email,password,result) =>{
  sql.query(`SELECT id,username,password,email,name,gender,bio,profile_picture FROM users WHERE email = ? AND password = ?`,[email,password],(err,res)=>{
    // console.log(res); return false
     result(null,res[0])
     return;
  }) 
}

Users.getUserDetail = (user_id,myid,result) =>{
  // console.log(user_id,myid);
    sql.query(`SELECT id,username,password,email,name,gender,bio,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture,created_at,(if((SELECT COUNT(id) FROM follows WHERE followedUserId = ${user_id} AND followerUserId = ${myid})>0,1,0)) as follow_detail FROM users WHERE id = ${user_id}`,(err,res)=>{
      // console.log(res); return false
        result(null,res[0])
        return;
    })
}

Users.updateProfile = (user_id,email,name,bio,profile_picture,result) =>{
   sql.query(`UPDATE users SET email = ?,name = ?,bio = ?,profile_picture = ? WHERE id = ?`,[email,name,bio,profile_picture,user_id],(err,res)=>{
    // console.log(res); return false 
    result(null,user_id)
     return;
   })
}

Users.findPasswordUses = (password,user_id,result) =>{
 sql.query(`SELECT * FROM users WHERE password = ? AND id = ?`,[password,user_id],(err,res)=>{
  // console.log(err); return false
    result(null,res[0]);
    return;
 })
}

Users.updatePassword = (password,user_id,result) =>{
    sql.query(`UPDATE users SET password = ? WHERE id = ?`,[password,user_id],(err,res)=>{
        result(null,user_id);
        return;
    })
}

Users.deleteUser = (user_id,result) =>{
   sql.query(`DELETE FROM users WHERE id = ?`,[user_id],(err,res)=>{
    result(null,res)
    return;
   })
}

Users.forgetPassword = (email,password,result) =>{
   sql.query(`UPDATE users SET password = ? WHERE email = ?`,[password,email],(err,res)=>{
    result(null,email)
    return;
   })
}

Users.existPrivatepublic = (user_id,result) =>{
   sql.query("SELECT * FROM users WHERE id = ?",[user_id],(err,res)=>{
    result(null,res[0])
    return;
   })
}

Users.UpdateAccount = (user_id,account,result) =>{
   sql.query("UPDATE users SET is_private = ? WHERE id = ?",[account,user_id],(err,res)=>{
    // console.log(err); return false
      result(null,user_id)
   })
}



Users.getUserList = (search_text,myid,result) =>{
  var strCon="";
 


  if(search_text !='')
  {
    strCon +=" AND u.username LIKE '%"+search_text+"%'";
  }
  {
    strCon += `AND u.id != ${myid}`
  }
 
  

  sql.query(`SELECT  u.id,u.username,(if((SELECT COUNT(f.id) FROM follows as f WHERE f.followedUserId = u.id AND  f.followerUserId = ${myid})>0,1,0)) as follow_detail,CONCAT('`+nodeSiteUrl+`','/file/profile_pic/',profile_picture) as profile_picture FROM users as u WHERE 1=1 `+strCon+``,(err,res)=>{
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





module.exports = Users