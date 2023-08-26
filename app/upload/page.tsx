'use client'
import React, {useState, useEffect} from 'react'

// Allow us to re route to the home page
import { useRouter } from 'next/navigation'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

// Use this to know the user
import useAuthStore from '@/store/authStore';


import { SanityAssetDocument } from "@sanity/client"

import { client } from '@/utils/client';

import { categories } from '@/utils/constants'; 
import { BASE_URL } from '@/utils';

const GiveStuffs = () => {
    const {userProfile} : {userProfile: any}= useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const id = userProfile?._id
    // Here learn here
    const [imageAsset, setImageAsset] = useState<SanityAssetDocument | undefined>()
    const [isWrongFileType, setWrongFileType]  = useState(false)
    const [caption, setCaption] = useState('')
    const [category, setCategory] = useState(categories[0].name)
    const [savingPost, setSavingPost] = useState(false)
    const router = useRouter()

    const uploadImage = async (e:any) => {
        const selectedFile = e.target.files[0]
        const fileTypes = ['image/png','image/svg','image/jpeg','image/gif', 'image/tiff'];

        // If the image type is valid -> up it to sanity
        if(fileTypes.includes(selectedFile.type)) {
            setWrongFileType(false);
            setIsLoading(true);
            await client.assets
                .upload('image', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name,
                })
                .then((data) => {
                setImageAsset(data);
                setIsLoading(false);
            });
            // Using model to categorize automatically    
            
        } else{
            setIsLoading(false)
            setWrongFileType(true)
        }
    }
    useEffect(() => {
        getClassName()
    },[imageAsset])

    const getClassName = async () => {
        if (imageAsset){
            const response = await fetch('http://0.0.0.0:8000/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'text/plain', // Set the appropriate content type
                },
                body: JSON.stringify({image_url : imageAsset.url}),
                // body: imageAsset.url,
            })
            // const data = await response.text()
            // setCategory(data)     
            const data = await response.json()
            const hello = data.label
            setCategory(hello)
            alert("success")
        }     
    }
    // const getClassName2 = async () => {
    //     alert('nice')
    //     if (imageAsset){
    //         const response = await fetch('https://localhost:8080/categorize',{
    //             method: "POST",
    //             headers: {
    //                 // 'Content-Type': 'application/json'
    //                 'Content-Type': 'text/plain', // Set the appropriate content type
    //             },
    //             // body: JSON.stringify({image_url : imageAsset.url}),
    //             body: imageAsset.url,
    //         })
    //         const data = await response.text()
    //         setCategory(data)     
            
    //         alert("success")
    //     }     
    // }
    const saveImage = async () => {
        if(caption && imageAsset?._id && category) {
            setSavingPost(true)
            const document = {
                _type: 'post',
                caption,
                image: {
                    _type: 'image',
                    asset: {
                      _type: 'reference',
                      _ref: imageAsset?._id,
                    },
                },
                userId: userProfile?._id,
                postedBy: {
                  _type: 'postedBy',
                  _ref: userProfile?._id,
                },
                category: category,
                highestPrice:0,
              };

            await fetch(`${BASE_URL}/api/hello`, {
                method: "POST",
                body: JSON.stringify(document)
            })
        }
        router.push('/main')
    }
  return (
    <div className='flex w-full h-full mb-10 absolute left-0 pt-10 absolute top-[60px] lg:top-[70px] bg-[#F8F8F8] justify-center'>
        <div className="bg-white rounded-lg xl:h-[80vh] lg:w-[80%] flex gap-6 flex-wrap lg:justify-between items-center p-14 pt-6">
        {/* Our video, image and title */}
            <div>
                <div>
                    <p className='text-2xl font-bold'>Đăng bài</p>
                    <p className='text-md text-gray-400 mt-1'>Cho đi là tình yêu</p>
                </div>
                <div className=' border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-5 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
                    {isLoading ? (
                        <p>Đang tải...</p>
                    ): (
                        <div>
                            {imageAsset ? (
                                <div>
                                    <img 
                                     src={imageAsset?.url}
                                     alt="uploaded-pic"
                                     className=' bg-black'
                                    />
                                </div>
                            ) : (
                                <label className="cursor-pointer">
                                    <div className='flex flex-col justify-center items-center  h-full'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='font-bold text-xl'>
                                                <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                                            </p>
                                            <p className='text-xl font-semibold'>
                                                Tải lên
                                            </p>
                                        </div>
                                        <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                            Gợi ý JPEG,PNG, SVG, GIFF...
                                        </p>
                                        <p className='bg-blue text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                            Chọn tệp
                                        </p>
                                    </div>
                                    <input 
                                        type="file"
                                        name="upload-video"
                                        onChange={(e) => uploadImage(e)}
                                        className="w-0 h-0"
                                    />
                                </label>
                            )}
                        </div>
                    )}
                    {isWrongFileType && (
                        <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[260px]'>
                         Làm ơn chọn tệp hình ảnh (JPEG hoặc PNG...)
                       </p>
                    )}
                </div>
            </div>
        {/* Our information about our post */}
            <div  className='flex flex-col gap-3 pb-10'>
                <label className='text-md font-medium '>Miêu tả</label>
                <input
                    type='text'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className='rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
                />
                <button onClick={() => getClassName()}>fast API</button>
                <p>{category}</p>
                {/* <label className='text-md font-msedium '>Mục</label> */}
                {/* <select
                    onChange={(e)=> setCategory(e.target.value)}
                    className='outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                >
                    {categories.map((item) => (
                        <option
                            key={item.name}
                            className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                            value={item.name}
                        >
                            {item.title}
                        </option>
                    ))}
                </select> */}
                <div className='flex gap-6 mt-10'>
                    <button
                        onClick={() => {}}
                        type='button'
                        className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                    >
                        BỎ
                    </button>
                    <button
                        onClick={saveImage}
                        type='button'
                        className='bg-blue text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                    >
                        ĐĂNG
                    </button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default GiveStuffs