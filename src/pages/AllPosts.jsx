import React, { useEffect, useState } from 'react';
import { Container, Postcard } from '../components';
import appwriteService from '../appwrite/majorconfigappwrite';
import { useSelector } from 'react-redux';  // To access Redux state

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);  // Get user data from Redux store

    useEffect(() => {
        const fetchPosts = async () => {
            if (userData && userData.$id) {  // Check if user is logged in
                const fetchedPosts = await appwriteService.getPostsByUser(userData.$id); // Use user ID to fetch posts
                console.log("Fetched posts:", fetchedPosts);
                if (fetchedPosts) {
                    setPosts(fetchedPosts.documents);  // Update state with fetched posts
                }
            } else {
                console.log("User data is not available.");
            }
        };

        fetchPosts();
    }, [userData]);  // Dependency on userData, will run every time userData changes

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length === 0 ? (
                        <p>No posts available.</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <Postcard {...post} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
