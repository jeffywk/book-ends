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
            <div key={post._id}>
                <p>
                    <Link
                        to={`/profile/${post.username}`}
                    >
                        {post.username}
                    </Link>{' '}
                    post on {post.createdAt}
                </p>
                <div>
                    <Link to={`/post/${post._id}`}>
                        <p>{post.postText}</p>
                        <p>
                            Comments: {post.commentCount} || Click to{' '}
                            {post.commentCount ? 'see' : 'start'} the discussion!
                        </p>
                    </Link>
                </div>
            </div>
            ))}
        </div>
    );
};

export default PostList;