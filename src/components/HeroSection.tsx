import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import storageService from '../services/storageService';

const HeroSection: React.FC = () => {
    // State to track the current image index and transition state
    const [activeIndex, setActiveIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Refs for touch/drag functionality
    const startXRef = useRef(0);
    const touchStartTime = useRef(0);

    // Load hero images from Firebase Storage
    useEffect(() => {
        const loadHeroImages = async () => {
            try {
                // טען תמונות hero מ-Firebase Storage
                // אפשר ליצור תיקיית 'hero' ב-Storage או להשתמש בתמונות מ-'featured'
                const images = await storageService.getImagesFromCategory('hero');

                if (images.length === 0) {
                    // אם אין תמונות hero, השתמש בתמונות featured כגיבוי
                    const featuredImages = await storageService.getImagesFromCategory('featured');
                    if (featuredImages.length > 0) {
                        const imageUrls = featuredImages.slice(0, 5).map(img => img.url); // עד 5 תמונות
                        setBackgroundImages(imageUrls);
                    }
                } else {
                    const imageUrls = images.map(img => img.url);
                    setBackgroundImages(imageUrls);
                }

                setImagesLoaded(true);
            } catch (error) {
                console.error('Error loading hero images:', error);
                setImagesLoaded(true); // עדיין נסמן כטעון כדי שלא יישאר loading לנצח
            }
        };

        loadHeroImages();
    }, []);

    // Preload all images for smoother transitions
    useEffect(() => {
        if (backgroundImages.length > 0) {
            backgroundImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }
    }, [backgroundImages]);

    // Handle image transition
    const transitionToNextImage = useCallback((nextIdx: number) => {
        if (isTransitioning || backgroundImages.length === 0) return;

        setIsTransitioning(true);
        setNextIndex(nextIdx);

        // After transition completes, make next image the active one
        setTimeout(() => {
            setActiveIndex(nextIdx);
            setIsTransitioning(false);
        }, 1000); // Match with CSS transition duration
    }, [isTransitioning, backgroundImages.length]);

    // Function to go to the next image
    const goToNextImage = useCallback(() => {
        if (backgroundImages.length <= 1) return;
        const nextIdx = (activeIndex + 1) % backgroundImages.length;
        transitionToNextImage(nextIdx);
    }, [activeIndex, backgroundImages.length, transitionToNextImage]);

    // Function to go to the previous image
    const goToPrevImage = useCallback(() => {
        if (backgroundImages.length <= 1) return;
        const prevIdx = (activeIndex - 1 + backgroundImages.length) % backgroundImages.length;
        transitionToNextImage(prevIdx);
    }, [activeIndex, backgroundImages.length, transitionToNextImage]);

    // Set up auto-rotation timer
    useEffect(() => {
        if (backgroundImages.length > 1) {
            const intervalId = setInterval(goToNextImage, 5000); // Change image every 5 seconds
            return () => clearInterval(intervalId); // Clean up on unmount
        }
    }, [goToNextImage, backgroundImages.length]);

    // Touch/drag event handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        startXRef.current = e.touches[0].clientX;
        touchStartTime.current = Date.now();
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const deltaX = e.changedTouches[0].clientX - startXRef.current;
        const deltaTime = Date.now() - touchStartTime.current;

        // Only register as swipe if movement is significant and fast enough
        if (Math.abs(deltaX) > 50 && deltaTime < 300) {
            if (deltaX > 0) {
                goToPrevImage();
            } else {
                goToNextImage();
            }
        }
    };

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        startXRef.current = e.clientX;
        touchStartTime.current = Date.now();
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = (e: MouseEvent) => {
        const deltaX = e.clientX - startXRef.current;
        const deltaTime = Date.now() - touchStartTime.current;

        if (Math.abs(deltaX) > 50 && deltaTime < 300) {
            if (deltaX > 0) {
                goToPrevImage();
            } else {
                goToNextImage();
            }
        }

        document.removeEventListener('mouseup', handleMouseUp);
    };

    // Show loading state if images aren't loaded yet
    if (!imagesLoaded) {
        return (
            <section className="relative h-screen flex items-center justify-center bg-stone-100">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </section>
        );
    }

    // Show default background if no images available
    if (backgroundImages.length === 0) {
        return (
            <section className="relative h-screen flex items-center bg-gradient-to-r from-stone-200 to-stone-300">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20 z-10"></div>

                {/* Content */}
                <div className="container mx-auto px-4 relative text-gray-800 max-w-lg ml-16 rtl:mr-16 rtl:ml-0 z-20">
                    <div className="animate-fade-in-up">
                        <h1 className="font-cormorant font-light text-5xl md:text-6xl mb-4">
                            <FormattedMessage id="home.hero.title" />
                        </h1>
                        <p className="text-xl mb-8">
                            <FormattedMessage id="home.hero.subtitle" />
                        </p>
                        <Link
                            to="/gallery"
                            className="inline-block px-8 py-3 bg-amber-700 text-white uppercase text-sm tracking-wider transition-colors duration-300 hover:bg-gray-800"
                        >
                            <FormattedMessage id="home.cta.button" />
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            className="relative h-screen flex items-center overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
        >
            {/* Current active background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out z-0"
                style={{
                    backgroundImage: `url(${backgroundImages[activeIndex]})`,
                    opacity: isTransitioning ? 0 : 1
                }}
                aria-hidden="true"
            />

            {/* Next background that fades in */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out z-0"
                style={{
                    backgroundImage: `url(${backgroundImages[nextIndex]})`,
                    opacity: isTransitioning ? 1 : 0
                }}
                aria-hidden="true"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Navigation arrows - only show if multiple images */}
            {backgroundImages.length > 1 && (
                <>
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-20"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevImage();
                        }}
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-20"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNextImage();
                        }}
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Slide indicators - only show if multiple images */}
            {backgroundImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                    {backgroundImages.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === activeIndex ? 'bg-white w-4' : 'bg-white/50'
                            }`}
                            onClick={() => {
                                if (!isTransitioning && index !== activeIndex) {
                                    transitionToNextImage(index);
                                }
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4 relative text-white max-w-lg ml-16 rtl:mr-16 rtl:ml-0 z-20">
                <div className="animate-fade-in-up">
                    <h1 className="font-cormorant font-light text-5xl md:text-6xl mb-4">
                        <FormattedMessage id="home.hero.title" />
                    </h1>
                    <p className="text-xl mb-8">
                        <FormattedMessage id="home.hero.subtitle" />
                    </p>
                    <Link
                        to="/gallery"
                        className="inline-block px-8 py-3 bg-white text-gray-800 uppercase text-sm tracking-wider transition-colors duration-300 hover:bg-amber-700 hover:text-white"
                    >
                        <FormattedMessage id="home.cta.button" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;