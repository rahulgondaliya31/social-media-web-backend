const Users = require("../model/users.js");
const Post = require("../model/postvideo.js")
const savePost = require("../model/savepost.js")
const Story = require("../model/story.js")
const nodemailer = require('nodemailer');

const sha512 = require("js-sha512");



exports.register = async (req, res, next) => {
    try {
        const { username, password, email, name, gender, bio } = req.body
        // console.log(req.files); return false
        let errors = "";

        if (!username) {
            errors = "username is required"
        }
        else if (!password) {
            errors = "password is required"
        }
        else if (!email) {
            errors = "email is required"
        }
        else if (!name) {
            errors = "name is required"
        }
        // else if (!gender) {
        //     errors = "gender is required"
        // }
        // else if (!bio) {
        //     errors = "bio is required"
        // }
        // else if (!req.files || Object.keys(req.files).length === 0) {
        //     errors = "profile picture is required"
        // }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            });
        }

        await Users.findEmailExist(email, (err, data) => {
            // console.log(data); return false
            if (data) {
                return res.send({
                    success: "no",
                    message: "Email already exists",
                    data: res
                })
            }
            else {
                // const profilepic = req.files.profile_picture
                // const filename = profilepic.name;
                // const path = "upload/profile_pic/" + filename
                // profilepic.mv(path, function (err) {
                // })

                const pass = sha512(password)
                const userData = new Users({
                    username: username,
                    password: pass,
                    email: email,
                    name: name,
                    // gender: gender,
                    // bio: bio,
                    // profile_picture: filename

                })

                Users.addUser(userData, (err, data) => {
                    const id = data
                    // console.log(id); return false
                    Users.findUserInfo(id, (err, newUser) => {
                        // console.log(newUser); return false
                        return res.send({
                            success: "yes",
                            message: "register successfully",
                            data: newUser
                        })
                    })
                })
            }
        })
    }
    catch (ex) {
        next(ex)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        let errors = ""

        if (!email) {
            errors = "email is required"
        }
        else if (!password) {
            errors = "password is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            });
        }

        await Users.loginUser(email, password, (err, data) => {
            // console.log(data); return false
            if (data) {
                return res.send({
                    success: "yes",
                    message: "login successfully",
                    data: data
                })
            }
            else {
                return res.send({
                    success: "no",
                    message: "email and password incorrect",
                    data: []
                })
            }
        })

    }
    catch (ex) {
        next(ex)
    }
}

exports.get_user_detail = async (req, res, next) => {
    try {
        const { user_id, myid } = req.body
        let errors = ""

        if (!user_id) {
            errors = "user_id is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            });
        }

        await Users.getUserDetail(user_id, myid, (err, data) => {
            return res.send({
                success: "yes",
                message: "user detail is here",
                data: data
            })
        })
    }
    catch (ex) {
        next(ex)
    }
}

exports.updateprofile = async (req, res, next) => {
    try {
        const { user_id, email, name, bio } = req.body
        // console.log(req.body); return false
        let errors = ""

        if (!user_id) {
            errors = "user_id is required"
        }
        else if (!req.files || Object.keys(req.files).length === 0) {

        }


        if (errors.length > 0) {
            return res.send({
                success: "yes",
                message: errors,
                data: []
            });
        }


        const profilepic = req.files.profile_picture 
        const filename = profilepic.name;
        const path = "upload/profile_pic/" + filename
        profilepic.mv(path, function (err) {
        })

        await Users.updateProfile(user_id, email, name, bio, filename, (err, update) => {
            return res.send({
                success: "yes",
                message: "profile update successfully",
                data: req.body
            })
        })

    }
    catch (ex) {
        next(ex)
    }
}

exports.changepassword = async (req, res, next) => {
    try {
        const { password, user_id } = req.body

        let errors = "" 

        if (!password) {
            errors = "password is required"
        }


        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
        }

        await Users.findPasswordUses(password, user_id, (err, data) => {
            const pass = data
            if (!pass) {
                return res.send({
                    success: "no",
                    message: "password was incorrect",
                    data: []
                })
            }
            else {
                const id = data.id
                const new_password = req.body.new_password

                Users.updatePassword(new_password, id, (err, data) => {
                    return res.send({
                        success: "yes",
                        message: "password update successfully",
                        data: req.body
                    })
                })
            }
        })


    }
    catch (ex) {
        next(ex)
    }
}

exports.deleteuser = async (req, res, next) => {
    try {
        const { user_id } = req.body
        errors = ""


        if (!user_id) {
            errors = "user_id is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
        }

        await Users.deleteUser(user_id, (err, data) => {
            return res.send({
                success: "yes",
                message: "user delete successfully",
                data: data
            })
        })

    }
    catch (ex) {
        next(ex)
    }
}

