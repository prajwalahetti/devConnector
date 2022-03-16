const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route Post api/posts
// @desc create post
// @access Private
router.post(
  "/",
  [auth, [check("text", "text is req").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Errror");
    }
  }
);
// @route get api/posts
// @desc get all post
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
// @route get api/post/:id
// @desc get single post by id
// @access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "post not found" });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === ObjectId)
      return res.status(404).json({ msg: "post not found" });

    res.status(500).send("server error");
  }
});
// @route delete api/post/:id
// @desc delete single post by id
// @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "post not found" });

    // check if the post is by the same user
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "user not authorized" });
    await post.remove();
    res.json("post removed");
  } catch (error) {
    console.error(error.message);
    if (error.kind === ObjectId)
      return res.status(404).json({ msg: "post not found" });

    res.status(500).send("server error");
  }
});

// @route put api/post/like/:id
// @desc put like on post by id
// @access Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "post not found" });
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "post already liked" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    res.status(500).send("server error");
  }
});
// @route put api/post/unlike/:id
// @desc unlike on post by id
// @access Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //  if(!post)return res.status(404).json({msg:'post not found'});
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "post not liked yet" });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();

    return res.json(post);
  } catch (error) {
    console.error(error.message);

    res.status(500).send("server error");
  }
});

// @route Post api/posts/comment/:id
// @desc create comments on post
// @access Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // get the user data who wanna post
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route delete api/posts/comment/:id
// @desc delete comments on post
// @access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // finding the post
    const post = await Post.findById(req.params.id);
    // pull on the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // to check for comment existence
    if (!comment)
      return res.status(401).json({ msg: "comment does not exist" });

    // to check for coomment of the user
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "user not authorized" });

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();

    return res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Sedrver Errror");
  }
});
module.exports = router;
