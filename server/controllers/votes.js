exports.upVote = async (req, res) => {
    const { id } = req.user;

    if (req.answer) {
        req.answer.vote(id, 1);
        const question = await req.question.save();
        return res.json(question);
    }

    const question = await req.question.vote(id, 1);
    return res.json(question);
};

exports.downVote = async (req, res) => {
    const { id } = req.user;

    if (req.answer) {
        req.answer.vote(id, -1);
        const question = await req.question.save();
        return res.json(question);
    }

    const question = await req.question.vote(id, -1);
    return res.json(question);
}

exports.unVote = async (req, res) => {
    const { id } = req.user;

    if (req.answer) {
        req.answer.vote(id, 0);
        const question = await req.question.save();
        return res.json(question);
    }

    const question = await req.question.vote(id, 0);
    return res.json(question);
}