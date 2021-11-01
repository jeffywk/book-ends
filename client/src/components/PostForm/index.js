import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

const PostForm = () => {
    const [postText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    
    // request updated array from the server
    const [addPost, { error }] = useMutation(ADD_POST, {
        // use cache object to read what's saved in QUERY_POSTS cache, and then update it with writeQuery()
        update(cache, { data: { addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POSTS });
                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...posts] }
                });
            } catch (e) {
                console.error(e);
            }
        
            // update me object's cache, adding new post to the end of the array
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, posts: [...me.posts, addPost] } }
            });
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
            // add post to database
            await addPost({
                variables: { postText }
            });
      
            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
    };

    return (
        <div>
            <p className={`${characterCount === 280}`}>
                Character Count: {characterCount}/280
                {error && <span>Something went wrong...</span>}
            </p>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="What's on your mind?"
                    onChange={handleChange}
                ></textarea>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PostForm;