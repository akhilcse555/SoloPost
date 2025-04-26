import React, { useEffect, useState } from 'react'
import { Container, Postcard } from '../components'
import appwriteService from '../appwrite/majorconfigappwrite'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])

    // Get login status from Redux store
    const userData = useSelector((state) => state.auth.userData);
    const isLoggedIn = useSelector((state) => state.auth.status);
    
    useEffect(() => {
        if (isLoggedIn && userData?.$id) {
            appwriteService.getPostsByUser(userData.$id)
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents);
                    }
                }).catch((error) => console.error("Error getting user posts:", error));
        }
    }, [isLoggedIn, userData]);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {isLoggedIn ? "No posts yet." : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
