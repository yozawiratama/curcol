Meteor.methods({
    CommentInsert : function(comment, postID, commentator){
        Comments.insert({
            Comment : comment,
            Post_ID : postID,
            CreatedAt: new Date(),
            CreatedBy : commentator,
            LastModifiedAt: new Date()
        });
    },
    CommentRemove : function(commentID){
        Comments.remove({_id : commentID});
    }
});