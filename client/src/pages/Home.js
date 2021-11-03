import React from 'react';
import PostList from '../components/PostList';
import FriendList from '../components/FriendList';
import PostForm from '../components/PostForm';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';

const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_POSTS);
    
    // destructure to get 'data' from 'useQuery' hook and rename 'userData'
    const { data: userData } = useQuery(QUERY_ME);
    
    // if data exists, store in posts; if not, save empty array to component
    const posts = data?.posts || [];
    
    const loggedIn = Auth.loggedIn();

    return (
        <main className="container">
            <div>
                {loggedIn && (
                <div>
                    <PostForm />
                </div>
                )}
                <div className={`${loggedIn}`}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <PostList posts={posts} title='Posts' />
                )}
                </div>
                {loggedIn && userData ? (
                    <div>
                        <FriendList
                            username={userData.me.username}
                            friendCount={userData.me.friendCount}
                            friends={userData.me.friends}
                        />
                    </div>
                ) : null}
            </div>
        </main>
    );
};

export default Home;