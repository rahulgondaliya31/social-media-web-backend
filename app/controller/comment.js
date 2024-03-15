const Comment = require("../model/comment.js")



exports.addcomment = async (req, res, next) => {
    try {
        const { user_id, post_id, content } = req.body
        let errors = ""

        if (!user_id) {
            errors = "user_id is required"
        }
        else if (!post_id) {
            errors = "post_id is required"
        }
        else if (!content) {
            errors = "content is required"
        }


        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            });
        }

        const comentData = new Comment({
            user_id: user_id,
            post_id: post_id,
            content: content
        })

        await Comment.addComment(comentData, (err, data) => {
            return res.send({
                success: "yes",
                message: "comment on post successfully",
                data: data
            })
        })


    }
    catch (ex) {
        next(ex)
    }
}


exports.getcomment = async (req, res, next) => {
    try {
        const { post_id } = req.body
        let errors = ""

        if (!post_id) {
            errors = "post id is required"
        }


        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            });
        }

        await Comment.getComment(post_id, (err, data) => {
            // console.log(data); return false
            if (data.length) {
                return res.send({
                    success: "yes",
                    message: "all comments is here",
                    data: data,
                })
            }
            else {
                return res.send({
                    success: "no",
                    message: "No comments on this post",
                    data: []
                })
            }
        })


    }
    catch (ex) {
        next(ex)
    }
}


exports.deletecomment = async (req, res, next) => {
    try {
        const { user_id, comment_id } = req.body
        //    console.log(req.body); return false
        let errors = ""

        if (!user_id) {
            errors = "user_id is required"
        }

        if (!comment_id) {
            errors = "comment id is required"
        }


        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            });
        }

        await Comment.deleteComment(user_id, comment_id, (err, data) => {
            // console.log(user_id,comment_id); return false
            return res.send({
                success: "yes",
                message: "comment delete successfully",
                data: []
            })
        })

    }
    catch (ex) {
        next(ex)
    }
}