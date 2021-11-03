import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts, title }) => {
    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return (
        <div>
        <h3>{title}</h3>
        {posts &&
            posts.map(post => (
            <div key={post._id} className="mt-5">
                <p>
                    <Link
                        to={`/profile/${post.username}`}
                    >
                        {post.username}
                    </Link>{' '}
                    posted on {post.createdAt}
                </p>
                <div>
                    <Link to={`/post/${post._id}`}>
                        <p>{post.postText}</p>
                        <p>
                            {/* if there are comments, display 'Check out'; if not, display 'Start' */}
                            Comments: {post.commentCount}  
                            <br />
                            {' '}
                            {post.commentCount ? 'Check out' : 'Start'} the discussion!
                        </p>
                    </Link>
                </div>
            </div>
            ))}
        </div>
    );
};

export default PostList;