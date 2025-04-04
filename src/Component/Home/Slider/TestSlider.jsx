import React from 'react'
import Slider from 'react-slick';

const sList = [
    {
        id: 1,
        sImg: "/assets/home/img6.png",
        sTitle: "Facilitator",
        sName: "- Ben Stokes",
        sText: "we pride ourselves on delivering top-notch auto repair services that our clients trust and recommend. Our customers consistently praise our team for its professionalism, transparency, and exceptional attention to detail. From routine maintenance to complex repairs,",
    },
    {
        id: 2,
        sImg: "/assets/home/img6.png",
        sTitle: "Facilitator",
        sName: "- Ben Stokes",
        sText: "we pride ourselves on delivering top-notch auto repair services that our clients trust and recommend. Our customers consistently praise our team for its professionalism, transparency, and exceptional attention to detail. From routine maintenance to complex repairs,",
    },
    {
        id: 3,
        sImg: "/assets/home/img6.png",
        sTitle: "Facilitator",
        sName: "- Ben Stokes",
        sText: "we pride ourselves on delivering top-notch auto repair services that our clients trust and recommend. Our customers consistently praise our team for its professionalism, transparency, and exceptional attention to detail. From routine maintenance to complex repairs,",
    },
    {
        id: 4,
        sImg: "/assets/home/img6.png",
        sTitle: "Facilitator",
        sName: "- Ben Stokes",
        sText: "we pride ourselves on delivering top-notch auto repair services that our clients trust and recommend. Our customers consistently praise our team for its professionalism, transparency, and exceptional attention to detail. From routine maintenance to complex repairs,",
    },
    {
        id: 5,
        sImg: "/assets/home/img6.png",
        sTitle: "Facilitator",
        sName: "- Ben Stokes",
        sText: "we pride ourselves on delivering top-notch auto repair services that our clients trust and recommend. Our customers consistently praise our team for its professionalism, transparency, and exceptional attention to detail. From routine maintenance to complex repairs,",
    },
    {
        id: 6,
        sImg: "/assets/home/img6.png",
        sTitle: "Facilitator",
        sName: "- Ben Stokes",
        sText: "we pride ourselves on delivering top-notch auto repair services that our clients trust and recommend. Our customers consistently praise our team for its professionalism, transparency, and exceptional attention to detail. From routine maintenance to complex repairs,",
    },
]



function TestSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <>
            <Slider {...settings}>
                {sList?.map((e) => {
                    return (
                        <div key={e?.id} className='md:pr-[20px] pr-0'>
                            <div className="border-[1px] border-[#DADADA] bg-[#FFFFFF] rounded-[4px] p-[41px]">
                                <div className="flex items-center md:pb-[66px] pb-[30px] justify-between">
                                    <img src={e?.sImg} alt="" />
                                    <img src="/assets/home/item6.svg" alt="" />
                                </div>
                                <p className="font-[400] font-satoshi text-[18px] leading-[30px] text-[#515151] md:pb-[66px] pb-[30px]">we pride ourselves on delivering top-
                                   {e?.sText}</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="mb-0 pb-[7px] font-satoshi font-[400] text-[20px] leading-[30px] text-[#0A0119] ">Facilitator</p>
                                        <h6 className="mb-0 font-[700] font-satoshi text-[26px] leading-[36px] text-[#0A0119]">- Ben Stokes</h6>
                                    </div>
                                    <img src="/assets/home/item7.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </>
    )
}

export default TestSlider