import React, { useState, Dispatch, SetStateAction} from 'react'
import { NextPage } from 'next';

interface IProps {
  clickReceive: () => void,
  showForm: boolean,
  setShowForm: Dispatch<SetStateAction<boolean>>;
  handleReceive: () => void,
  name:string,
  setName:Dispatch<SetStateAction<string>>,
  address:string,
  setAddress:Dispatch<SetStateAction<string>>
  phoneNumber: string,
  setPhoneNumber:Dispatch<SetStateAction<string>>,
  isReceived:boolean,
}
const ReceiveButton : NextPage<IProps> = ({clickReceive, handleReceive,showForm, setShowForm, name, setName, address, setAddress, phoneNumber, setPhoneNumber, isReceived }) => {
  return (
    <div>
           <button
              onClick={clickReceive}
              className={`${isReceived ? 'bg-slate-300': 'bg-[#F51997]' } w-full p-3 rounded-full text-white font-bold`}
            >
                {isReceived ? "The item has been received" : "I WANT TO RECEIVE THIS"}
            </button>
            {showForm &&  
              <>
              <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm '>
                <div className ='flex flex-col bg-white p-3 rounded-lg'>   
                  <div className='m-3'>
                      <p className='mb-2 text-xl font-bold'>Name</p>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Your Name'
                        className='p-3 border-2  border-slate-200 w-[800px]'
                        required
                      />
                  </div>
                  <div className='m-3'>
                      <p className='mb-2 text-xl font-bold'>Address</p>
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Your Address'
                        className='p-3 border-2  border-slate-200 w-[800px]'
                        required
                      />
                  </div>
                  <div className='m-3'>
                      <p className='mb-2 text-xl font-bold'>Phone number</p>
                      <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder='Your phone number'
                        className='p-3 border-2  border-slate-200 w-[800px]'
                        required
                  />
                  </div>
                  <div className='m-3 flex justify-between '>
                    <button
                      className='bg-white border-2 border-slate-200 p-3'
                      onClick={() => setShowForm(false)}
                      >Discard
                    </button>
                    <button
                      className='bg-[#D71313] border-2 border-slate-200 p-3 text-white'
                      onClick={() => handleReceive()} 
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

export default ReceiveButton