import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import storageService from '../services/storageService';

interface FeaturedImage {
    id: string;
    src: string;
    alt: string;
    category: string;
    link: string;
}

const ImageGalleryPreview: React.FC = () => {
    const [featuredImages, setFeaturedImages] = useState<FeaturedImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadFeaturedImages = async () => {
            try {
                setLoading(true);
                setError(false);

                // ינסה לטעון תמונות מתיקיית 'featured' תחילה
                let images = await storageService.getImagesFromCategory('featured');

                // אם אין תמונות ב-featured, ישתמש בתמונות מכל הקטגוריות
                if (images.length === 0) {
                    const allImages = await storageService.getAllImages(['newborn', 'upshern', 'indoor', 'outdoor']);

                    // יבחר תמונה אחת מכל קטגוריה
                    const categoriesUsed = new Set();
                    images = allImages.filter(img => {
                        if (!categoriesUsed.has(img.category) && categoriesUsed.size < 4) {
                            categoriesUsed.add(img.category);
                            return true;
                        }
                        return false;
                    });
                }

                // המרה לפורמט הנדרש
                const formattedImages: FeaturedImage[] = images.slice(0, 4).map((image, index) => ({
                    id: `featured-${index}`,
                    src: image.url,
                    alt: `${image.category} photography`,
                    category: image.category || 'general',
                    link: `/gallery`
                }));

                setFeaturedImages(formattedImages);
            } catch (err) {
                console.error('Error loading featured images:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadFeaturedImages();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading featured work...</p>
            </div>
        );
    }

    // Error state
    if (error || featuredImages.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-700 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <p className="text-gray-600 mb-4">Featured images are being prepared.</p>
                <Link
                    to="/gallery"
                    className="inline-block px-8 py-3 bg-amber-700 text-white uppercase text-sm tracking-wider hover:bg-amber-800 transition-colors duration-300"
                >
                    <FormattedMessage id="home.featured.viewMore" defaultMessage="View Gallery" />
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* Responsive grid layout */}
            <div className="grid gap-4">
                {/* Mobile: All images stacked (1 column) */}
                <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {featuredImages.map((image) => (
                        <ImageCard key={image.id} image={image} />
                    ))}
                </div>

                {/* Tablet: 2x2 grid (2 columns) */}
                <div className="hidden sm:grid md:hidden grid-cols-2 gap-4">
                    {featuredImages.map((image) => (
                        <ImageCard key={image.id} image={image} />
                    ))}
                </div>

                {/* Desktop small: 4 columns in one row */}
                <div className="hidden md:grid lg:hidden grid-cols-4 gap-4">
                    {featuredImages.map((image) => (
                        <ImageCard key={image.id} image={image} />
                    ))}
                </div>

                {/* Desktop large: 2x2 grid */}
                <div className="hidden lg:grid grid-cols-2 gap-6">
                    {featuredImages.slice(0, 2).map((image) => (
                        <ImageCard key={image.id} image={image} />
                    ))}
                    {featuredImages.length > 2 && (
                        <>
                            {featuredImages.slice(2, 4).map((image) => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </>
                    )}
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

// Separate component for image card to reduce repetition
interface ImageCardProps {
    image: FeaturedImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="relative overflow-hidden aspect-square bg-stone-50">
            {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {imageError ? (
                <div className="w-full h-full flex items-center justify-center bg-stone-100">
                    <div className="text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs">Image loading...</p>
                    </div>
                </div>
            ) : (
                <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
            )}

            <div className="absolute inset-0 bg-amber-700/0 hover:bg-amber-700/10 transition-colors duration-300"></div>
        </div>
    );
};

export default ImageGalleryPreview;