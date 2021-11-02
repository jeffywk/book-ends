import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Auth from '../utils/auth';

const SinglePost = props => {
  
    // get ID from url using useParams hook
    const { id: postId } = useParams();

    // destructure loading and data from useQuery hook, pass the id property on the variables object to graphql query parameter
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    // if data exists, store in posts; if not, save empty object to component
    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <div>
                <p>
                    <span>
                        {post.username}
                    </span>{' '}
                        posted on {post.createdAt}
                </p>
                <div>
                    <p>{post.postText}</p>
                </div>
            </div>
            {Auth.loggedIn() && <CommentForm postId={post._id} />}
            {post.commentCount > 0 && <CommentList comments={post.comments} />}
        </div>
    );
};

export default SinglePost;