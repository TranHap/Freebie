'use client'
import React, {useState, useEffect} from 'react'

// Allow us to re route to the home page
import { useRouter } from 'next/navigation'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

// Use this to know the user
import useAuthStore from '@/store/authStore';

// After upload video to sanity, it send back data, we want to set the data to our Video Asset, however we have to 
// define the type of our video Asset, this is due to we are using typescript

import { SanityAssetDocument } from "@sanity/client"

// Upload our video to sanity server
import { client } from '@/utils/client';

import { topics } from '@/utils/constants'; 
import { BASE_URL } from '@/utils';

const GiveStuffs = () => {
    const {userProfile} : {userProfile: any}= useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    // Here learn here
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
    const [isWrongFileType, setWrongFileType]  = useState(false)
    const [caption, setCaption] = useState('')
    const [category, setCategory] = useState(topics[0].name)
    const [savingPost, setSavingPost] = useState(false)
    const router = useRouter()
    const uploadVideo = async (e:any) => {
        const selectedFile = e.target.files[0]
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

        // If the video type is valid -> up it to sanity
        if(fileTypes.includes(selectedFile.type)) {
            setWrongFileType(false);
            setIsLoading(true);
            console.log("Success upload video")
            client.assets
                .upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name,
                })
                .then((data) => {
                setVideoAsset(data);
                setIsLoading(false);
            });
        } else{
            setIsLoading(false)
            setWrongFileType(true)
        }
    }
    // If the user click the button post 
    const handlePost = async () => {
        if(caption && videoAsset?._id && category) {
            setSavingPost(true)

            const document = {
                _type: 'post',
                caption,
                video: {
                  _type: 'file',
                  asset: {
                    _type: 'reference',
                    _ref: videoAsset?._id,
                  },
                },
                userId: userProfile?._id,
                postedBy: {
                  _type: 'postedBy',
                  _ref: userProfile?._id,
                },
                topic: category
              };

            await fetch(`${BASE_URL}/api/post`, {
                method: "POST",
                body: JSON.stringify(document)
            })
        }
        router.push('/')
    }
  return (
    <div className='flex w-full h-full mb-10 absolute left-0 pt-10 absolute top-[60px] lg:top-[70px] bg-[#F8F8F8] justify-center'>
        <div className="bg-white rounded-lg xl:h-[80vh] lg:w-[80%] flex gap-6 flex-wrap lg:justify-between items-center p-14 pt-6">
        {/* Our video, image and title */}
            <div>
                <div>
                    <p className='text-2xl font-bold'>Upload your things</p>
                    <p className='text-md text-gray-400 mt-1'>Post to your account</p>
                </div>
                <div className=' border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-5 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
                    {isLoading ? (
                        <p>Uploading...</p>
                    ): (
                        <div>
                            {videoAsset ? (
                                <div>
                                    <video 
                                        src={videoAsset.url}
                                        loop
                                        controls
                                        className='rounded-xl h-[462px] mt-16 bg-black'
                                    >

                                    </video>
                                </div>
                            ) : (
                                <label className="cursor-pointer">
                                    <div className='flex flex-col justify-center items-center  h-full'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='font-bold text-xl'>
                                                <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                                            </p>
                                            <p className='text-xl font-semibold'>
                                                Upload
                                            </p>
                                        </div>
                                        <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                            MP4 or WebM or ogg <br />
                                            720x1280 resolution or higher <br />
                                            Up to 10 minutes <br />
                                            Less than 2 GB
                                        </p>
                                        <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                            Select file
                                        </p>
                                    </div>
                                    <input 
                                        type="file"
                                        name="upload-video"
                                        onChange={(e) => uploadVideo(e)}
                                        className="w-0 h-0"
                                    />
                                </label>
                            )}
                        </div>
                    )}
                    {isWrongFileType && (
                        <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[260px]'>
                         Please select an video file (mp4 or webm or ogg)
                       </p>
                    )}
                </div>
            </div>
        {/* Our information about our post */}
            <div  className='flex flex-col gap-3 pb-10'>
                <label className='text-md font-medium '>Caption</label>
                <input
                    type='text'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className='rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
                />
                <label className='text-md font-medium '>Choose a category</label>
                <select
                    onChange={(e)=> setCategory(e.target.value)}
                    className='outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                >
                    {topics.map((topic) => (
                        <option
                            key={topic.name}
                            className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                            value={topic.name}
                        >
                            {topic.name}
                        </option>
                    ))}
                </select>
                <div className='flex gap-6 mt-10'>
                    <button
                        onClick={() => {}}
                        type='button'
                        className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                    >
                        Discard
                    </button>
                    <button
                        onClick={handlePost}
                        type='button'
                        className='bg-[#F51997] text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                    >
                        Post
                    </button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default GiveStuffs