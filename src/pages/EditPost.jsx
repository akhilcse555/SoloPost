import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/majorconfigappwrite'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);  // Get user data from Redux store

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug)
             .then((post) => {
                if(post){
                    setPosts(post);
                  //  console.log("post data is",post)
                }
            })
          //  console.log("post data is",post)
        }
        else{
            navigate('./');
        }
    }, [slug,navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>    
            </Container>
        </div>
    ) : null ; 
}

export default EditPost
