const { validateUser, signup, authenticate, listUsers, search, find } = require('./controllers/users');
const { validateQuestion, loadQuestions, createQuestion, removeQuestion, showQuestion, listQuestions, listQuestionsByTags, listQuestionsByUser } = require("./controllers/questions");
const { validateAnswer, loadAnswers, createAnswer, removeAnswer } = require('./controllers/answers');
const { validateComment, loadComments, createComment, removeComment } = require('./controllers/comments');
const { upVote, downVote, unVote } = require("./controllers/votes");
const { listTags, listPopularTags, searchTags } = require("./controllers/tags");

const requireAuth = require('./middlewares/requireAuth');
const questionAuth = require('./middlewares/questionAuth');
const commentAuth = require('./middlewares/commentAuth');
const answerAuth = require('./middlewares/answerAuth');

const router = require('express').Router();
//authentication
router.post('/signup', validateUser, signup);
router.post('/authenticate', validateUser, authenticate);

//users
router.get('/users', listUsers);
router.get('/users/:search', search);
router.get('/user/:username', find);

//questions
router.param('question', loadQuestions);
router.post('/questions', [requireAuth, validateQuestion], createQuestion);
router.get('/question/:question', showQuestion);
router.get('/questions', listQuestions);
router.get('/questions/tag/:tags', listQuestionsByTags);
router.get('/questions/user/:username', listQuestionsByUser);
router.delete('/question/:question', [requireAuth, questionAuth], removeQuestion);

//answers
router.param('answer', loadAnswers);
router.post('/answer/:question', [requireAuth, validateAnswer], createAnswer);
router.delete('/answer/:question/:answer', [requireAuth, answerAuth], removeAnswer);

//comments
router.param('comment', loadComments);
router.post('/comment/:question/:answer?', [requireAuth, validateComment], createComment);
router.delete('/comment/:question/:comment', [requireAuth, commentAuth], removeComment);
router.delete('/comment/:question/:answer/:comment', [requireAuth, commentAuth], removeComment);

//tags
router.get('/tags/populartags', listPopularTags);
router.get('/tags/:tag', searchTags);
router.get('/tags', listTags);

//votes
router.get('/votes/upvote/:question/:answer?', requireAuth, upVote);
router.get('/votes/downvote/:question/:answer?', requireAuth, downVote);
router.get('/votes/unvote/:question/:answer?', requireAuth, unVote);


module.exports = (app) => {
    app.use("/api", router);

    app.use((req, res, next) => {
        const error = new Error("Not found");
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500).json({message: error.message})
    });
};