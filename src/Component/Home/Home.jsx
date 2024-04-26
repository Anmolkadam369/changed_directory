import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import trucks1 from '../../Assets/trucks1.jpg';
import trucks2 from '../../Assets/trucks2.jpg';


function Home() {
    const navigate = useNavigate();

    function navigateToVehiclePage() {
        console.log("SOMe");
        navigate('./LoginPage');
    }

    return (
        <div className="home-elem-19">
            <div className="home-elem-14">
                <div className="home-elem-13">
                    <div className="home-elem-195"></div>
                    <div className="home-elem-15">
                        <span className="home-elem-18">
                            <p>Claim Pro Assist </p>
                        </span>
                    </div>
                    <div className="home-elem-16">
                        <div className="home-elem-12">
                            <span className="home-elem-8">
                                <a href="home.html" className="link" target="_self">
                                    <p>Home </p>
                                </a>
                            </span>
                            <span className="home-elem-9">
                                <a href="#home-elem-45" className="link" target="_self">
                                    <p>FAQ </p>
                                </a>
                            </span>
                            <span className="home-elem-10">
                                <a href="#home-elem-59" className="link" target="_self">
                                    <p>Contact Us </p>
                                </a>
                            </span>
                            <span className="home-elem-11">
                                <a href="#home-elem-80" className="link" target="_self">
                                    <p>Blog </p>
                                </a>
                            </span>
                        </div>
                    </div>
                    <button onClick={navigateToVehiclePage} className='home-elem-17'>
                        <p>Log in/Sign up</p>
                    </button>
                </div>
            </div>

            <div className="home-elem-194">
                <div className="home-elem-193">
                    <span className="home-elem-189">
                        <a href="home.html" className="link" target="_self">
                            <p>Home</p>
                        </a>
                    </span>
                    <span className="home-elem-190">
                        <a href="#home-elem-45" className="link" target="_self">
                            <p>FAQ</p>
                        </a>
                    </span>
                    <span className="home-elem-191">
                        <a href="#home-elem-59" className="link" target="_self">
                            <p>Contact Us</p>
                        </a>
                    </span>
                    <span className="home-elem-192">
                        <a href="#home-elem-80" className="link" target="_self">
                            <p>Blog</p>
                        </a>
                    </span>
                    <button className="home-elem-196">
                        <a href="#home-elem-167" className="link" target="_self">
                            <p>Get Assistance</p>
                        </a>
                    </button>
                </div>
            </div>
            <div className="home-elem-20">
                <div className="home-elem-21">
                    <span className="home-elem-25">
                        <p>Professional Assistance for Vehicle Accidents</p>
                    </span>
                    <span className="home-elem-26">
                        <p>Claim Pro Assist provides easy access to cranes, advocates, workshops, and immediate vehicle repairs for all your commercial vehicles during accidents.</p>
                    </span>
                    <div className="home-elem-27">
                        <input type="email" placeholder="Enter your email" className="home-elem-28" required={true} />
                        <button className="home-elem-29">
                            <p>Start Now</p>
                        </button>
                    </div>
                </div>
                <div className="home-elem-30">
                    <div className="home-elem-31">
                        <div className="home-elem-32">
                            <span className="home-elem-33">
                                <p>24 H</p>
                            </span>
                            <span className="home-elem-34">
                                <p>Service</p>
                            </span>
                        </div>
                    </div>
                    <div className="home-elem-35">
                        <span className="home-elem-36">
                            <img src={trucks2}/>
                        </span>
                        <span className="home-elem-37">
                            <img src={trucks1}/>
                        </span>
                    </div>
                    <div className="home-elem-38">
                        <span className="home-elem-39">
                            <p>1000+ Happy Clients</p>
                        </span>
                        <div className="home-elem-40">
                            <i className="fas fa-quote-left home-elem-41"></i>
                            <span className="home-elem-42">
                                <p>Outstanding service at difficult times.</p>
                            </span>
                            <div className="home-elem-44">
                                <i className="fas fa-quote-right home-elem-43"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-elem-45">
                <div className="home-elem-46">
                    <span className="home-elem-47">
                        <p>Ensuring smooth business continuity post accidents </p>
                    </span>
                    <div className="home-elem-48">
                        <span className="home-elem-49">
                            <p>We strive to minimize downtime and losses by providing quick and proficient assistance for commercial vehicles during accidents. </p>
                        </span>
                        <div className="home-elem-50">
                            <div className="home-elem-51">
                                <span className="home-elem-52">
                                    <p>Claims Settled </p>
                                </span>
                            </div>
                            <div className="home-elem-58">
                                <span className="home-elem-57">
                                    <p>On-spot Repairs </p>
                                </span>
                                <span className="home-elem-56">
                                    <p><br /></p>
                                </span>
                            </div>
                            <div className="home-elem-55">
                                <span className="home-elem-54">
                                    <p>Works Organized </p>
                                </span>
                                <span className="home-elem-53">
                                    <p><br /></p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-elem-59">
                <div className="home-elem-60">
                    <span className="home-elem-61">
                        <img src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1705836234/ojmes8dfrcaclb07umz6.jpg" alt="Accident" />
                    </span>
                </div>
                <div className="home-elem-62">
                    <span className="home-elem-63">
                        <p>Professional Advocate Assistance for getting your accident vehicle out from the Police Custody </p>
                    </span>
                    <span className="home-elem-64">
                        <p>From reporting the incident to dealing with complex legalities, our advocates provide end-to-end guidance for settlement. </p>
                    </span>
                    <button className="home-elem-65">
                        <a href="#home-elem-80" className="link" target="_self">
                            <p>Know More </p>
                        </a>
                    </button>
                </div>
            </div>
            <div className="home-elem-79">
                <div className="home-elem-78">
                    <span className="home-elem-75">
                        <p>Swift and Reliable On-spot Vehicle Repairs </p>
                    </span>
                    <span className="home-elem-76">
                        <p>Quick minor fixes or major repairs, our expert technicians are equipped to handle all with utmost care on the spot. </p>
                    </span>
                    <button className="home-elem-77">
                        <a href="#home-elem-80" className="link" target="_self">
                            <p>Find Out More </p>
                        </a>
                    </button>
                </div>
                <div className="home-elem-74">
                    <span className="home-elem-73">
                        <img src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1705836234/oq6r4vmih8vaaszgig16.jpg" alt="Vehicle Repair" />
                    </span>
                </div>
            </div>
            <div className="home-elem-72">
                <div className="home-elem-67">
                    <span className="home-elem-66">
                        <img src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1705836234/watf987deyzihdxzbcxg.jpg" alt="Cranes" />
                    </span>
                </div>
                <div className="home-elem-71">
                    <span className="home-elem-68">
                        <p>Cranes for Safe Vehicle Extraction </p>
                    </span>
                    <span className="home-elem-69">
                        <p>With experienced operators and robust cranes, we ensure your damaged vehicle is safely transported to workshops. </p>
                    </span>
                    <button className="home-elem-70">
                        <a href="#home-elem-80" className="link" target="_self">
                            <p>Learn More </p>
                        </a>
                    </button>
                </div>
            </div>
            <div className="home-elem-80">
                <span className="home-elem-82">
                    <p>Customized Services Tailored for Your Needs </p>
                </span>
                <span className="home-elem-83">
                    <p>From legal assistance to vehicle repairs, we offer bespoke services to fit your specific requirements. </p>
                </span>
                <div className="home-elem-81">
                    <div className="home-elem-84">
                        <i className="fas fa-bahai home-elem-85"></i>
                        <span className="home-elem-86">
                            <p>Legal </p>
                        </span>
                        <span className="home-elem-87">
                            <p>Advocate support is provided for claim settlements. </p>
                        </span>
                    </div>
                    <div className="home-elem-95">
                        <i className="far fa-heart home-elem-92"></i>
                        <span className="home-elem-93">
                            <p>Cranes </p>
                        </span>
                        <span className="home-elem-94">
                            <p>Efficient vehicle extraction at the accident spot. </p>
                        </span>
                    </div>
                    <div className="home-elem-91">
                        <i className="fas fa-thumbs-up home-elem-88"></i>
                        <span className="home-elem-89">
                            <p>Onspot Repair </p>
                        </span>
                        <span className="home-elem-90">
                            <p>Immediate minor fixes for your vehicle. </p>
                        </span>
                    </div>
                    <div className="home-elem-107">
                        <i className="fas fa-award home-elem-104"></i>
                        <span className="home-elem-105">
                            <p>Transport </p>
                        </span>
                        <span className="home-elem-106">
                            <p>Safe and secure vehicle transportation is provided. </p>
                        </span>
                    </div>
                    <div className="home-elem-103">
                        <i className="fas fa-bolt home-elem-100"></i>
                        <span className="home-elem-101">
                            <p>Claims </p>
                        </span>
                        <span className="home-elem-102">
                            <p>Guidance for smooth claim settlement process. </p>
                        </span>
                    </div>
                    <div className="home-elem-99">
                        <i className="fas fa-check home-elem-96"></i>
                        <span className="home-elem-97">
                            <p>Workshops </p>
                        </span>
                        <span className="home-elem-98">
                            <p>Major repairs are conducted at workshops. </p>
                        </span>
                    </div>
                </div>
            </div>
            <div className="home-elem-112">
                <div className="home-elem-113">
                    <span className="home-elem-111 home-elem-111">
                        <p>Real experiences from real people.</p>
                    </span>
                    <span className="home-elem-110 home-elem-110">
                        <p>What Our Clients Say</p>
                    </span>
                    <span className="home-elem-111 home-elem-111">
                        <p>Real experiences from real people.</p>
                    </span>
                    <span className="home-elem-110 home-elem-110">
                        <p>What Our Clients Say</p>
                    </span>
                </div>
                <div className="home-elem-109">
                    <div className="home-elem-125">
                        <div className="home-elem-114">
                            <div className="home-elem-115">
                                <span className="home-elem-108">
                                    <p>Turning Crisis Into Convenience</p>
                                </span>
                                <div className="home-elem-116">
                                    <i className="fas fa-star home-elem-117"></i>
                                    <i className="fas fa-star home-elem-121"></i>
                                    <i className="fas fa-star home-elem-120"></i>
                                    <i className="fas fa-star home-elem-119"></i>
                                    <i className="fas fa-star home-elem-118"></i>
                                </div>
                                <span className="home-elem-122">
                                    <p>CPA became my crisis manager during my vehicle's accident.</p>
                                </span>
                                <span className="home-elem-123">
                                    <p>The efficient team arranged everything from tow to paperwork.</p>
                                </span>
                            </div>
                            <i className="fas fa-quote-right home-elem-124"></i>
                        </div>
                        <div className="home-elem-149">
                            <div className="home-elem-147">
                                <span className="home-elem-138">
                                    <p>Professional, Prompt and Reliable service</p>
                                </span>
                                <div className="home-elem-144">
                                    <i className="fas fa-star home-elem-139"></i>
                                    <i className="fas fa-star home-elem-143"></i>
                                    <i className="fas fa-star home-elem-142"></i>
                                    <i className="fas fa-star home-elem-141"></i>
                                    <i className="fas fa-star home-elem-140"></i>
                                </div>
                                <span className="home-elem-145">
                                    <p>Helped me solve the complex process of claim smoothly.</p>
                                </span>
                                <span className="home-elem-146">
                                    <p>On-spot Repair was a lifesaver.</p>
                                </span>
                            </div>
                            <i className="fas fa-quote-right home-elem-148"></i>
                        </div>
                        <div className="home-elem-137">
                            <div className="home-elem-135">
                                <span className="home-elem-126">
                                    <p>Although a misfortunate incident, experienced best service!</p>
                                </span>
                                <div className="home-elem-132">
                                    <i className="fas fa-star home-elem-127"></i>
                                    <i className="fas fa-star home-elem-131"></i>
                                    <i className="fas fa-star home-elem-130"></i>
                                    <i className="fas fa-star home-elem-129"></i>
                                    <i className="fas fa-star home-elem-128"></i>
                                </div>
                                <span className="home-elem-133">
                                    <p>Never expected vehicle repair could be so hassle-free.</p>
                                </span>
                                <span className="home-elem-134">
                                    <p>RECOMMENDED!</p>
                                </span>
                            </div>
                            <i className="fas fa-quote-right home-elem-136"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-elem-156">
                <div className="home-elem-157">
                    <span className="home-elem-154">
                        <p>Dive into Our Blog Section</p>
                    </span>
                    <span className="home-elem-155">
                        <p>Stay updated with the latest news and helpful tips related to commercial vehicle accidents and their management.</p>
                    </span>
                </div>
                <div className="home-elem-153">
                    <div className="home-elem-152">
                        <span className="home-elem-158">
                            <img src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1705836233/efswn0i8czrgyqovcrtf.jpg" alt="Blog Image 1" />
                        </span>
                        <span className="home-elem-150">
                            <p>How we manage the entire accident scene professionally?</p>
                        </span>
                        <span className="home-elem-151">
                            <p>Get a detailed insight on how Claim Pro Assist arranges the accident scene professionally from advocates to cranes.</p>
                        </span>
                    </div>
                    <div className="home-elem-166">
                        <span className="home-elem-165">
                            <img src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1705836234/gnfu37qw7tttlblzeuiz.jpg" alt="Blog Image 2" />
                        </span>
                        <span className="home-elem-163">
                            <p>De-coding the legalities around claim settlement</p>
                        </span>
                        <span className="home-elem-164">
                            <p>Learn about the intricacies involved in claim settlement as our professional advocates decode the legalities around it.</p>
                        </span>
                    </div>
                    <div className="home-elem-162">
                        <span className="home-elem-161">
                            <img src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1705836234/qkkwko9ppnatmhmwtb0c.jpg" alt="Blog Image 3" />
                        </span>
                        <span className="home-elem-159">
                            <p>Effective Steps to On-spot Vehicle Repair</p>
                        </span>
                        <span className="home-elem-160">
                            <p>Understand the quick and effective steps followed by our experienced technicians for on-the-spot repairs.</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className="home-elem-167">
                <span className="home-elem-168">
                    <p>Why not choose the Claim Pro Assist?</p>
                </span>
                <span className="home-elem-169">
                    <p>Join our extended family and experience hassle-free, professional assistance during unwelcomed vehicle accidents.</p>
                </span>
                <div className="home-elem-172">
                    <input type="email" placeholder="Enter your email" className="home-elem-170" required={true} />
                    <button className="home-elem-171">
                        <p>Join Now</p>
                    </button>
                </div>
            </div>
            <div className="home-elem-188">
                <div className="home-elem-185">
                    <div className="home-elem-176">
                        <span className="home-elem-173">
                            <p>Claim Pro Assist</p>
                        </span>
                        <span className="home-elem-174">
                            <p>We are a dedicated team committed to provide prompt assistance during commercial vehicle accidents.</p>
                        </span>
                        <div className="home-elem-183">
                            <i className="fab fa-instagram-square home-elem-180"></i>
                            <i className="fab fa-twitter-square home-elem-182"></i>
                            <i className="fab fa-facebook home-elem-181"></i>
                        </div>
                    </div>
                    <span className="home-elem-197">
                        <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1705838029/static/logo_page-0001jpg_1705838020_75147.jpg" alt="Claim Pro Assist Logo" />
                    </span>
                    <div className="home-elem-184">
                        <span className="home-elem-177">
                            <p>Contact us</p>
                        </span>
                        <span className="home-elem-178">
                            <p><br /></p>
                        </span>
                        <span className="home-elem-179">
                            <p>1800-123-456</p>
                        </span>
                        <button className="home-elem-175">
                            <a href="#home-elem-167" className="link" target="_self">
                                <p>Contact Us</p>
                            </a>
                        </button>
                    </div>
                </div>
                <div className="home-elem-187">
                    <span className="home-elem-186">
                        <p>© 2023 Claim Pro Assist, we love our users!</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home;
