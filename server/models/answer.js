const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = require("./vote");
const commentSchema = require("./comment");

const answerSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    created: { type: Date, default: Date.now },
    text: { type: String, required: true },
    score: { type: Number, default: 0 },
    votes: [voteSchema],
    comments: [commentSchema]
});

answerSchema.set("toJSON", { getters: true });

answerSchema.methods = {
    vote: function (user, vote) {
        const existingVote = this.votes.find((v) => v.user._id.equals(user));

        if (existingVote) {
            this.score -= existingVote.vote;
            if (vote == 0) {
                this.vote.pull(existingVote);
            } else {
                this.score += vote;
                existingVote.vote = vote;
            }
        } else if (vote != 0) {
            this.score += vote;
            this.votes.push({ user, vote });
        }

        return this;
    },

    addComment: function (author, body) {
        this.comments.push({ author, body });
        return this;
    },

    removeComment: function (id) {
        const comment = this.comments.id(id);
        if (!comment) {
            throw new Error("Comment not found.");
        }

        comment.remove();
        return this;
    }
}

module.exports = answerSchema;