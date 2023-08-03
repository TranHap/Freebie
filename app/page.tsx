import React from 'react';
import Image from 'next/image';
import Logo from '../utils/logo.png';
import Background from '../utils/backgroundImage.jpg';


const Home = async () => {

  return (
    <div className='flex flex-wrap  lg:flex-nowrap gap-5 justify-center items-center h-full'>
        <div className='flex flex-col justify-start items-start gap-5'>
          <div className='w-[150px] md:w-[179px]'>
            <Image
                className='cursor-pointer'
                src={Logo}
                alt='logo'
                layout='responsive'
            />
          </div>
          <div className='text-5xl'>
            Best place for give and take
          </div>
          <div className='text-2xl text-blue'>
            Nơi trao đổi và cho đi các sản phẩm cũ nhằm thúc đẩy tính sẻ chia ở cộng đồng,
            hướng đến một lối sống bền vững trong thời đại kỹ thuật số.
          </div>
        </div>
      <div>
        <div className='lg:w-[500px] md:w-[450px] w-full p-3 flex justify-center items-center'>
          <Image
                className='cursor-pointer'
                src={Background}
                alt='logo'
                layout='responsive'
            />
        </div>
      </div>
    </div>
  )
}


export default Home