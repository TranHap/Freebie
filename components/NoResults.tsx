import React from 'react';
import { BiCommentX } from 'react-icons/bi';
import {HiEmojiSad} from 'react-icons/hi';

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        { text ==="No comment" ? <BiCommentX/> : <HiEmojiSad />}
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  );
};

export default NoResults;