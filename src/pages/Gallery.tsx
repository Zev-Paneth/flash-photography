import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import MetaTags from '../components/MetaTags';

const Gallery: React.FC = () => {
    const categories = [
        { id: 'all', name: 'All' },
        { id: 'newborn', name: 'Newborn' },
        { id: 'children', name: 'Children' },
        { id: 'family', name: 'Family' },
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    // Sample gallery images
    const galleryImages = [
        { id: 1, src: '/images/gallery/newborn1.jpg', category: 'newborn', alt: 'Sleeping newborn baby' },
        { id: 2, src: '/images/gallery/newborn2.jpg', category: 'newborn', alt: 'Newborn in basket' },
        { id: 3, src: '/images/gallery/children1.jpg', category: 'children', alt: 'Child playing in field' },
        { id: 4, src: '/images/gallery/children2.jpg', category: 'children', alt: 'Children laughing' },
        { id: 5, src: '/images/gallery/family1.jpg', category: 'family', alt: 'Family at sunset' },
        { id: 6, src: '/images/gallery/family2.jpg', category: 'family', alt: 'Family in studio' },
        { id: 7, src: '/images/gallery/newborn3.jpg', category: 'newborn', alt: 'Newborn with parents' },
        { id: 8, src: '/images/gallery/children3.jpg', category: 'children', alt: 'Child portrait' },
        { id: 9, src: '/images/gallery/family3.jpg', category: 'family', alt: 'Family outdoors' },
    ];

    const filteredImages = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    return (
        <div className="pt-20">
            <MetaTags
                title="Photography Gallery | Newborn, Children & Family Photos"
                description="Browse our collection of professional newborn, children, and family photography showcasing beautiful moments captured with love and care."
                keywords="photo gallery, family photos, newborn photography, children portraits, professional photography"
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

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredImages.map(image => (
                        <div key={image.id} className="group">
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button className="px-4 py-2 border border-white text-white uppercase text-sm tracking-wider hover:bg-white hover:text-gray-800 transition-colors">
                                        <FormattedMessage id="gallery.viewLarger" defaultMessage="View Larger" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;