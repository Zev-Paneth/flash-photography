import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import MetaTags from '../components/MetaTags';
import storageService from '../services/storageService';

// Type definitions
interface Category {
    id: string;
    name: string;
}

interface GalleryImage {
    id: string;
    src: string;
    category: string;
    alt: string;
    fullPath?: string;
    width?: number;
    height?: number;
}

const Gallery: React.FC = () => {
    const categories: Category[] = [
        { id: 'all', name: 'All' },
        { id: 'newborn', name: 'Newborn' },
        { id: 'upshern', name: 'Upshern' },
        { id: 'indoor', name: 'Indoor' },
        { id: 'outdoor', name: 'Outdoor' },
    ];

    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [showLightbox, setShowLightbox] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string>('');
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
    const [loadError, setLoadError] = useState<boolean>(false);
    const [initialRenderComplete, setInitialRenderComplete] = useState<boolean>(false);

    // Track loaded images count to stabilize layout
    const imagesLoadedCount = useRef<number>(0);
    const lightboxRef = useRef<HTMLDivElement | null>(null);
    const imageCache = useRef<Set<string>>(new Set());
    const galleryContainerRef = useRef<HTMLDivElement | null>(null); // תיקון: הוסף semicolon

    // Load and shuffle images once
    useEffect(() => {
        const fetchImagesFromStorage = async () => {
            setImagesLoaded(false);
            setLoadError(false);

            try {
                // רשימת הקטגוריות שרוצים לטעון מהן תמונות
                const categoriesToFetch = ['newborn', 'upshern', 'indoor', 'outdoor'];

                // טוען את כל התמונות מכל הקטגוריות
                const images = await storageService.getAllImages(categoriesToFetch);

                // ממפה את התמונות מ-Storage לפורמט המתאים לגלריה
                const galleryImagesFromStorage: GalleryImage[] = images.map((image, index) => ({
                    id: `${image.category}-${index}`,
                    src: image.url,
                    category: image.category || 'uncategorized',
                    alt: `${image.category} photography - ${image.name}`,
                    fullPath: image.fullPath
                }));

                if (galleryImagesFromStorage.length === 0) {
                    console.warn('No images found in Firebase Storage. Check if images were uploaded correctly.');
                    setLoadError(true);
                    return;
                }

                // ערבוב התמונות לסדר אקראי
                const shuffledImages = [...galleryImagesFromStorage].sort(() => 0.5 - Math.random());
                setGalleryImages(shuffledImages);

                // טעינה מוקדמת של המקבץ הראשון
                const preloadBatch = async () => {
                    const visibleImages = shuffledImages.slice(0, 12);

                    const preloadPromises = visibleImages.map(image => {
                        return new Promise<void>((resolve) => {
                            const img = new Image();
                            img.src = image.src;
                            img.onload = () => {
                                imageCache.current.add(image.src);
                                resolve();
                            };
                            img.onerror = () => {
                                resolve();
                            };
                        });
                    });

                    await Promise.all(preloadPromises);
                    setImagesLoaded(true);
                };

                preloadBatch();

            } catch (error) {
                console.error('Error loading images from Firebase Storage:', error);
                setLoadError(true);
            }
        };

        fetchImagesFromStorage();
    }, []);

    // Mark initial render as complete after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialRenderComplete(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Update filtered images when category changes
    useEffect(() => {
        // Reset scroll position when changing categories to prevent jumping
        if (galleryContainerRef.current) {
            galleryContainerRef.current.scrollTop = 0;
        }

        // Apply category filter
        const newFilteredImages = activeCategory === 'all'
            ? galleryImages
            : galleryImages.filter(img => img.category === activeCategory);

        setFilteredImages(newFilteredImages);

        // Reset image load counter when category changes
        imagesLoadedCount.current = 0;
    }, [activeCategory, galleryImages]);

    const openLightbox = (imageSrc: string, index: number): void => {
        setCurrentImage(imageSrc);
        setCurrentImageIndex(index);
        setShowLightbox(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = (): void => {
        setShowLightbox(false);
        document.body.style.overflow = 'auto';
    };

    const goToNextImage = useCallback((): void => {
        if (filteredImages.length <= 1) return;
        const nextIndex = (currentImageIndex + 1) % filteredImages.length;
        setCurrentImageIndex(nextIndex);
        setCurrentImage(filteredImages[nextIndex].src);
    }, [currentImageIndex, filteredImages]);

    const goToPrevImage = useCallback((): void => {
        if (filteredImages.length <= 1) return;
        const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        setCurrentImageIndex(prevIndex);
        setCurrentImage(filteredImages[prevIndex].src);
    }, [currentImageIndex, filteredImages]);

    const handleKeyDown = useCallback((e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            goToNextImage();
        } else if (e.key === 'ArrowLeft') {
            goToPrevImage();
        }
    }, [goToNextImage, goToPrevImage]);

    // Attach and clean up event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [handleKeyDown]);

    // Handle image error - replace with a placeholder
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
        console.error('Image failed to load:', e.currentTarget.src);
        e.currentTarget.onerror = null; // Prevent infinite loop
    };

    // Track when an image is loaded to stabilize layout
    const handleImageLoad = useCallback(() => {
        imagesLoadedCount.current += 1;
    }, []);

    return (
        <div className="pt-20">
            <MetaTags
                title="Photography Gallery | Newborn, Upshern, Indoor & Outdoor Photos"
                description="Browse our collection of professional Newborn, Upshern, Indoor & Outdoor photography showcasing beautiful moments captured with love and care."
                keywords="photo gallery, newborn photography, upshern photography, indoor photography, outdoor photography, professional photographer"
            />

            {/* Page Header */}
            <div className="bg-stone-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-cormorant text-5xl mb-4">
                        <FormattedMessage id="gallery.title" defaultMessage="Gallery" />
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        <FormattedMessage id="gallery.description" defaultMessage="Browse through my portfolio showcasing beautiful moments captured with love and care." />
                    </p>
                </div>
            </div>

            {/* Gallery Category Filter */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${
                                activeCategory === category.id
                                    ? 'bg-amber-700 text-white'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {!imagesLoaded && (
                    <div className="text-center py-12">
                        <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading gallery...</p>
                    </div>
                )}

                {/* Error State */}
                {loadError && (
                    <div className="text-center py-12 text-amber-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="mb-2">There was a problem loading the gallery images.</p>
                        <button
                            className="bg-amber-700 text-white px-4 py-2 mt-2 hover:bg-amber-800 transition-colors"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </button>
                    </div>
                )}

                {/* Gallery Layout */}
                {imagesLoaded && !loadError && (
                    <div className="space-y-6" ref={galleryContainerRef}>
                        <div
                            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}
                            style={{
                                opacity: initialRenderComplete ? 1 : 0,
                                transition: 'opacity 0.3s ease-in'
                            }}
                        >
                            {filteredImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative aspect-square overflow-hidden bg-gray-100"
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        loading="lazy"
                                        onError={handleImageError}
                                        onLoad={handleImageLoad}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button
                                            className="px-4 py-2 border border-white text-white uppercase text-sm tracking-wider hover:bg-white hover:text-gray-800 transition-colors"
                                            onClick={() => openLightbox(image.src, index)}
                                        >
                                            <FormattedMessage id="gallery.viewLarger" defaultMessage="View Larger" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Images Message */}
                {imagesLoaded && !loadError && filteredImages.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No images found in this category.</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {showLightbox && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                    onClick={closeLightbox}
                    ref={lightboxRef}
                >
                    <div className="relative w-full max-w-6xl max-h-[90vh] px-12">
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-white hover:text-amber-500 transition-colors z-10"
                            onClick={closeLightbox}
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation buttons */}
                        {filteredImages.length > 1 && (
                            <>
                                <button
                                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 text-white hover:bg-amber-700 transition-colors rounded-r-md"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        goToPrevImage();
                                    }}
                                    aria-label="Previous image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 text-white hover:bg-amber-700 transition-colors rounded-l-md"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        goToNextImage();
                                    }}
                                    aria-label="Next image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Image container */}
                        <div className="h-[80vh] flex items-center justify-center">
                            <img
                                src={currentImage}
                                alt={filteredImages[currentImageIndex]?.alt || "Gallery image"}
                                className="max-h-full max-w-full object-contain mx-auto"
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                onError={handleImageError}
                            />
                        </div>

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                            {currentImageIndex + 1} / {filteredImages.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;