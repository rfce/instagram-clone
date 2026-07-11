const jwt = require('jsonwebtoken')
const Post = require('../model/Post')
const User = require('../model/User')

const fetchPost = async (req, res) => {
    const token = req.body.token

    const { hash } = req.params

    if (token === undefined) {
        return res.json({
            status: "fail",
            reason: "Please log in to access this page"
        })
    }

    let data

    try {
        data = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
    } catch (error) {
        return res.json({
            status: "fail",
            reason: "Invalid token. Please login again to get a new token."
        })
    }

    const profile = await User.findOne(
        { username: data.username },
        {
            _id: false, 
            __v: false, 
            email: false,
            phone: false,
            password: false
        }
    )

    const following = profile.following

    const post = await Post.findOne(
        {
            $or: [
                { username: data.username },
                { username: {
                    $in: following 
                }}
            ],
            hash
        },
        {_id: false, __v: false}
    )

    res.json({
        status: "success",
        post
    })
}

module.exports = fetchPost