exports.postvideo = async (req, res, next) => {
    try {
        const { user_id, description } = req.body
        let errors = ""

        if (!user_id) {
            errors = "user_id is required"
        }
        else if (!description) {
            errors = "description is required"
        }
        else if (!req.files || Object.keys(req.files).length === 0) {
            errors = "post video is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
        }

        const profilepic = req.files.video
        const filename = profilepic.name;
        const path = "upload/post/" + filename
        profilepic.mv(path, function (err) {
        })

        const postData = new Post({
            user_id: user_id,
            description: description,
            video: filename
        })

        await Post.addPost(postData, (err, data) => {
            return res.send({
                success: "yes",
                message: "post add successfully",
                data: data
            })
        })

    }
    catch (ex) {
        next(ex)
    }

}

exports.getpost = async (req, res, next) => {
    try {
        const { user_id, id, page } = req.body
        let errors = ""

        if (!user_id) {
            errors = "user_id is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
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

        await Post.getPostsCount(user_id, id, (err, data) => {
            // console.log(data); return false
            if (data) {
                var getcount = data.length;
                var totalpage = Math.ceil(getcount / limit);

                Post.getPosts(user_id, id, sp, limit, (err, data1) => {
                    // console.log(data1); return false
                    return res.send({
                        success: "yes",
                        message: "all posts is here",
                        data: data1,
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

exports.removepost = async (req, res, next) => {
    try {
        const { post_id } = req.body
        let errors = ""

        if (!post_id) {
            errors = "post_id is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
        }

        await Post.deletePost(post_id, (err, data) => {
            return res.send({
                success: "yes",
                message: "post delete successfully",
                data: req.body
            })
        })
    }
    catch (ex) {
        next(ex)
    }
}

exports.savepost = async (req, res, next) => {
    try {
        const { post_id, user_id } = req.body
        let errors = ""

        if (!post_id) {
            errors = "post id is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
        }

        await savePost.isFavoriteExist(user_id, post_id, (err, data) => {
            if (data) {
                savePost.remove(data.id, (err, save) => {
                    var saved = {}
                    saved['is_saved'] = 0
                    return res.send({
                        success: "no",
                        message: "post unsave successfully",
                        data: saved
                    })
                })
            }
            else {

                savePost.selectPost(post_id, (err, data) => {


                    const saveData = new savePost({
                        post_id: post_id,
                        user_id: user_id,
                        video: data.video,
                        description: data.description,
                        username: data.username,
                        profile_picture: data.profile_picture,
                        like: data.likes,
                        comment: data.comments
                    })
                    //  console.log(user_id); return false
                    savePost.savedPost(saveData, (err, data1) => {
                        var savepost = {}
                        savepost['is_saved'] = 1
                        return res.send({
                            success: "yes",
                            message: "post saved successfully",
                            data: savepost
                        })
                    })
                })

            }

        })
    }
    catch (ex) {
        next(ex)
    }
}

exports.savedpostlisting = async (req, res, next) => {
    try {

        const { user_id, page } = req.body
        let errors = ""

        if (!user_id) {
            errors = "user id is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
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

        await savePost.getPostListingCount(user_id, (err, data) => {
            if (data.length > 0) {

                var getcount = data.length;
                var totalpage = Math.ceil(getcount / limit);

                savePost.getPostListing(user_id, sp, limit, (err, data) => {
                    // console.log(data); return false
                    if (data.length > 0) {
                        var postLis = []
                        var listData = data
                        listData.forEach(function (post) {
                            var obj = {}

                            obj['post_id'] = post.post_id;
                            obj['user_id'] = post.user_id;
                            obj['video'] = post.video;
                            obj['description'] = post.description;
                            obj['like'] = post.like;
                            obj['comment'] = post.comment;
                            obj['username'] = post.username;
                            obj['profile_picture'] = post.profile_picture
                            postLis.push(obj)
                        })

                        return res.send({
                            success: "yes",
                            message: "saved post list is here",
                            data: postLis,
                            total_page: totalpage,
                            page: pages
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

// exports.getposts = async (req, res, next) => {
//     try {
//         const { user_id,post_id} = req.body
//         let errors = ""

//         if (!user_id) {
//             errors = "user_id is required"
//         }
//         //  else if(!followed_id)
//         //  {
//         //     errors = "followed id is required"
//         //  }

//         if (errors.length > 0) {
//             return res.send({
//                 success: "no",
//                 message: errors,
//                 data: []
//             })
//         }

//                 Post.getPost(user_id,post_id,(err, data) => {
//                     if (data) {

//                         return res.send({
//                             success: "yes",
//                             message: "followed user post is here",
//                             data: data,

//                         })
//                     }
//                     else {
//                         return res.send({
//                             success: "no",
//                             message: "something happend wrong",
//                             data: []
//                         })
//                     }
//                 })
//             }

//     catch (ex) {
//         next(ex)
//     }
// }

exports.addstory = async (req, res, next) => {
    try {
        const { user_id } = req.body
        let errors = ""

        if (!user_id) {
            errors = "user is is required"
        }
        else if (!req.files || Object.keys(req.files).length === 0) {
            errors = "video is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
        }

        const profilepic = req.files.video
        const filename = profilepic.name;
        const path = "upload/story/" + filename
        profilepic.mv(path, function (err) {
        })

        const stories = new Story({
            user_id: user_id,
            video: filename
        })

        await Story.addStory(stories, (err, data) => {
            return res.send({
                success: "yes",
                message: "story add successfully",
                data: data
            })
        })
    }
    catch (ex) {
        next(ex)
    }
}

exports.deletestory = async (req, res, next) => {
    try {
        const { user_id, story_id } = req.body
        let errors = ""

        if (!user_id) {
            errors = "user id is required"
        }
        else if (!story_id) {
            errors = "story id is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
        }

        await Story.deleteStory(story_id, user_id, (err, data) => {
            return res.send({
                success: "yes",
                message: "story delete successfully",
                data: data
            })
        })

    }
    catch (ex) {
        next(ex)
    }
}

exports.getstory = async (req, res, next) => {
    try {
        const { followed_id, page } = req.body
        let errors = ""

        //   if(!user_id)
        //   {
        //     errors = "user_id is required"
        //   }

        if (!followed_id) {
            errors = "followed id is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
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


        await Story.getStoryCount(followed_id, (err, data) => {
            if (data.length > 0) {

                var getcount = data.length;
                var totalpage = Math.ceil(getcount / limit);

                Story.getStory(followed_id, sp, limit, (err, data) => {
                    // console.log(data); return false
                    if (data.length > 0) {
                        var newArr = []
                        var storydata = data
                        storydata.forEach(function (sdata) {
                            var obj = {}
                            obj['user_id'] = sdata.user_id;
                            obj['video'] = sdata.video;
                            obj['username'] = sdata.username;
                            obj['profile_picture'] = sdata.profile_picture;
                            obj['created_at'] = data.created_at;
                            newArr.push(obj)
                        })
                        return res.send({
                            success: "yes",
                            message: "all story is here ",
                            data: newArr,
                            total_page: totalpage,
                            page: pages
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

exports.forgotpassword = async (req, res, next) => {
    try {
        const { email } = req.body
        let errors = ""

        if (!email) {
            errors = "email is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
        }

        var random_pass = Math.floor(Math.random() * 10000)
        // const password =  sha512(random_pass)
        await Users.findEmailExist(email, (err, data) => {
            if (data) {


                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'rahulgondaliya268@gmail.com',
                        pass: 'swfacgzvoibghesg'
                    }
                });

                var mailOptions = {
                    from: 'rahulgondaliya268@gmail.com',
                    to: email,
                    subject: 'Sending Email using Node.js',
                    text: `this is your new password ${random_pass}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                //   const password = sha512(random_pass)
                //   console.log(password); return false
                Users.forgetPassword(email, random_pass, (err, data1) => {
                    if (data1) {
                        return res.send({
                            success: "yes",
                            message: "forgot password email send your gmail"
                        })
                    }

                })


            }
            else {
                return res.send({
                    success: "no",
                    message: "enter a valid email address",
                    data: []
                })
            }
        })
    }
    catch (ex) {
        next(ex)
    }
}

exports.postlisting = async (req, res, next) => {
    try {

        const { user_id } = req.body

        await Post.postListing(user_id, (err, pdata) => {
            if (pdata) {
                return res.send({
                    success: "yes",
                    message: "all post is here",
                    data: pdata,
                })
            }
            else {
                return res.send({
                    success: "no",
                    message: "something happend wrong",
                    data: [],
                })
            }
        })

    }
    catch (ex) {
        next(ex)
    }
}

exports.account = async (req, res, next) => {
    try {
        const { user_id, account } = req.body
        let errors = ''

        if (!user_id) {
            errors = "user id is required"
        }
        else if (!account) {
            errors = "account is required"
        }

        if (errors.length > 0) {
            return res.send({
                success: "no",
                message: errors,
                data: []
            })
        }

        await Users.existPrivatepublic(user_id, (err, data) => {
            if (data) {
                Users.UpdateAccount(user_id, account, (err, data1) => {
                    return res.send({
                        success: "yes",
                        message: "account update successfully",
                        data: req.body
                    })
                })
            }
            else {
                return res.send({
                    success: "no",
                    message: "user not found",
                    data: []
                })
            }

        })
    }
    catch (ex) {
        next(ex)
    }
}

exports.userlisting = async (req, res, next) => {
    try {
        const { search_text,user_id } = req.body
        let errors = ""

        var searchText = '';
        if (search_text != undefined && search_text != '') {
            searchText = search_text;
        }

                Users.getUserList(searchText,user_id, (err, user) => {
                    var newuse = []
                    var usedata = user
                    usedata.forEach(function (row) {
                        var obj = {}
                        obj['id'] = row.id
                        obj['username'] = row.username
                        obj['profile_picture'] = row.profile_picture
                        obj['follow_detail'] = row.follow_detail
                        newuse.push(obj)
                    })

                    return res.send({
                        success: "yes",
                        message: "all user is here",
                        data: newuse,
                        
                    })
                })
            
    }
    catch (ex) {
        next(ex)
    }
}
