import React from 'react';
import { Link } from 'react-router-dom';

const ImageGalleryPreview: React.FC = () => {
    // Placeholder for featured images
    const featuredImages = [
        { id: 1, src: '/images/featured/newborn1.jpg', alt: 'Newborn photography', category: 'newborn', link: '/gallery/newborn' },
        { id: 2, src: '/images/featured/family1.jpg', alt: 'Family photography', category: 'family', link: '/gallery/family' },
        { id: 3, src: '/images/featured/children1.jpg', alt: 'Children photography', category: 'children', link: '/gallery/children' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredImages.map(image => (
                <Link to={image.link} key={image.id} className="block group">
                    <div className="relative overflow-hidden aspect-square">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-white uppercase text-sm tracking-wider">{image.category}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ImageGalleryPreview;