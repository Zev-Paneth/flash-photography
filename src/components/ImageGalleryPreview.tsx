import React from 'react';
import { Link } from 'react-router-dom';
import {FormattedMessage} from "react-intl";

const ImageGalleryPreview: React.FC = () => {
    // Placeholder for featured images
    const featuredImages = [
        { id: 1, src: '/images/featured/newborn.jpg', alt: 'Newborn photography', category: 'newborn', link: '/gallery/newborn' },
        { id: 2, src: '/images/featured/upshern.jpg', alt: 'Upshern photography', category: 'upshern', link: '/gallery/upshern' },
        { id: 3, src: '/images/featured/indoor.jpg', alt: 'Indoor photography', category: 'indoor', link: '/gallery/indoor' },
        { id: 4, src: '/images/featured/outdoor.jpg', alt: 'Outdoor photography', category: 'outdoor', link: '/gallery/outdoor' },
    ];

    return (
        <div>
            {/* Balanced grid that changes based on screen size */}
            <div className="grid gap-4">
                {/* Mobile: All images stacked (1 column) */}
                <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {featuredImages.map((image) => (
                        <div
                            key={image.id}
                            className="relative overflow-hidden aspect-square bg-stone-50"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/placeholder.jpg';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-amber-700/0 hover:bg-amber-700/10 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Tablet: 2x2 grid (2 columns) */}
                <div className="hidden sm:grid md:hidden grid-cols-2 gap-4">
                    {featuredImages.map((image) => (
                        <div
                            key={image.id}
                            className="relative overflow-hidden aspect-square bg-stone-50"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/placeholder.jpg';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-amber-700/0 hover:bg-amber-700/10 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Desktop small: 4 columns in one row */}
                <div className="hidden md:grid lg:hidden grid-cols-4 gap-4">
                    {featuredImages.map((image) => (
                        <div
                            key={image.id}
                            className="relative overflow-hidden aspect-square bg-stone-50"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/placeholder.jpg';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-amber-700/0 hover:bg-amber-700/10 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Desktop large: 2 large images side by side */}
                <div className="hidden lg:grid grid-cols-2 gap-6">
                    {/* First two images */}
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            className="relative overflow-hidden aspect-square bg-stone-50"
                        >
                            <img
                                src={featuredImages[0].src}
                                alt={featuredImages[0].alt}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="eager"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/placeholder.jpg';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-amber-700/0 hover:bg-amber-700/10 transition-colors duration-300"></div>
                        </div>
                        <div
                            className="relative overflow-hidden aspect-square bg-stone-50"
                        >
                            <img
                                src={featuredImages[1].src}
                                alt={featuredImages[1].alt}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/placeholder.jpg';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-amber-700/0 hover:bg-amber-700/10 transition-colors duration-300"></div>
                        </div>
                    </div>

                    {/* Second two images */}
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            className="relative overflow-hidden aspect-square bg-stone-50"
                        >
                            <img
                                src={featuredImages[2].src}
                                alt={featuredImages[2].alt}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/placeholder.jpg';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-amber-700/0 hover:bg-amber-700/10 transition-colors duration-300"></div>
                        </div>
                        <div
                            className="relative overflow-hidden aspect-square bg-stone-50"
                        >
                            <img
                                src={featuredImages[3].src}
                                alt={featuredImages[3].alt}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/placeholder.jpg';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-amber-700/0 hover:bg-amber-700/10 transition-colors duration-300"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View More Button */}
            <div className="mt-8 text-center">
                <Link
                    to="/gallery"
                    className="inline-block px-8 py-3 bg-white border border-amber-700 text-amber-700 uppercase text-sm tracking-wider transition-colors duration-300 hover:bg-amber-700 hover:text-white"
                >
                    <FormattedMessage id="home.featured.viewMore" defaultMessage="View More" />
                </Link>
            </div>
        </div>
    );
};

export default ImageGalleryPreview;