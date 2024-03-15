const Follow = require("../model/follow.js")

exports.addfollow_or_unfollow = async (req, res, next) => {
    try {
        const { followerUserId, followedUserId } = req.body
        let errors = ""

        if (!followerUserId) {
            errors = "follower id is required"
        }
        else if (!followedUserId) {
            errors = "followed id is required "
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            });
        }

        await Follow.isFollowExist(followerUserId, followedUserId, (err, data) => {
            if (data) {
                Follow.Unfollow(data.id, (err, data1) => {
                    var follow = {}
                    follow['is_follow'] = 0
                    return res.send({
                        success: "yes",
                        message: "user unfollow successfully",
                        data: follow
                    })
                })
            }
            else {
                const followData = new Follow({
                    followerUserId: followerUserId,
                    followedUserId: followedUserId
                })

                Follow.addFollow(followData, (err, data) => {
                    var follow = {}
                    follow['is_follow'] = 1
                    return res.send({
                        success: "yes",
                        message: "user follow successfully",
                        data: follow
                    })
                })
            }
        })

    }
    catch (ex) {
        next(ex)
    }
}

exports.getfollow = async (req, res, next) => {
    try {
        const { followed_id, page } = req.body
        let errors = ""

        if (!followed_id) {
            errors = "followed id is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            });
        }

        var pages = page;

        var limit = '10';

        if (pages == '') {
            pages = 1;
            sp = 0;
        }
        else {
            pages = pages;
            sp = (pages - 1) * limit;
        }


        await Follow.getFollowCount(followed_id, (err, data) => {
            if (data.length > 0) {
                
                var getcount = data.length;
                var totalpage = Math.ceil(getcount / limit);

                Follow.getFollow(followed_id, sp, limit, (err, data) => {
                    // console.log(data); return false
                    return res.send({
                        success: "yes",
                        message: "followed list is here",
                        data: data,
                        total_page: totalpage,
                        page: pages
                    })
                })
            }
            else {
                return res.send({
                    success: "no",
                    message: "something happend wrong",
                    data: []
                })
            }
        })
    }
    catch (ex) {
        next(ex)
    }
}

