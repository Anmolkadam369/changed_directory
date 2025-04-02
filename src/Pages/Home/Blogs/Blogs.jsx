import { React, useRef, useEffect, useState } from 'react';
import trucksImage2 from '../../../Assets/trucksImage3.jpg';
import trucksImage4 from '../../../Assets/trucksImage6.png';
import './Blogs.css'
import Footer from '../Footer';
import Header from '../Header';

function Blogs() {
    const [article1, setArticle1] = useState(true);
    const [article2, setArticle2] = useState(false);
    const [article3, setArticle3] = useState(false);
    const article3Ref = useRef(null);

    const setArticle1Func = () => {
        setArticle1(true);
        setArticle2(false);
        setArticle3(false);
    }
    const setArticle2Func = () => {
        setArticle1(false);
        setArticle2(true);
        setArticle3(false);
    }
    const setArticle3Func = () => {
        setArticle1(false);
        setArticle2(false);
        setArticle3(true);

    }
    useEffect(() => {
        if (article3 && article3Ref.current) {
            const element = document.getElementById('target-section');
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [article3]); // Effect runs when `article3` state changes


    return (
        <div>
            <Header />
            <main className="container" style={{ margin:"20px", marginTop: "20px", background:"#c0b6b6" }}>
                <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 fst-italic">Blogs For Enhancing Your Experience</h1>
                        <p className="lead my-3">Popular truck blog in India. Check out the best detailed blog information about new trucks, popular trucks and the latest truck launches blog updated.</p>
                        {/* <p className="lead mb-0"><a href="#" className="text-white fw-bold">Continue reading...</a></p> */}
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" style={{background:"#ffffff7a"}}>
                            <div className="col p-4 d-flex flex-column position-static" >
                                <strong className="d-inline-block mb-2 text-primary">Article 1</strong>
                                {/* <h3 className="mb-0">Featured post</h3> */}
                                <p className="card-text mb-auto" style={{ fontSize: "20px" }}>The Benefits of Buying Used Trucks in India</p>
                                <div className="mb-1 text-muted">September 23, 2024</div>
                                <a
                                    onClick={setArticle2Func}
                                    style={{ color: "blue", textDecoration: "underline" }}
                                    className="stretched-link"
                                >
                                    Continue reading
                                </a>
                            </div>
                            <div className="col-auto d-none d-lg-block" style={{ height: "100px" }}>
                                {/* <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                                <img
                                    src={trucksImage2} // Corrected line
                                    className="bd-placeholder-img"
                                    width="200"
                                    height="250"
                                    xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"
                                />
                                <rect width="100%" height="90%" fill="#777" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"  style={{background:"#ffffff7a"}}>
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-success">Article 2</strong>
                                {/* <h3 className="mb-0">Post title</h3> */}
                                <p className="mb-auto" style={{ fontSize: "20px" }}>Top Fuel-Efficient Trucks in India</p>
                                <div className="mb-1 text-muted">September 24, 2024</div>
                                <a onClick={setArticle3Func} style={{ color: "blue", textDecoration: "underline" }} className="stretched-link">Continue reading</a>
                            </div>
                            <div className="col-auto d-none d-lg-block" style={{ height: "100px" }}>
                                {/* <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                                <img
                                    src={trucksImage4} // Corrected line
                                    className="bd-placeholder-img"
                                    width="200"
                                    height="250"
                                    xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"
                                />
                                <rect width="100%" height="90%" fill="#777" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-5">
                    <div className="col-md-8">
                        <h3 className="pb-4 mb-4 fst-italic border-bottom" style={{ fontSize: "20px" }}>From the Firehose</h3>

                        {article1 && (
                            <article className="blog-post" style={{ padding: '20px', lineHeight: '1.6', color: '#333', fontFamily: 'Arial, sans-serif' }}>
                                <h2 className="blog-post-title" style={{ marginBottom: '20px', fontSize: '2rem', color: '#007bff' }}>
                                    Top 5 Trucks Under 10 Lakh in India
                                </h2>
                                <p className="blog-post-meta" style={{ marginBottom: '15px', fontStyle: 'italic', color: '#6c757d' }}>
                                    September 24, 2024 by <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>Trucker</a>
                                </p>
                                <p style={{ marginBottom: '20px' }}>
                                    In India, the trucking industry is booming, with many options available for both personal and commercial use. If you're looking for a reliable truck under 10 lakh, this article will guide you through some of the best options available in the market today.
                                </p>
                                <hr style={{ margin: '20px 0', border: '1px solid #ddd' }} />

                                <h3 style={{ marginTop: '20px', fontSize: '1.5rem', color: '#007bff' }}>1. Tata Ace Gold</h3>
                                <p style={{ marginBottom: '15px' }}>
                                    The Tata Ace Gold is a popular choice among small business owners. It offers a robust build and impressive load-carrying capacity, making it ideal for urban transport.
                                </p>
                                <blockquote className="blockquote" style={{ borderLeft: '4px solid #007bff', padding: '10px 20px', marginBottom: '15px', backgroundColor: '#f9f9f9' }}>
                                    <p style={{ fontStyle: 'italic', margin: '0' }}>“The Tata Ace Gold is not just a truck; it's a reliable partner for your business.”</p>
                                </blockquote>
                                <p style={{ marginBottom: '20px' }}>
                                    With a payload capacity of up to 1 ton and a mileage of approximately 20 km/l, this truck is designed for efficiency.
                                </p>

                                <h3 style={{ marginTop: '20px', fontSize: '1.5rem', color: '#007bff' }}>2. Mahindra Bolero Pik-Up</h3>
                                <p style={{ marginBottom: '15px' }}>
                                    The Mahindra Bolero Pik-Up is known for its strong performance and durability. This truck is equipped with a powerful engine and offers a comfortable cabin for long hauls.
                                </p>
                                <ul style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                                    <li><strong>Payload Capacity:</strong> Up to 1.5 tons</li>
                                    <li><strong>Mileage:</strong> Around 15 km/l</li>
                                    <li><strong>Engine:</strong> 2523 cc diesel engine</li>
                                </ul>
                                <p style={{ marginBottom: '20px' }}>
                                    Its rugged design ensures it can handle tough terrains with ease.
                                </p>

                                <h3 style={{ marginTop: '20px', fontSize: '1.5rem', color: '#007bff' }}>3. Ashok Leyland Dost</h3>
                                <p style={{ marginBottom: '15px' }}>
                                    Ashok Leyland's Dost is another great option for small businesses. With a payload capacity of 1.5 tons, it is built for efficiency and reliability.
                                </p>
                                <ol style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                                    <li>Robust design with excellent load capacity.</li>
                                    <li>Good fuel efficiency of about 18 km/l.</li>
                                    <li>Comfortable driving experience.</li>
                                </ol>
                                <p style={{ marginBottom: '20px' }}>
                                    This truck is an excellent choice for those looking for value for money.
                                </p>

                                <h3 style={{ marginTop: '20px', fontSize: '1.5rem', color: '#007bff' }}>4. Isuzu D-Max V-Cross</h3>
                                <p style={{ marginBottom: '15px' }}>
                                    The Isuzu D-Max V-Cross stands out with its stylish design and powerful performance. It's perfect for both urban driving and off-road adventures.
                                </p>
                                <dl style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                                    <dt style={{ fontWeight: 'bold' }}>Engine:</dt>
                                    <dd>2499 cc diesel engine with 4WD option.</dd>
                                    <dt style={{ fontWeight: 'bold' }}>Payload:</dt>
                                    <dd>Up to 1 ton.</dd>
                                    <dt style={{ fontWeight: 'bold' }}>Mileage:</dt>
                                    <dd>Approximately 14 km/l.</dd>
                                </dl>
                                <p style={{ marginBottom: '20px' }}>
                                    The D-Max V-Cross combines style with functionality, making it a great option for lifestyle and utility purposes.
                                </p>

                                <h3 style={{ marginTop: '20px', fontSize: '1.5rem', color: '#007bff' }}>5. Ford Ranger</h3>
                                <p style={{ marginBottom: '15px' }}>
                                    Last but not least, the Ford Ranger is a highly capable truck that offers advanced technology and comfort.
                                </p>
                                <ul style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'disc' }}>
                                    <li>Engine: 1996 cc diesel engine.</li>
                                    <li>Payload Capacity: 1 ton.</li>
                                    <li>Mileage: Around 15 km/l.</li>
                                </ul>
                                <p style={{ marginBottom: '20px' }}>
                                    With its impressive features, the Ford Ranger is designed to meet the needs of modern drivers.
                                </p>

                                <h2 style={{ marginTop: '30px', fontSize: '2rem', color: '#007bff' }}>Conclusion</h2>
                                <p style={{ marginBottom: '20px' }}>
                                    Choosing the right truck under 10 lakh can significantly impact your business operations. Whether you need a small truck for urban deliveries or a robust vehicle for rough terrains, the options listed above provide excellent performance, reliability, and value for money.
                                </p>
                                <p style={{ marginBottom: '20px' }}>
                                    For more information on trucks and to explore additional models, check out the <a href="https://trucks.tractorjunction.com/" style={{ color: '#007bff', textDecoration: 'none' }}>Tractor Junction</a> website.
                                </p>
                            </article>
                        )}


                        {article2 && (
                            <article className="blog-post" style={{ maxWidth: '750px', margin: '0 auto', padding: '20px', fontFamily: 'Roboto, sans-serif', backgroundColor: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <h2 className="blog-post-title" style={{ marginBottom: '20px', fontSize: '2rem', color: '#2c3e50' }}>The Benefits of Buying Used Trucks in India</h2>
                                <p className="blog-post-meta" style={{ marginBottom: '15px', fontStyle: 'italic', fontSize: '1rem', color: '#7f8c8d' }}>September 24, 2024 by <a href="#" style={{ color: '#2980b9', textDecoration: 'none' }}>Truck Experts</a></p>
                                <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>Buying a used truck in India has become a smart choice for many transport business owners. With the rising cost of new trucks, opting for a used truck can provide both value and reliability, especially for small to medium enterprises looking to expand their fleet without breaking the bank.</p>
                                <hr style={{ margin: '20px 0', border: '0', height: '1px', background: '#ddd' }} />
                                <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>When considering a used truck, several key factors make it a practical investment. This article explores the primary benefits of purchasing a pre-owned vehicle, from cost savings to a wide range of choices in the market.</p>
                                <hr style={{ margin: '20px 0', border: '0', height: '1px', background: '#ddd' }} />
                                <h2 style={{ fontSize: '2rem', color: '#e74c3c', marginBottom: '20px' }}>Cost-Effectiveness</h2>
                                <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>One of the most significant advantages of buying a used truck is the lower initial cost. Used trucks come at a fraction of the price of a new one, making it easier for businesses to grow their fleet without the heavy financial burden. This is especially important for startups and small logistics companies.</p>
                                <h3 style={{ fontSize: '1.5rem', color: '#3498db', marginBottom: '15px' }}>Lower Depreciation</h3>
                                <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>New vehicles lose value rapidly in the first few years. In contrast, used trucks have already undergone the steepest part of depreciation, meaning the resale value remains more stable. Buying a used truck allows you to retain more of its value when it's time to sell or upgrade.</p>
                                <h3 style={{ fontSize: '1.5rem', color: '#3498db', marginBottom: '15px' }}>Wide Range of Options</h3>
                                <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>The used truck market offers a broad selection of makes and models, enabling buyers to choose the truck that best fits their needs, whether it’s a light, medium, or heavy-duty vehicle. You can often find well-maintained trucks with relatively low mileage.</p>
                                <blockquote className="blockquote" style={{ fontStyle: 'italic', backgroundColor: '#ecf0f1', borderLeft: '5px solid #3498db', padding: '10px 20px', margin: '20px 0', fontSize: '1.2rem', color: '#2c3e50' }}>
                                    <p>"Purchasing a used truck can reduce your upfront costs and provide a high return on investment over time." — Truck Junction</p>
                                </blockquote>
                                <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>Aside from this, there is a thriving network of used truck dealers in India, offering a variety of financing and warranty options for second-hand vehicles.</p>
                                <h2 style={{ fontSize: '2rem', color: '#e74c3c', marginBottom: '20px' }}>Lower Insurance Premiums</h2>
                                <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>Used trucks often have lower insurance premiums compared to new ones. Since the value of a used truck is lower, the cost to insure it is significantly reduced, which helps owners save on operational expenses in the long run.</p>
                                <h3 style={{ fontSize: '1.5rem', color: '#3498db', marginBottom: '15px' }}>Less Financial Risk</h3>
                                <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>With new trucks, the financial commitment is substantial. However, by purchasing used trucks, you minimize the financial risk while still gaining access to dependable and robust vehicles for your business needs.</p>
                                <h2 style={{ fontSize: '2rem', color: '#e74c3c', marginBottom: '20px' }}>Environmental Benefits</h2>
                                <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>Buying a used truck is also an environmentally friendly option. By extending the life of a vehicle, you help reduce the demand for new manufacturing, which in turn conserves resources and decreases the environmental impact associated with producing new trucks.</p>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                                    <li style={{ marginBottom: '10px', fontSize: '1.1rem', color: '#34495e' }}><strong style={{ color: '#e74c3c' }}>Reduced waste</strong> — By using trucks longer, you contribute less to the waste generated by scrapped vehicles.</li>
                                    <li style={{ marginBottom: '10px', fontSize: '1.1rem', color: '#34495e' }}><strong style={{ color: '#e74c3c' }}>Less energy usage</strong> — The production of a new truck consumes a significant amount of energy. Opting for a used truck helps conserve this energy.</li>
                                </ul>
                                <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#34495e' }}>In conclusion, buying a used truck in India presents a range of benefits. From cost savings and lower depreciation to environmental considerations, it’s a practical choice for many businesses. Whether you need a heavy-duty truck for long hauls or a light truck for city deliveries, the used truck market offers something for everyone.</p>
                            </article>

                        )}

                        {article3 && (
                            <article className="blog-post" style={{ padding: '20px', lineHeight: '1.8', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
                                <h2 className="blog-post-title" style={{ color: '#2c3e50', fontSize: '2em', marginBottom: '10px' }}>Top Fuel-Efficient Trucks in India</h2>
                                <p className="blog-post-meta" style={{ fontSize: '0.9em', color: '#7f8c8d' }}>September 24, 2024 by <a href="#" style={{ color: '#2980b9', textDecoration: 'none' }}>Your Name</a></p>
                                <p style={{ marginBottom: '20px' }}>As fuel prices rise, the demand for fuel-efficient trucks in India has surged. Businesses are increasingly focusing on vehicles that not only reduce operational costs but also contribute to environmental sustainability. Here, we delve into the top four fuel-efficient trucks that excel in performance and economy.</p>
                                <hr style={{ border: 'none', borderTop: '1px solid #ecf0f1', marginBottom: '20px' }} />

                                <h2 style={{ color: '#e74c3c', fontSize: '1.75em', marginBottom: '10px' }}>1. Tata Ace Gold</h2>
                                <p style={{ marginBottom: '15px' }}>The Tata Ace Gold is a market leader known for its impressive fuel efficiency. With a payload capacity of up to 1 ton, it is perfect for urban deliveries. The vehicle features a 702cc engine, delivering excellent mileage without sacrificing power. Its compact design allows for easy navigation in congested areas, making it ideal for small businesses.</p>
                                <p style={{ marginBottom: '15px' }}>Furthermore, the Tata Ace Gold has a strong network of service centers across India, ensuring minimal downtime for repairs or maintenance. This, combined with its low fuel consumption, makes it a smart investment for entrepreneurs looking to maximize productivity.</p>

                                <h2 style={{ color: '#e74c3c', fontSize: '1.75em', marginBottom: '10px' }}>2. Mahindra Bolero Pik-Up</h2>
                                <p style={{ marginBottom: '15px' }}>Combining power and fuel efficiency, the Mahindra Bolero Pik-Up is built for both city and rural environments. With a 2.5-liter engine, it offers robust performance and exceptional mileage. The vehicle's sturdy build and reliable suspension ensure that it can handle tough terrains while remaining cost-effective on fuel, making it a favorite among farmers and small transporters.</p>
                                <p style={{ marginBottom: '15px' }}>The Mahindra Bolero Pik-Up also boasts a durable chassis and a large cargo area, which enables higher load capacity without compromising fuel efficiency. Its easy availability and affordable maintenance make it an ideal choice for commercial operations.</p>

                                <h2 style={{ color: '#e74c3c', fontSize: '1.75em', marginBottom: '10px' }}>3. Eicher Pro 1110XP</h2>
                                <p style={{ marginBottom: '15px' }}>The Eicher Pro 1110XP stands out due to its advanced fuel injection technology, which enhances mileage and reduces emissions. This truck features a powerful 3.3-liter engine with a payload capacity of 5 tons, making it suitable for medium-haul logistics. Its comfortable cabin and ergonomic design ensure driver comfort during long trips, further enhancing its appeal.</p>
                                <p style={{ marginBottom: '15px' }}>In addition, the Eicher Pro 1110XP comes equipped with modern telematics, allowing fleet owners to track vehicle performance in real-time. This helps in optimizing fuel consumption and improving overall operational efficiency, which is crucial for long-distance hauls.</p>

                                <h2 style={{ color: '#e74c3c', fontSize: '1.75em', marginBottom: '10px' }}>4. Ashok Leyland Dost+</h2>
                                <p style={{ marginBottom: '15px' }}>The Ashok Leyland Dost+ is engineered for superior performance and fuel efficiency. It is equipped with a 1.5-liter engine that balances power and mileage, achieving an impressive fuel economy. The Dost+ offers a payload capacity of 1.5 tons and features a spacious cabin, making it an excellent choice for transporting goods across varied terrains.</p>
                                <p style={{ marginBottom: '15px' }}>The Dost+ is particularly appreciated for its smooth driving experience and reliability. Its affordable price and excellent fuel economy make it a favorite among small businesses and local transporters who need a dependable truck for frequent short-distance trips.</p>

                                <h3 style={{ fontSize: '1.5em', marginBottom: '10px', color: '#16a085' }}>Why Choose Fuel-Efficient Trucks?</h3>
                                <p style={{ marginBottom: '15px' }}>Fuel-efficient trucks provide several benefits for businesses, including:</p>
                                <ul style={{ marginBottom: '20px', paddingLeft: '20px', listStyleType: 'circle' }}>
                                    <li><strong>Cost Savings:</strong> Reduced fuel consumption translates to lower operating costs, allowing for better profit margins.</li>
                                    <li><strong>Environmental Impact:</strong> Choosing fuel-efficient vehicles contributes to lower emissions, helping to combat climate change.</li>
                                    <li><strong>Improved Range:</strong> Higher mileage means longer trips can be made without frequent refueling, enhancing productivity.</li>
                                    <li><strong>Long-Term Value:</strong> Vehicles that consume less fuel often have better resale value due to their cost-effectiveness and lower carbon footprint.</li>
                                </ul>

                                <h3 style={{ fontSize: '1.5em', marginBottom: '10px', color: '#16a085' }}>Conclusion</h3>
                                <p style={{ marginBottom: '15px' }}>Investing in a fuel-efficient truck is essential for modern businesses looking to thrive in a competitive market. The Tata Ace Gold, Mahindra Bolero Pik-Up, Eicher Pro 1110XP, and Ashok Leyland Dost+ represent the ultimate choices for those prioritizing performance and economy. By making informed decisions, businesses can ensure sustainability while maximizing operational efficiency.</p>
                                <p style={{ marginBottom: '15px' }}>When selecting a truck, consider factors such as fuel efficiency, payload capacity, and long-term maintenance costs. These trucks offer a winning combination of affordability, reliability, and eco-friendliness, ensuring your business remains competitive in today’s cost-conscious environment.</p>
                            </article>

                        )}



                    </div>
                    <aside className="col-md-4" >
                        <div className="position-sticky" style={{ top: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '0.25rem' }}>
                            <h4 className="fst-italic" style={{ color: '#007bff', marginBottom: '0.5rem' }}>About</h4>
                            <p className="mb-4" style={{ marginBottom: '1rem', color: '#495057' }}>This blog is a place to share thoughts. Here are other blogs for you!</p>

                            <h4 className="fst-italic" style={{ color: '#007bff', marginBottom: '0.5rem' }}>Best For You</h4>
                            <ol className="list-unstyled" style={{ paddingLeft: '0', marginBottom: '1rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <a href="https://trucks.tractorjunction.com/blog/best-heavy-duty-truck-for-indian-roads/" style={{ color: '#007bff', textDecoration: 'none' }}>5 Best Truck Under 10 Lakh in India 2024: Price & Specification</a>
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <a href="https://trucks.tractorjunction.com/blog/used-truck-financing-the-ultimate-guide-for-buyers/" style={{ color: '#007bff', textDecoration: 'none' }}>Tips to Choose the Best Heavy Duty Truck for Indian Roads</a>
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <a href="https://trucks.tractorjunction.com/blog/top-10-safety-tips-for-truck-drivers-during-monsoon-in-india/" style={{ color: '#007bff', textDecoration: 'none' }}>Top 10 Safety Tips For Truck Drivers During Monsoon In India</a>
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <a href="https://trucks.tractorjunction.com/blog/popular-22-wheeler-truck-in-india/" style={{ color: '#007bff', textDecoration: 'none' }}>Top 5 Heavy Duty 16 Wheeler Truck Models in India</a>
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <a href="https://trucks.tractorjunction.com/blog/best-selling-8-wheeler-truck-in-india/" style={{ color: '#007bff', textDecoration: 'none' }}>Best Selling 8 Wheeler Truck in India: Latest Price & Features</a>
                                </li>
                            </ol>
                        </div>

                    </aside>
                </div>
            </main>
            <Footer />

        </div>
    );
}

export default Blogs;
