import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <>
         <div className='md:px-0 px-[20px]'>
            <div className="flex items-center md:flex-row flex-col gap-[68px] md:pr-[80px] pr-0">
                <div className='max-w-[862px] w-full'>
                    <img src="/assets/login/signup.svg" alt="" />
                </div>
                <div className='max-w-[430px] w-full'>
                    <h6 className="font-[500] font-satoshi text-[30px] text-[#000000] pb-[26px] m-0">Sign up</h6>
                    <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0">If you already have an account register</p>
                    <p className="font-[400] font-satoshi text-[#515151] text-[16px] mb-0 pb-[52px]">You can  <Link to="/login" className='no-underline'><span className='font-[600] text-[#21A6E9]'>Login here !</span></Link></p>
                    <div className="flex flex-col gap-[42px]">
                        <div>
                            <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Email</label>
                            <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-[#000000]">
                                <img src="/assets/login/item1.svg" alt="" />
                                <input type="text" className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]' placeholder='Enter your email address' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Username</label>
                            <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-[#000000]">
                                <img src="/assets/login/item2.svg" alt="" />
                                <input type="text" className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]' placeholder='Enter your User name' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Role</label>
                            <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-[#000000]">
                                <img src="/assets/login/item2.svg" alt="" />
                                <select className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]' name="" id="">
                                    <option value="">Role</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Password</label>
                            <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-[#000000]">
                                <img src="/assets/login/item3.svg" alt="" />
                                <input type="password" className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]' placeholder='Enter your Password' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className='font-[500] font-satoshi text-[13px] text-[#000000] mb-0 pb-[13px]'>Confrim Password</label>
                            <div className="flex items-center gap-[10px] pb-[9px] border-b-[2px] border-[#000000]">
                                <img src="/assets/login/item3.svg" alt="" />
                                <input type="password" className='font-[400] outline-none w-full font-satoshi text-[16px] text-[#515151]' placeholder='Confrim your Password' />
                            </div>
                        </div>
                        <button className='bg-[#21A6E9] rounded-[32px] py-[14px] font-[500] font-satoshi text-[17px] text-[#FFFFFF]'>Register</button>
                    </div>
                </div>
            </div>
         </div>
        </>
    )
}

export default SignUp