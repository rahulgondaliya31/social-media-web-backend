const Likes = require("../model/like.js")


exports.addlike = async(req,res,next) =>{
  try
  {
    const {user_id,post_id} = req.body
    let errors = ""

    if(!user_id)
    {
        errors = "user_id is required"
    }
    else if(!post_id)
    {
        errors = "post_id is required"
    }
 
    if (errors.length > 0) {
        return res.send({
            success : "no",
            message: errors,
            data: []
        });
    }
 
    Likes.isFavoriteExist(user_id,post_id,(err,data)=>{
        if(data)
        {
            Likes.remove(data.id,(err,adata)=>{
                var like = {}
                like['is_like'] = 0
                return res.send({
                    success : "yes",
                    message : "unlike post successfully",
                    data : like
                })
            })
        }
        else
        {
            const likeData = new Likes({
                user_id : user_id,
                posts_id : post_id
            })

            Likes.addLike(likeData,(err,like)=>{
                var like = {}
                like['is_like'] = 1
                return res.send({
                    success : "yes",
                    message : "like add to post successfully",
                    data : like
                })
            })
        }
    })

  }
  catch(ex)
  {
    next(ex)
  }
}

exports.getlikes = async(req,res,next) =>{
   try
   {

    const {post_id,page} = req.body
    let errors = ""

    if(!post_id)
    {
        errors = "post id is required"
    }


    if (errors.length > 0) {
        return res.send({
            success : "no",
            message: errors,
            data: []
        });
    }

    var pages = page;

  var limit = '10';

  if(pages == '')
  {
     pages = 1;
     sp = 0;
  }
  else
  {
     pages = pages;
     sp = (pages-1)*limit;
  }

await Likes.getLikesCount(post_id,(err,data)=>{
   
    if(data.length > 0)
    {
        var getcount  = data.length;
        var totalpage = Math.ceil(getcount/limit);

    Likes.getLikes(post_id,(err,data1)=>{
        return res.send({
            success : "yes",
            message : "all likes is here",
            data : data1,
            total_page: totalpage,
            page: pages
        })
    })
    }
    else
    {
        return res.send({
            success : "no",
            message : "something happend wrong",
            data : []
        })
    }
})

   }
   catch(ex)
   {
     next(ex)
   }
}

exports.get_like_post = async(req,res,next) =>{
    try
    {
       const {user_id,page} = req.body
       let errors = ""

       if(!user_id)
       {
         errors = "user_id is required"
       }
       
       if (errors.length > 0) {
        return res.send({
            success : "no",
            message: errors,
            data: []
        });
    }

    var pages = page;

  var limit = '10';

  if(pages == '')
  {
     pages = 1;
     sp = 0;
  }
  else
  {
     pages = pages;
     sp = (pages-1)*limit;
  }



await Likes.likePostCount(user_id,(err,data)=>{
if(data.length > 0 )
{
    var getcount  = data.length;
    var totalpage = Math.ceil(getcount/limit);

    Likes.likePost(user_id,(err,data)=>{
        if(data.length > 0)
        {
            return res.send({
                success : "yes",
                message : "like posts is here",
                data : data,
                total_page: totalpage,
                page: pages
            })
        }
        else
        {
            return res.send({
                success : "no",
                message : "something happend wrong",
                data : []
            })
        }
    })
}
else
{
    return res.send({
        success : "no",
        message : "something happend wrong",
        data : []
    })
}
})

    }
    catch(ex)
    {
      next(ex)
    }
}