import React, {Dispatch, SetStateAction} from 'react'
import { NextPage } from 'next';
import { BASE_URL } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
    price: number,
    setPrice: Dispatch<SetStateAction<number>>,
    showForm: boolean,
    setShowForm: Dispatch<SetStateAction<boolean>>,
    handleAuction: () => void,
    highestPrice: number,
    setHighestPrice: Dispatch<SetStateAction<number>>,
    userProfile: any,
    postId: string,
    setHighestAuctioneer: any,
    highestAuctioneer : any,
  }

const AuctionButton : NextPage<IProps> = ({postId,  highestAuctioneer , setHighestAuctioneer, price, setPrice, showForm, setShowForm, handleAuction, highestPrice, setHighestPrice, userProfile}) => {
  const handlePriceChange = async (e: any) => {
    const newPrice = parseFloat(e.target.value); 
    setPrice(newPrice); 
    if(newPrice > highestPrice){
      setHighestPrice(newPrice)
      const response = await fetch(`${BASE_URL}/api/highestAuctioneer`, {
        method: "PUT",
        body: JSON.stringify({
          userId : userProfile._id,
          postId: postId
        })
      })
    }
  };
  return (
    <div>
      <div className='flex justify-between items-center'>
        <button
              className='bg-[#117b58] p-3 rounded-sm text-white font-bold'
              onClick={() => setShowForm(true)}
            >
                Đấu giá
        </button>
        <div className='flex flex-col justify-center items-center px-10 font-semibold text-xl'>
              <div>Giá Cao Nhất Hiện Tại</div> 
              <div>{highestPrice}</div>
        </div>
        {/* <div>
          <Link href={`/profile/${highestAuctioneer?._id}`}>
              <Image
                alt="Hello"
                width={60}
                height={60}
                className='rounded-full'
                src={highestAuctioneer?.image}
              />
              {highestAuctioneer?.userName}
          </Link>
        </div> */}
      </div>
        {showForm &&  
            <>
              <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm '>
                <div className ='flex flex-col bg-white p-3 rounded-lg'> 
                    <div className='m-3'>
                        <p className='mb-2 text-xl font-bold'>Price</p>
                        <input
                            value={price}
                            type='number'
                            onChange={(e) => handlePriceChange(e)}
                            placeholder='Choose your auction price. Ex: 120.000'
                            className='p-3 border-2  border-slate-200 lg:w-[500px] w-3/4'
                            required
                        />
                    </div>
                    <div className='m-3 flex justify-between '>
                        <button
                            className='bg-white border-2 border-slate-200 p-3'
                            onClick={() => setShowForm(false)}
                        >
                                Discard
                        </button>
                        <button
                            className='bg-red border-2 border-slate-200 p-3 text-white font-semibold'
                            onClick={() => handleAuction()} 
                            type='submit'
                        >
                            Post
                        </button>
                    </div>
                </div>
              </div>
            </>
        }
    </div>
  )
}

export default AuctionButton