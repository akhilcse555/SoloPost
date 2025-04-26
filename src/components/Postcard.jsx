import React , { useState , useEffect } from 'react'
import appwriteService from "../appwrite/majorconfigappwrite"
import {Link} from 'react-router-dom'

function Postcard({
    $id,
    title,
    featuredImage
}) {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        async function fetchImage() {
            const url = appwriteService.getFileView(featuredImage);
            setImageUrl(url); // or url if already string
        }
    
        if (featuredImage) {
            fetchImage();
        }
    }, [featuredImage]);
    



    console.log("props is",$id,title,featuredImage,imageUrl);
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={imageUrl} alt={title}
                    className='rounded-xl'
                    />
                </div>
                <h2 className='text-xl font-bold'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default Postcard
