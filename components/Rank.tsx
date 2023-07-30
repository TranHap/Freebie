'use client'
import React, {useEffect} from 'react'
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '@/store/authStore';
import { IUser } from '@/types';

interface IProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}

const Rank = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-2xl font-bold m-3 mt-4 hidden xl:block'>
        Bảng tuyên dương
      </p>
      <div className='flex justify-between items-center mx-8 my-4 xl:border-b-2 border-gray-200'>
        <div className='text-gray-300 text-xl font-bold hidden xl:block'>Người sống xanh</div>
        <div className='text-gray-300 text-xl font-bold hidden xl:block'>Điểm</div>
      </div>
        <div>
          {allUsers?.map((user: IUser) => (
            <div className='flex justify-between items-center mx-8 my-4'>
              <div>
                <Link href={`/profile/${user._id}`} key={user._id}>
                    <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                      <div className='w-8 h-8'>
                        <Image
                          width={34}
                          height={34}
                          className='rounded-full'
                          src={user.image}
                          alt='user-profile'
                          layout='responsive'
                        />
                      </div>

                      <div className='hidden xl:block'>
                        <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                          {user.userName.replace(/\s+/g, '')}{' '}
                          <GoVerified className='text-blue-400' />
                        </p>
                        <p className='capitalize text-gray-400 text-xs'>
                          {user.userName}
                        </p>
                      </div>
                    </div>
                </Link>
              </div>
              <div>
                {user.score}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Rank