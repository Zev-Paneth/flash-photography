import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import ImageGalleryPreview from '../components/ImageGalleryPreview';
import MetaTags from '../components/MetaTags';

const Home: React.FC = () => {
    return (
        <div>
            <MetaTags
                title="Flash Photography | Professional Family & Newborn Photography"
                description="Capturing life's most precious moments with professional photography services for newborns, children, and families."
                keywords="photography, family photography, newborn photography, children photography, professional photographer"
            />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center bg-cover bg-center" style={{backgroundImage: 'url(/images/hero-bg.jpg)'}}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="container mx-auto px-4 relative text-white max-w-lg ml-16 rtl:mr-16 rtl:ml-0 animate-fade-in-up">
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
            </section>

            {/* Featured Work Section */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="font-cormorant text-4xl mb-12 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-px after:bg-amber-700 after:-bottom-4 rtl:after:right-0 rtl:after:left-auto">
                    <FormattedMessage id="home.featured.title" defaultMessage="Featured Work" />
                </h2>
                <ImageGalleryPreview />
            </section>

            {/* About Section */}
            <section className="py-16 bg-stone-50">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    {/*<div className="w-full md:w-1/2">*/}
                    {/*    <img*/}
                    {/*        src="/images/photographer.jpg"*/}
                    {/*        alt="Photographer"*/}
                    {/*        className="w-full h-auto rounded-sm shadow-lg"*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="w-full md:w-1/2">
                        <h2 className="font-cormorant text-4xl mb-12 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-px after:bg-amber-700 after:-bottom-4 rtl:after:right-0 rtl:after:left-auto">
                            <FormattedMessage id="home.about.title" defaultMessage="About Me" />
                        </h2>
                        <p className="text-gray-600 mb-4">
                            <FormattedMessage id="home.about.paragraph1" defaultMessage="With over 3 years of experience, I specialize in capturing life's most precious moments through my lens." />
                        </p>
                        <p className="text-gray-600 mb-4">
                            <FormattedMessage id="home.about.paragraph2" defaultMessage="My approach to photography is personal and intimate. I believe every family has a unique story, and I'm passionate about documenting these stories in a way that will be cherished for generations." />
                        </p>
                        <Link
                            to="/about"
                            className="inline-block mt-4 uppercase text-sm tracking-wider text-amber-700 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-amber-700"
                        >
                            <FormattedMessage id="home.about.readMore" defaultMessage="Read More" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 container mx-auto px-4 text-center">
                <h2 className="font-cormorant text-4xl mb-12 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-16 after:h-px after:bg-amber-700 after:-bottom-4 after:-translate-x-1/2">
                    <FormattedMessage id="home.testimonials.title" defaultMessage="Client Testimonials" />
                </h2>
                <div className="max-w-2xl mx-auto">
                    <div className="mb-12">
                        <p className="font-cormorant text-2xl italic mb-6">
                            "Working with her was an absolute joy. She captured our family's personality perfectly, and the photos are beyond what we could have hoped for."
                        </p>
                        <p className="font-medium">— Esty & David</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;