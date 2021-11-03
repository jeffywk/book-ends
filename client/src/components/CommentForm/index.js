import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ postId }) => {
    const [commentBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    // update state based on form inputs
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addComment({
                variables: { commentBody, postId }
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="container">
            <p className={`${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span>Something went wrong...</span>}
            </p>
            <form className="form-group"
                onSubmit={handleFormSubmit}
            >
                <textarea className="form-control"
                    placeholder="Leave a comment"
                    value={commentBody}
                    onChange={handleChange}
                ></textarea>

                <button type="submit" className="btn btn-primary mt-2 mb-4">
                    Submit
                </button>
            </form>

            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default CommentForm;