import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
    // if user has no friends, encourage them to make some
    if (!friends || !friends.length) {
        return <p>{username}, make some friends!</p>;
    }

    return (
        <div>
            <h5>
                {/* if user has more than one friend, make plural */}
                {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
            </h5>
            {/* create links to friend's profiles */}
            {friends.map(friend => (
                <button key={friend._id}>
                    <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </button>
            ))}
        </div>
    );
};

export default FriendList;