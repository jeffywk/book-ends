import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
    return (
        <div className="container">
            <div>
                <span>Comments:</span>
            </div>
            <div>
                {/* display comments and create links to commenter's profiles */}
                {comments &&
                    comments.map(comment => (
                        <p key={comment._id}>
                            <Link to={`/profile/${comment.username}`}>
                                {comment.username} on {comment.createdAt}
                            </Link>
                            <br />
                            {comment.commentBody}
                        </p>
                ))}
            </div>
        </div>
    );
};

export default CommentList;