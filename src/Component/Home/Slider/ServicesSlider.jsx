import React from 'react'
import Slider from 'react-slick'
import img3 from '../../../Assets/home/img3.png'
import img4 from '../../../Assets/home/img4.png'
import img5 from '../../../Assets/home/img5.png'
import snormal from '../../../Assets/home/s-normal.svg'



const sList = [
    {
        id: 1,
        sImg: {img3},
        sTitle: "Legal",
        sText: "Advocate support is provided for claim settlements.",
    },
    {
        id: 2,
        sImg: {img4},
        sTitle: "Cranes",
        sText: "Efficient vehicle extraction at the accident spot.",
    },
    {
        id: 3,
        sImg: {img5},
        sTitle: "On-spot Repair",
        sText: "Immediate minor fixes for your vehicle.",
    },
    {
        id: 4,
        sImg: {img3},
        sTitle: "Legal",
        sText: "Advocate support is provided for claim settlements.",
    },
    {
        id: 5,
        sImg: {img4},
        sTitle: "Cranes",
        sText: "Efficient vehicle extraction at the accident spot.",
    },
    {
        id: 6,
        sImg: {img5},
        sTitle: "On-spot Repair",
        sText: "Immediate minor fixes for your vehicle.",
    },
]

const PrevArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute prev-arrow left-[-14px] z-10 top-1/2 transform -translate-y-1/2 "
        >
            <img src="/assets/home/s-normal.svg" className='arrow-icon' alt="" />
        </button>
    );
};

// Custom Next Arrow
const NextArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute next-arrow right-[-14px] z-10 top-1/2 transform -translate-y-1/2"
        >
            <img src={snormal} className='arrow-icon' alt="" />
        </button>
    );
};

function ServicesSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
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
                        <div key={e?.id} className='md:px-[15px] px-[15px]'>
                            <div className="rounded-[16px] services-card">
                                <img src={e?.sImg} className='w-full' alt="" />
                                <div className="services-content">
                                    <div className="flex items-center pb-[3px] justify-between">
                                        <h6 className="s-title">{e?.sTitle}</h6>
                                        <img src="/assets/home/Link.svg" alt="" />
                                    </div>
                                    <p className="s-text">{e?.sText}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </>
    )
}

export default ServicesSlider