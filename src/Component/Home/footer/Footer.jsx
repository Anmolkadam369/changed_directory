import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../Assets/footer/logo.svg'
import Fb from '../../../Assets/footer/Fb.svg'
import Insta from '../../../Assets/footer/Insta.svg'
import LinkedIn from '../../../Assets/footer/LinkedIn.svg'
import Youtube from '../../../Assets/footer/Youtube.svg'
import right from '../../../Assets/footer/right.svg'


function Footer() {
    return (
        <>
            <footer className='flex gap-[70px] md:flex-row justify-center flex-col pt-[47px] md:px-[80px] px-[20px] md:pb-[70px] pb-[40px] bg-white'>
                <div className="max-w-[744px] w-full">
                <div className="flex md:justify-start justify-center">
                    <img src={logo} className='h-[100px] w-[100px]' alt="" />
                </div>
                    <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-[20px] pt-[40px]">
                        <div>
                            <h6 className="font-[700] font-satoshi md:text-start text-center text-[20px] mb-0 pb-[20px] leading-[24px] uppercase text-[#1B2E3F]">Quick Links</h6>
                            <div className="flex flex-col md:items-start items-center gap-[20px]">
                                <Link className='font-[400] font-satoshi text-[16px] leading-[20px] text-[#000000] no-underline' to="/">
                                    Home
                                </Link>
                                <Link className='font-[400] font-satoshi text-[16px] leading-[20px] text-[#000000] no-underline' to="/">
                                    About us
                                </Link>
                                <Link className='font-[400] font-satoshi text-[16px] leading-[20px] text-[#000000] no-underline' to="/crane-service">
                                    Services
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h6 className="font-[700] font-satoshi md:text-start text-center text-[20px] mb-0 pb-[20px] leading-[24px] uppercase text-[#1B2E3F]">Links</h6>
                            <div className="flex flex-col md:items-start items-center gap-[20px]">
                                <Link className='font-[400] font-satoshi text-[16px] leading-[20px] text-[#000000] no-underline' to="/">
                                    Scrap
                                </Link>
                                <Link className='font-[400] font-satoshi text-[16px] leading-[20px] text-[#000000] no-underline' to="/">
                                    Blog
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h6 className="font-[700] md:text-start text-center font-satoshi text-[20px] mb-0 pb-[20px] leading-[24px] uppercase text-[#1B2E3F]">COntact Us</h6>
                            <div className="flex flex-col md:items-start items-center gap-[20px]">
                                <p className='font-[400] font-satoshi text-[16px] leading-[20px] text-[#000000] mb-0' >
                                    +91 7800 784700
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr className='bg-[#00000033] my-[36px]' />
                    <div className="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-[20px]">
                        <p className='font-[400] font-satoshi text-[20px] leading-[32px] text-[#0A0119] mb-0' >
                            2025 © claim pro assist
                        </p>
                        <div className="flex items-center gap-[8px]">
                            <Link to="/">
                                <img src={Fb} alt="" />
                            </Link>
                            <Link to="/">
                                <img src={Insta} alt="" />
                            </Link>
                            <Link to="/">
                                <img src={LinkedIn} alt="" />
                            </Link>
                            <Link to="/">
                                <img src={Youtube} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="max-w-[496px] w-full bg-[#21A6E9] rounded-[10px] py-[46px] md:px-[56px] px-[20px]">
                    <h6 className="text-center mb-0 font-[500] font-satoshi md:text-[31px] text-[24px] md:leading-[52.4px] leading-[30px] text-[#FFFFFF] pb-[25px]">Why not choose the BVC ClaimPro Assist?</h6>
                    <p className="mb-0 font-[400] font-satoshi md:text-[20px] text-[16px] md:leading-[30px] leading-[20px] text-center text-[#FFFFFF] pb-[46px]">Join our extended family and experience hassle-free, professional assistance during unwelcomed vehicle accidents.</p>
                    <div className="bg-[#21A6E9] border-[1px] border-[#FFFFFF] flex py-[5px] items-center justify-between rounded-full pr-[6px] pl-[26px] max-w-[180px] mx-auto w-full">
                        <button className="font-satoshi font-[400] text-[18px] leading-[33.6px] pr-[20px] text-[#FFFFFF]">Join Now</button>
                        <img src={right} alt="" />
                    </div>
                </div>
            </footer >
        </>
    )
}

export default Footer