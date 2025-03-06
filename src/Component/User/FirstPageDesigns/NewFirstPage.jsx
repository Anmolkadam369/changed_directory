import React, { useState, useEffect } from 'react';
import './FirstPageDesigns.css'
import { Truck, Plane, Scale, Wrench, Building2, Search, MapPin, Star, Clock, Shield, ChevronDown } from 'lucide-react';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import BottomNavigationBar from '../BottomNavigationBar';


import PermissionCheck from './PermissionCheck';


function ServiceCard({ icon: Icon, title, description, imageUrl, rating, eta }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-red-100 transition-all">
            <div className="relative h-40">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md flex items-center space-x-1">
                    <Star className="w-4 h-4 text-red-500 fill-current" />
                    <span className="text-sm font-semibold">{rating}</span>
                </div>
                {eta && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                        {eta} min
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-red-50 rounded-full">
                        <Icon className="w-4 h-4 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Book Now
                </button>
            </div>
        </div>
    );
}

function CategoryPill({ icon: Icon, label, isActive, onClick }) {
    return (
        <button
            className={`flex items-center space-x-2 px-3 py-1 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                } hover:bg-blue-500 transition-colors`}
            onClick={onClick}
        >
            <Icon className="w-5 h-5" />
            <span className='text-[10px]'>{label}</span>
        </button>
    );
}

function NewFirstPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getLocation = () => {

        Notification.requestPermission().then((data) => {
            console.log(data);

            if (data === 'granted') {
                setLoading(true);
                setError(null);

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError,);
                } else {
                    setError("Geolocation is not supported by this browser.");
                    setLoading(false);
                }
            }
            else {
                // alert('Notifications are turned off.')
            }
        }, (error) => {
            console.log(error);
        })


    };

    useEffect(() => {

        getLocation();

    }, []);

    const showPosition = async (position) => {
        const { latitude, longitude } = position.coords;
        // console.log("Latitude:", latitude, "Longitude:", longitude);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            if (data && data.address) {
                const { road, city, state, country } = data.address;
                const locationParts = [road, city, state, country].filter(Boolean);
                setLocation(locationParts.join(", "));
                setError(null);
            } else {
                setLocation("Location details not found.");
            }
        } catch (error) {
            setError("Error fetching location details.");
        } finally {
            setLoading(false);
        }
    };

    const showError = (error) => {
        setLoading(false);
        switch (error.code) {
            case error.PERMISSION_DENIED:
                // setError("Please enable location services to access the dashboard.");
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
            default:
                setError("An unknown error occurred.");
        }

        showNotification()
    };

    function showNotification() {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
            return;
        }

        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification("Location Access Needed", {
                    body: "Please enable location services to continue.",
                    // icon: "your-icon.png", // Change this to your icon path
                });
            }
        });


    }


    const refreshLocation = () => {
        getLocation();

        setTimeout(() => {
            getLocation();
        }, 2000);
    }

    const services = [
        {
            icon: Truck,
            title: "Recovery Van Services",
            description: "24/7 emergency vehicle recovery with GPS-tracked fleet. Instant response for breakdown and accidents.",
            imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80",
            rating: "4.8",
            eta: "15",
            category: "recovery"
        },
        {
            icon: Plane,
            title: "Heavy Crane Services",
            description: "50-ton capacity cranes for heavy vehicle recovery. Expert operators available 24/7.",
            imageUrl: "https://media.istockphoto.com/id/179218482/photo/mobile-crane-white-truck.jpg?s=1024x1024&w=is&k=20&c=NZZD3wUhuDn2vuc45Zkg45RjVb1ZwtngkA816a70NEc=",
            rating: "4.9",
            eta: "30",
            category: "crane"
        },
        {
            icon: Scale,
            title: "Legal Support",
            description: "Instant legal assistance for accidents and claims. Direct insurance company coordination.",
            imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
            rating: "4.7",
            eta: "20",
            category: "legal"
        },
        {
            icon: Wrench,
            title: "Emergency Repairs",
            description: "On-spot repairs by certified mechanics. All brands supported with genuine parts.",
            imageUrl: "https://media.istockphoto.com/id/843363378/photo/semi-trucks-mechanic.jpg?s=1024x1024&w=is&k=20&c=31U3Cc_Duv2th8WdHLshMhdg7_NuWO0nCKpkX78NXsU=",
            rating: "4.8",
            eta: "25",
            category: "repairs"
        },
        {
            icon: Building2,
            title: "Premium Workshop",
            description: "State-of-the-art repair facility with advanced diagnostic equipment and skilled technicians.",
            imageUrl: "https://images.unsplash.com/photo-1503434396599-58ba8a18d932?auto=format&fit=crop&q=80",
            rating: "4.9",
            eta: "40",
            category: "repairs"
        }
    ];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (

        <div>
            {error ? (
                <div className='mt-3'>
                    <div className='ms-2' style={{ color: "red", fontWeight: "bold" }}>
                        {error}
                    </div>
                    <button type="button" className="btn btn-link" onClick={refreshLocation}>
                        Refresh
                    </button>
                </div>
            ) : location ? (
                <div>
                    <div>
                        <div className="w-full">
                            {/* Status Bar */}
                            <div style={{
                                position: 'fixed',
                                width: '100%',
                                zIndex: '1000'
                            }} className="newfirstpage-status-bar h-12 flex items-center justify-between px-4 text-white">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-5 h-5" />
                                    <div className="flex items-center space-x-1 cursor-pointer">
                                        <span className="text-sm font-medium">{location}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Clock className="w-5 h-5" />
                                    <Shield className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="p-4">
                                <div className="relative mt-[40px]">
                                    {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /> */}
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for services..."
                                        className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-lg text-gray-500 placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>


                            {/* Quick Stats */}
                            <div className="px-4 mb-6">
                                <div className="bg-red-50 rounded-xl p-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <Clock className="w-5 h-5 text-red-600" />
                                            </div>
                                            <p className="text-xs font-medium text-gray-600">Avg. Response</p>
                                            <p className="text-sm font-bold text-red-600">20 min</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <Star className="w-5 h-5 text-red-600" />
                                            </div>
                                            <p className="text-xs font-medium text-gray-600">Rating</p>
                                            <p className="text-sm font-bold text-red-600">4.8/5</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <Shield className="w-5 h-5 text-red-600" />
                                            </div>
                                            <p className="text-xs font-medium text-gray-600">Insured</p>
                                            <p className="text-sm font-bold text-red-600">100%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="px-4 mb-6">
                                <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide max-w-[300px]">
                                    <CategoryPill
                                        icon={Truck}
                                        label="All Services"
                                        isActive={activeCategory === 'all'}
                                        onClick={() => setActiveCategory('all')}
                                        className="text-xs px-2 py-1"
                                    />
                                    <CategoryPill
                                        icon={Truck}
                                        label="Recovery"
                                        isActive={activeCategory === 'recovery'}
                                        onClick={() => setActiveCategory('recovery')}
                                        className="text-xs px-2 py-1"
                                    />
                                    <CategoryPill
                                        icon={PrecisionManufacturingIcon}
                                        label="Crane"
                                        isActive={activeCategory === 'crane'}
                                        onClick={() => setActiveCategory('crane')}
                                        className="text-xs px-2 py-1"
                                    />
                                    <CategoryPill
                                        icon={Scale}
                                        label="Legal"
                                        isActive={activeCategory === 'legal'}
                                        onClick={() => setActiveCategory('legal')}
                                        className="text-xs px-2 py-1"
                                    />
                                    <CategoryPill
                                        icon={Wrench}
                                        label="Repairs"
                                        isActive={activeCategory === 'repairs'}
                                        onClick={() => setActiveCategory('repairs')}
                                        className="text-xs px-2 py-1"
                                    />
                                    <CategoryPill
                                        icon={Building2}
                                        label="Workshops"
                                        isActive={activeCategory === 'workshops'}
                                        onClick={() => setActiveCategory('workshops')}
                                        className="text-xs px-2 py-1"
                                    />
                                </div>

                            </div>


                            {/* Enhanced Service Details */}
                            <div className="px-4 pb-6">
                                <h2 className="text-xl font-bold mb-4 text-gray-900">Featured Services</h2>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredServices.map((service, index) => (
                                        <div key={index} className="relative group">
                                            <ServiceCard {...service} />
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-0 group-hover:opacity-80 transition-opacity flex items-end p-4">
                                                <div>
                                                    <h3 className="text-white text-lg font-bold">{service.title}</h3>
                                                    <p className="text-gray-200 text-sm mt-1">{service.description}</p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <Clock className="w-4 h-4 text-white" />
                                                        <span className="text-gray-200 text-xs">{service.eta} min ETA</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {/* Service Information Section */}
                            <div className="px-4 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Services?</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-blue-50 p-6 rounded-lg text-center">
                                        <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">Reliable Fleet</h3>
                                        <p className="text-sm text-gray-600">Our GPS-tracked fleet ensures timely recovery, repair, and assistance for all vehicles.</p>
                                    </div>
                                    <div className="bg-green-50 p-6 rounded-lg text-center">
                                        <div className="w-12 h-12 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                            <Scale className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">Legal Expertise</h3>
                                        <p className="text-sm text-gray-600">Specialized support for accident claims and insurance disputes handled by experts.</p>
                                    </div>
                                    <div className="bg-yellow-50 p-6 rounded-lg text-center">
                                        <div className="w-12 h-12 mx-auto bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                                            <Star className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">Top-rated Services</h3>
                                        <p className="text-sm text-gray-600">Highly rated by customers for professional service and fast response.</p>
                                    </div>
                                    <div className="bg-red-50 p-6 rounded-lg text-center">
                                        <div className="w-12 h-12 mx-auto bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                                            <Wrench className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">Expert Mechanics</h3>
                                        <p className="text-sm text-gray-600">Certified technicians with years of experience and access to modern tools.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Highlights Section */}
                            <div className="px-4 mb-8 bg-gray-100 py-6 rounded-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Highlights</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <Shield className="w-6 h-6 text-red-600 mr-3" />
                                        <span className="text-gray-700 text-sm">100% insured services for peace of mind.</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Clock className="w-6 h-6 text-blue-600 mr-3" />
                                        <span className="text-gray-700 text-sm">Average response time of 20 minutes.</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Building2 className="w-6 h-6 text-green-600 mr-3" />
                                        <span className="text-gray-700 text-sm">State-of-the-art workshops with advanced diagnostic tools.</span>
                                    </li>
                                    <li className="flex items-center">
                                        <MapPin className="w-6 h-6 text-yellow-600 mr-3" />
                                        <span className="text-gray-700 text-sm">Available across multiple cities with a wide service network.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Testimonials Section */}
                            <div className="px-4 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Testimonials</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <p className="text-gray-700 text-sm italic">"The recovery van arrived within 15 minutes and was extremely professional. Highly recommend!"</p>
                                        <div className="mt-4 flex items-center space-x-2">
                                            <Star className="w-5 h-5 text-yellow-500" />
                                            <span className="text-gray-900 font-medium">4.8/5</span>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <p className="text-gray-700 text-sm italic">"Their workshop is incredibly well-equipped, and the staff is knowledgeable."</p>
                                        <div className="mt-4 flex items-center space-x-2">
                                            <Star className="w-5 h-5 text-yellow-500" />
                                            <span className="text-gray-900 font-medium">4.9/5</span>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <p className="text-gray-700 text-sm italic">"Affordable, fast, and reliable! The legal team helped me resolve my insurance claim hassle-free."</p>
                                        <div className="mt-4 flex items-center space-x-2">
                                            <Star className="w-5 h-5 text-yellow-500" />
                                            <span className="text-gray-900 font-medium">5.0/5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Horizontal Scrolling Section */}
                            <div className="px-4 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More Services</h2>
                                <div className="flex space-x-4 overflow-x-auto scrollbar-hide max-w-[300px]">
                                    {/* Single Card */}
                                    <div className="min-w-[280px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                        <img
                                            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80"
                                            alt="Recovery Van Services"
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-800">Recovery Van</h3>
                                            <p className="text-sm text-gray-600 mt-2">Emergency vehicle recovery available 24/7 with GPS tracking.</p>
                                        </div>
                                    </div>

                                    {/* Single Card */}
                                    <div className="min-w-[280px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                        <img
                                            src="https://media.istockphoto.com/id/179218482/photo/mobile-crane-white-truck.jpg?s=1024x1024&w=is&k=20&c=NZZD3wUhuDn2vuc45Zkg45RjVb1ZwtngkA816a70NEc="
                                            alt="Heavy Crane Services"
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-800">Heavy Crane</h3>
                                            <p className="text-sm text-gray-600 mt-2">50-ton capacity cranes for lifting and recovery operations.</p>
                                        </div>
                                    </div>

                                    {/* Single Card */}
                                    <div className="min-w-[280px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                        <img
                                            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
                                            alt="Legal Support"
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-800">Legal Support</h3>
                                            <p className="text-sm text-gray-600 mt-2">Instant legal help for accident claims and insurance issues.</p>
                                        </div>
                                    </div>

                                    {/* Single Card */}
                                    <div className="min-w-[280px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                        <img
                                            src="https://media.istockphoto.com/id/843363378/photo/semi-trucks-mechanic.jpg?s=1024x1024&w=is&k=20&c=31U3Cc_Duv2th8WdHLshMhdg7_NuWO0nCKpkX78NXsU="
                                            alt="Emergency Repairs"
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-800">Emergency Repairs</h3>
                                            <p className="text-sm text-gray-600 mt-2">Certified mechanics available for immediate repairs on the spot.</p>
                                        </div>
                                    </div>

                                    {/* Single Card */}
                                    <div className="min-w-[280px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                        <img
                                            src="https://images.unsplash.com/photo-1503434396599-58ba8a18d932?auto=format&fit=crop&q=80"
                                            alt="Premium Workshop"
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-gray-800">Premium Workshop</h3>
                                            <p className="text-sm text-gray-600 mt-2">Advanced facilities for detailed repairs and diagnostics.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <BottomNavigationBar />
                        </div>
                    </div>
                </div>
            ) : (

                <>
                    <div >  <PermissionCheck /> </div>
                </>

            )}


        </div>

    );
}

export default NewFirstPage;