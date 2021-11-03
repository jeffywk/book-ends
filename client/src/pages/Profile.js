import React from 'react';
import PostList from '../components/PostList';
import FriendList from '../components/FriendList';
import PostForm from '../components/PostForm';
import { ADD_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { Redirect, useParams } from 'react-router-dom';

const Profile = () => {
    // extract username from url using useParams hook
    const { username: userParam } = useParams();

    // pass extracted username into graphql query
    // if userParam has a value, use that to run QUERY_USER; if not, run QUERY_ME
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    // get data for either the QUERY_ME or QUERY_USER response
    const user = data?.me || data?.user || {};

    const [addFriend] = useMutation(ADD_FRIEND);

    // redirect to personal profile page if username matches logged-in username
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
        <h4>
            You need to be logged in to see this page! Login or sign up above.
        </h4>
        );
    }

    const handleClick = async () => {
        try {
            await addFriend({
                variables: { id: user._id }
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="container">
            <div>
                {/* if userParam does not have a value, display 'your profile'; if it does have a value, display user's username */}
                <h2>
                    {userParam ? `${user.username}'s` : 'your'} profile
                </h2>

                {userParam && (
                <button onClick={handleClick} className="btn btn-link">
                    Add {user.username} as a Friend
                </button>
                )}
            </div>

            <div>
                <div className="mt-4">
                    <PostList posts={user.posts} title={`${user.username}'s posts:`} />
                </div>
                <div className="mt-4">
                    <FriendList
                        username={user.username}
                        friendCount={user.friendCount}
                        friends={user.friends}
                    />
                </div>
            </div>
            <div>{!userParam && <PostForm />}</div>
        </div>
    );
};

export default Profile;