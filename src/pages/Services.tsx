import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import MetaTags from '../components/MetaTags';
import storageService from '../services/storageService';

interface ServiceData {
    id: string;
    title: React.ReactElement;
    description: React.ReactElement;
    image: string;
    includes: React.ReactElement[];
    loading?: boolean;
    error?: boolean;
}

const Services: React.FC = () => {
    // State for booking message
    const [bookingMessage, setBookingMessage] = useState<string | null>(null);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);

    // Initialize services with text content and placeholders for images
    const initializeServices = (): ServiceData[] => [
        {
            id: 'newborn',
            title: <FormattedMessage id="services.newborn.title" defaultMessage="Newborn Photography" />,
            description: <FormattedMessage id="services.newborn.description" defaultMessage="Capture the precious first days of your baby's life with a gentle, professional photoshoot designed specifically for newborns." />,
            image: '',
            loading: true,
            includes: [
                <FormattedMessage id="services.newborn.includes.1" defaultMessage="Safety-focused posing" />,
                <FormattedMessage id="services.newborn.includes.2" defaultMessage="Various setups and props" />,
                <FormattedMessage id="services.newborn.includes.3" defaultMessage="Family and sibling photos" />,
                <FormattedMessage id="services.newborn.includes.4" defaultMessage="Edited digital images" />
            ]
        },
        {
            id: 'upshern',
            title: <FormattedMessage id="services.upshern.title" defaultMessage="Upshern Photography"/>,
            description: <FormattedMessage id="services.upshern.description"
                                           defaultMessage="Professional photoshoot capturing your son's special Upsherin celebration - the meaningful Jewish tradition of a boy's first haircut."/>,
            image: '',
            loading: true,
            includes: [
                <FormattedMessage id="services.upshern.includes.1" defaultMessage="Pre-ceremony family photos"/>,
                <FormattedMessage id="services.upshern.includes.2" defaultMessage="Coverage of hair cutting ceremony"/>,
                <FormattedMessage id="services.upshern.includes.3" defaultMessage="Traditional celebration moments"/>,
                <FormattedMessage id="services.upshern.includes.4" defaultMessage="High quality edited images"/>
            ]
        },
        {
            id: 'indoor',
            title: <FormattedMessage id="services.indoor.title" defaultMessage="Indoor Photography"/>,
            description: <FormattedMessage id="services.indoor.description"
                                           defaultMessage="Professional indoor photography capturing beautiful moments in the comfort of your home or our studio setting."/>,
            image: '',
            loading: true,
            includes: [
                <FormattedMessage id="services.indoor.includes.1" defaultMessage="Professional lighting setup"/>,
                <FormattedMessage id="services.indoor.includes.2" defaultMessage="Multiple room/backdrop options"/>,
                <FormattedMessage id="services.indoor.includes.3" defaultMessage="Styled photo arrangements"/>,
                <FormattedMessage id="services.indoor.includes.4" defaultMessage="High quality edited photos"/>
            ]
        },
        {
            id: 'outdoor',
            title: <FormattedMessage id="services.outdoor.title" defaultMessage="Outdoor Photography"/>,
            description: <FormattedMessage id="services.outdoor.description"
                                           defaultMessage="Stunning outdoor photography capturing beautiful moments in scenic natural settings and urban landscapes."/>,
            image: '',
            loading: true,
            includes: [
                <FormattedMessage id="services.outdoor.includes.1" defaultMessage="Location scouting"/>,
                <FormattedMessage id="services.outdoor.includes.2" defaultMessage="Natural light expertise"/>,
                <FormattedMessage id="services.outdoor.includes.3" defaultMessage="Seasonal photo shoots"/>,
                <FormattedMessage id="services.outdoor.includes.4" defaultMessage="High quality edited images"/>
            ]
        }
    ];

    // Load service images from Firebase
    useEffect(() => {
        const loadServiceImages = async () => {
            const initialServices = initializeServices();
            setServices(initialServices);
            setLoading(false);

            // Load images for each service
            for (const service of initialServices) {
                try {
                    // ינסה לטעון תמונה ספציפית לשירות מתיקיית 'services'
                    let serviceImages = await storageService.getImagesFromCategory('services');

                    // חפש תמונה שמתאימה לשירות הספציפי
                    let serviceImage = serviceImages.find(img =>
                        img.name.toLowerCase().includes(service.id.toLowerCase())
                    );

                    // אם לא נמצאה תמונה ספציפית, ינסה להשתמש בתמונה מהקטגוריה הרלוונטית
                    if (!serviceImage) {
                        const categoryImages = await storageService.getImagesFromCategory(service.id);
                        if (categoryImages.length > 0) {
                            serviceImage = categoryImages[0]; // קח את התמונה הראשונה מהקטגוריה
                        }
                    }

                    // עדכן את השירות עם התמונה שנמצאה
                    if (serviceImage) {
                        setServices(prevServices =>
                            prevServices.map(s =>
                                s.id === service.id
                                    ? { ...s, image: serviceImage!.url, loading: false }
                                    : s
                            )
                        );
                    } else {
                        // אם לא נמצאה תמונה, סמן כשגיאה
                        setServices(prevServices =>
                            prevServices.map(s =>
                                s.id === service.id
                                    ? { ...s, loading: false, error: true }
                                    : s
                            )
                        );
                    }
                } catch (error) {
                    console.error(`Error loading image for service ${service.id}:`, error);
                    setServices(prevServices =>
                        prevServices.map(s =>
                            s.id === service.id
                                ? { ...s, loading: false, error: true }
                                : s
                        )
                    );
                }
            }
        };

        loadServiceImages();
    }, []);

    // Temporary function for booking - will be replaced with backend integration
    const handleBookNow = (serviceType: string) => {
        // Store the service interest in localStorage
        localStorage.setItem('bookingInterest', serviceType);

        // Set success message
        setBookingMessage(
            `Thank you for your interest in our ${serviceType} photography services! Our online booking system will be available soon. In the meantime, please use our contact form to schedule your session.`
        );

        // Scroll to message
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);

        // Clear message after 10 seconds
        setTimeout(() => {
            setBookingMessage(null);
        }, 10000);
    };

    // Service image component with loading and error states
    const ServiceImage: React.FC<{ service: ServiceData }> = ({ service }) => {
        if (service.loading) {
            return (
                <div className="w-full h-auto aspect-[4/3] bg-stone-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500 text-sm">Loading image...</p>
                    </div>
                </div>
            );
        }

        if (service.error || !service.image) {
            return (
                <div className="w-full h-auto aspect-[4/3] bg-stone-100 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">{service.id} Photography</p>
                        <p className="text-xs mt-1">Image loading...</p>
                    </div>
                </div>
            );
        }

        return (
            <img
                src={service.image}
                alt={service.id}
                className="w-full h-auto rounded-sm shadow-lg"
                loading="lazy"
                onError={(e) => {
                    // Handle image load error
                    setServices(prevServices =>
                        prevServices.map(s =>
                            s.id === service.id
                                ? { ...s, error: true }
                                : s
                        )
                    );
                }}
            />
        );
    };

    return (
        <div className="pt-20">
            <MetaTags
                title="Photography Services | Newborn, Upshern, Indoor & Outdoor"
                description="Professional photography services including newborn sessions, upshern celebrations, indoor and outdoor photoshoots that capture your precious moments."
                keywords="newborn photography, upshern photography, indoor photography, outdoor photography, professional photo sessions, photography services"
            />

            {/* Booking Message */}
            {bookingMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 mx-4 md:mx-auto md:max-w-4xl my-4 rounded">
                    <p>{bookingMessage}</p>
                    <button
                        className="text-green-600 font-medium underline mt-2"
                        onClick={() => setBookingMessage(null)}
                    >
                        Close
                    </button>
                </div>
            )}

            {/* Page Header */}
            <div className="bg-stone-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-cormorant text-5xl mb-4">
                        <FormattedMessage id="services.title" defaultMessage="Services" />
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        <FormattedMessage id="services.description" defaultMessage="Professional photography services tailored to capture the beauty of every stage of life." />
                    </p>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading services...</p>
                </div>
            )}

            {/* Services */}
            {!loading && (
                <div className="container mx-auto px-4 py-16">
                    <div className="space-y-24">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`flex flex-col ${index % 2 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
                            >
                                <div className="w-full md:w-1/2">
                                    <ServiceImage service={service} />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <h2 className="font-cormorant text-4xl mb-6">
                                        {service.title}
                                    </h2>
                                    <p className="text-gray-600 mb-8">
                                        {service.description}
                                    </p>
                                    <h3 className="font-medium text-lg mb-4">
                                        <FormattedMessage id="services.includes" defaultMessage="Session Includes:" />
                                    </h3>
                                    <ul className="space-y-2">
                                        {service.includes.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-amber-700 mr-2">✓</span>
                                                <span className="text-gray-600">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => handleBookNow(service.id)}
                                        className="mt-8 px-6 py-3 bg-amber-700 text-white uppercase text-sm tracking-wider transition-colors hover:bg-gray-800"
                                    >
                                        <FormattedMessage id="services.bookNow" defaultMessage="Book Now" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;