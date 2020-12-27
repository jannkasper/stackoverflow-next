const { validateUser, signup, authenticate, listUsers, search, find } = require('./controllers/users');
const { loadComments, validate, createComment, removeComment } = require('./controllers/comments');
const { validateQuestion, loadQuestions, createQuestion, showQuestion, listQuestions, listQuestionsByTags, listQuestionsByUser, removeQuestion} = require("./controllers/questions");

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