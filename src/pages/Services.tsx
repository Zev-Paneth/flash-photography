import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import MetaTags from '../components/MetaTags';

const Services: React.FC = () => {
    // State for booking message
    const [bookingMessage, setBookingMessage] = useState<string | null>(null);

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

    const services = [
        {
            id: 'newborn',
            title: <FormattedMessage id="services.newborn.title" defaultMessage="Newborn Photography" />,
            description: <FormattedMessage id="services.newborn.description" defaultMessage="Capture the precious first days of your baby's life with a gentle, professional photoshoot designed specifically for newborns." />,
            image: '/images/services/newborn.jpg',
            includes: [
                <FormattedMessage id="services.newborn.includes.1" defaultMessage="Safety-focused posing" />,
                <FormattedMessage id="services.newborn.includes.2" defaultMessage="Various setups and props" />,
                <FormattedMessage id="services.newborn.includes.3" defaultMessage="Family and sibling photos" />,
                <FormattedMessage id="services.newborn.includes.4" defaultMessage="Edited digital images" />
            ]
        },
        {
            id: 'children',
            title: <FormattedMessage id="services.children.title" defaultMessage="Children Photography" />,
            description: <FormattedMessage id="services.children.description" defaultMessage="Fun and natural photoshoots that capture your child's personality and spirit, creating timeless portraits." />,
            image: '/images/services/children.jpg',
            includes: [
                <FormattedMessage id="services.children.includes.1" defaultMessage="Playful guidance for natural expressions" />,
                <FormattedMessage id="services.children.includes.2" defaultMessage="Indoor or outdoor sessions" />,
                <FormattedMessage id="services.children.includes.3" defaultMessage="Wardrobe consultation" />,
                <FormattedMessage id="services.children.includes.4" defaultMessage="Professionally edited images" />
            ]
        },
        {
            id: 'family',
            title: <FormattedMessage id="services.family.title" defaultMessage="Family Photography" />,
            description: <FormattedMessage id="services.family.description" defaultMessage="Beautiful family portraits that document your connection and create heirlooms to be cherished for generations." />,
            image: '/images/services/family.jpg',
            includes: [
                <FormattedMessage id="services.family.includes.1" defaultMessage="Relaxed, guided posing" />,
                <FormattedMessage id="services.family.includes.2" defaultMessage="Studio or location options" />,
                <FormattedMessage id="services.family.includes.3" defaultMessage="Group and individual portraits" />,
                <FormattedMessage id="services.family.includes.4" defaultMessage="High resolution digital files" />
            ]
        }
    ];

    return (
        <div className="pt-20">
            <MetaTags
                title="Photography Services | Newborn, Children & Family Sessions"
                description="Professional photography services for newborns, children, and families. Our sessions are tailored to capture the beauty of every stage of life."
                keywords="newborn photography, children photography, family portraits, professional photo sessions, photography services"
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

            {/* Services */}
            <div className="container mx-auto px-4 py-16">
                <div className="space-y-24">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`flex flex-col ${index % 2 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
                        >
                            <div className="w-full md:w-1/2">
                                <img
                                    src={service.image}
                                    alt={service.id}
                                    className="w-full h-auto rounded-sm shadow-lg"
                                />
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
        </div>
    );
};

export default Services;