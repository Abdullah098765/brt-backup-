import { useState } from 'react';
import Image from "next/image";
import profileimg from "../../../public/images/profile-1.jpeg";
import { FaReply, FaRegGrin, FaPaperPlane } from "react-icons/fa";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

const ProfileCommentContent = () => {
    const [isLike, setIsLike] = useState(false);
    const [isReply, setIsReply] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleLike = () => {
        setIsLike(!isLike)
    }

    const handleReply = () => {
        setIsReply(!isReply);
    }

    return (
       
            <div className={`w-[420px] h-auto bg-[#464E5B] card-border rounded-r-xl p-3 flex flex-col`}>
                <h1 className='text-left font-bold white-text text-lg mdl:text-xl flex space-x-2 
                py-4 border-b border-[#FFFFFF0D]'>
                    Comments <span className=''>(12)</span>
                </h1>
                <div className='flex space-x-2 items-center w-full card-border px-2 py-1'>
                    <div className='w-[50px] h-full pt-3'>
                        <div className='w-10 h-10 min-w-10 min-h-10 object-cover rounded-full'>
                            <Image
                                src={profileimg}
                                width={30}
                                height={30}
                                alt="img"
                                className='w-10 h-10 min-w-12 min-h-12 object-cover rounded-full'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col text-left ml-8'>
                        <h3 className='white-text mt-2 text-[15px] mdl:text-[18px] font-semibold'>
                            John Lee
                        </h3>
                        <p className='main-text text-[13px] mb-1'>
                            Coffee in the morning. They were making a statement. They said..
                        </p>
                        <p className='main-text text-[12px]'>2 minutes ago</p>
                    </div>
                </div>
                <div className='flex space-x-2 items-center w-full card-border px-2 py-1'>
                    <div className='w-[50px] h-full pt-3'>
                        <div className='w-10 h-10 min-w-10 min-h-10 object-cover rounded-full'>
                            <Image
                                src={profileimg}
                                width={30}
                                height={30}
                                alt="img"
                                className='w-10 h-10 min-w-12 min-h-12 object-cover rounded-full'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col text-left ml-8'>
                        <h3 className='white-text mt-2 text-[15px] mdl:text-[18px] font-semibold'>
                            John Lee
                        </h3>
                        <p className='main-text text-[13px] mb-1'>
                            Coffee in the morning. They were making a statement. They said..
                        </p>
                        <p className='main-text text-[12px] mb-1'>2 minutes ago</p>

                        <button onClick={handleReply} className='flex space-x-2 text-left items-center hover:brightness-125 mb-1'>
                            <FaReply className='yellow-text w-4 h-4' />

                            <p className='white-text text-[13px]'>
                                reply
                            </p>
                        </button>
                        {isReply && (
                            <div className="w-full h-auto min-h-28 card-bg rounded-lg">
                                <h4 className='text-[16px] white-text m-2'>
                                    Reply back
                                </h4>
                                <input
                                    className='input mt-2'
                                    placeholder='Reply to comment'
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <p className='white-text text-base m-2'>
                                    {replyText}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className=''>
                        {isLike ? (
                            <button onClick={handleLike} >
                                <BsFillHeartFill className='red-text w-5 h-5' />
                            </button>
                        ) : (
                            <button onClick={handleLike} >
                                <BsHeart className='white-text w-5 h-5' />
                            </button>
                        )}
                    </div>
                </div>
                <div className='flex space-x-2 items-center w-full card-border px-2 py-1'>
                    <div className='w-[50px] h-full pt-3'>
                        <div className='w-10 h-10 min-w-10 min-h-10 object-cover rounded-full'>
                            <Image
                                src={profileimg}
                                width={30}
                                height={30}
                                alt="img"
                                className='w-10 h-10 min-w-12 min-h-12 object-cover rounded-full'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col text-left ml-8'>
                        <h3 className='white-text mt-2 text-[15px] mdl:text-[18px] font-semibold'>
                            John Lee
                        </h3>
                        <p className='main-text text-[13px] mb-1'>
                            Coffee in the morning. They were making a statement. They said..
                        </p>
                        <p className='main-text text-[12px]'>2 minutes ago</p>

                        <button onClick={handleReply} className='flex space-x-2 text-left 
                        items-center hover:brightness-125 mb-1'>
                            <FaReply className='yellow-text w-4 h-4' />

                            <p className='white-text text-[13px]'>
                                reply
                            </p>
                        </button>
                        {isReply && (
                            <div className="w-full h-auto min-h-28 card-bg rounded-lg">
                                <h4 className='text-[16px] white-text m-2'>
                                    Reply back
                                </h4>
                                <input
                                    className='input mt-2'
                                    placeholder='Reply to comment'
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <p className='white-text text-base'>
                                    {replyText}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className=''>
                        {isLike ? (
                            <button onClick={handleLike} >
                                <BsFillHeartFill className='red-text w-5 h-5' />
                            </button>
                        ) : (
                            <button onClick={handleLike} >
                                <BsHeart className='white-text w-5 h-5' />
                            </button>
                        )}
                    </div>
                </div>
                <div className='relative w-full'>
                    <input className='mt-12 input !pl-6' placeholder="Add a comment" />
                    <button className='absolute left-0 top-[4rem] pl-1'>
                        <FaRegGrin className="w-8 w-8 white-text" />
                    </button>
                    <button className='absolute right-2 top-[4rem]'>
                        <FaPaperPlane className="w-8 w-8 white-text" />
                    </button>
                </div>
            </div>


      
    );
}

export default ProfileCommentContent;
