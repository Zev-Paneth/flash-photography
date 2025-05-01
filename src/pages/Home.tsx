import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import ImageGalleryPreview from '../components/ImageGalleryPreview';
import MetaTags from '../components/MetaTags';
import HeroSection from '../components/HeroSection';

const Home: React.FC = () => {
    return (
        <div>
            <MetaTags
                title="Flash Photography | Professional Family & Newborn Photography"
                description="Capturing life's most precious moments with professional photography services for newborns, children, and families."
                keywords="photography, family photography, newborn photography, children photography, professional photographer"
            />

            {/* Hero Section */}
            <HeroSection />

            {/* Featured Work Section */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="font-cormorant text-4xl mb-12 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-px after:bg-amber-700 rtl:after:right-0 rtl:after:left-auto">
                    <FormattedMessage id="home.featured.title" defaultMessage="Featured Work" />
                </h2>
                <ImageGalleryPreview />
            </section>

            {/* About Section */}
            {/* About Section - Centered Version */}
            <section className="py-16 bg-stone-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-cormorant text-4xl mb-12 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-16 after:h-px after:bg-amber-700 after:-translate-x-1/2">
                            <FormattedMessage id="home.about.title" defaultMessage="About Me" />
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            <FormattedMessage id="home.about.paragraph1" defaultMessage="With over 3 years of experience, I specialize in capturing life's most precious moments through my lens." />
                        </p>
                        <p className="text-gray-600 mb-6 text-lg">
                            <FormattedMessage id="home.about.paragraph2" defaultMessage="My approach to photography is personal and intimate. I believe every family has a unique story, and I'm passionate about documenting these stories in a way that will be cherished for generations." />
                        </p>
                        <Link
                            to="/about"
                            className="inline-block mt-4 uppercase text-sm tracking-wider text-amber-700 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-amber-700 hover:text-amber-800 transition-colors duration-300"
                        >
                            <FormattedMessage id="home.about.readMore" defaultMessage="Read More" />
                        </Link>
                    </div>
                </div>
            </section>


            {/* Option 1: Elegant with decorative elements */}
            <section className="py-20 bg-stone-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto relative">
                        {/* Decorative elements */}
                        <div className="absolute -top-6 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-700/30"></div>
                        <div className="absolute -bottom-6 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-700/30"></div>

                        <div className="px-8 py-12">
                            <h2 className="font-cormorant text-4xl mb-12 text-center relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-16 after:h-px after:bg-amber-700 after:-translate-x-1/2">
                                <FormattedMessage id="home.about.title" defaultMessage="About Me" />
                            </h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                <FormattedMessage id="home.about.paragraph1" defaultMessage="With over 3 years of experience, I specialize in capturing life's most precious moments through my lens." />
                            </p>
                            <p className="text-gray-600 mb-6 text-lg">
                                <FormattedMessage id="home.about.paragraph2" defaultMessage="My approach to photography is personal and intimate. I believe every family has a unique story, and I'm passionate about documenting these stories in a way that will be cherished for generations." />
                            </p>
                            <div className="text-center mt-8">
                                <Link
                                    to="/about"
                                    className="inline-block px-8 py-3 uppercase text-sm tracking-wider text-amber-700 border border-amber-700 hover:bg-amber-700 hover:text-white transition-colors duration-300"
                                >
                                    <FormattedMessage id="home.about.readMore" defaultMessage="Read More" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Option 2: With background accent */}
            <section className="py-16 bg-stone-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-700/5 -skew-x-12 transform translate-x-1/4"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="font-cormorant text-4xl mb-12 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-px after:bg-amber-700 rtl:after:right-0 rtl:after:left-auto">
                            <FormattedMessage id="home.about.title" defaultMessage="About Me" />
                        </h2>
                        <div className="flex flex-col gap-6">
                            <p className="text-gray-600 text-lg">
                                <FormattedMessage id="home.about.paragraph1" defaultMessage="With over 3 years of experience, I specialize in capturing life's most precious moments through my lens." />
                            </p>
                            <p className="text-gray-600 text-lg">
                                <FormattedMessage id="home.about.paragraph2" defaultMessage="My approach to photography is personal and intimate. I believe every family has a unique story, and I'm passionate about documenting these stories in a way that will be cherished for generations." />
                            </p>
                            <Link
                                to="/about"
                                className="inline-block mt-4 uppercase text-sm tracking-wider text-amber-700 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-amber-700 w-fit"
                            >
                                <FormattedMessage id="home.about.readMore" defaultMessage="Read More" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Option 3: With quote styling */}
            <section className="py-20 bg-stone-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="font-cormorant text-4xl mb-12 text-center relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-16 after:h-px after:bg-amber-700 after:-translate-x-1/2">
                            <FormattedMessage id="home.about.title" defaultMessage="About Me" />
                        </h2>
                        <div className="relative px-8 py-6">
                            <div className="absolute top-0 left-0 text-6xl text-amber-700/20">"</div>
                            <div className="absolute bottom-0 right-0 text-6xl text-amber-700/20">"</div>
                            <p className="text-gray-600 mb-6 text-lg px-6">
                                <FormattedMessage id="home.about.paragraph1" defaultMessage="With over 3 years of experience, I specialize in capturing life's most precious moments through my lens." />
                            </p>
                            <p className="text-gray-600 mb-6 text-lg px-6">
                                <FormattedMessage id="home.about.paragraph2" defaultMessage="My approach to photography is personal and intimate. I believe every family has a unique story, and I'm passionate about documenting these stories in a way that will be cherished for generations." />
                            </p>
                            <div className="text-center mt-8">
                                <Link
                                    to="/about"
                                    className="inline-block mt-4 uppercase text-sm tracking-wider text-amber-700 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-amber-700"
                                >
                                    <FormattedMessage id="home.about.readMore" defaultMessage="Read More" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section with Icons */}
            <section className="py-16 bg-stone-50">
                <div className="container mx-auto px-4">
                    <h2 className="font-cormorant text-4xl mb-16 text-center relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-16 after:h-px after:bg-amber-700 after:-translate-x-1/2">
                        <FormattedMessage id="home.about.title" defaultMessage="About Me" />
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-12">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-amber-700/10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-cormorant text-2xl mb-3">Experience</h3>
                            <p className="text-gray-600">
                                With over 3 years of professional photography experience
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-amber-700/10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="font-cormorant text-2xl mb-3">Passion</h3>
                            <p className="text-gray-600">
                                Passionate about documenting unique family stories
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-amber-700/10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="font-cormorant text-2xl mb-3">Personal Touch</h3>
                            <p className="text-gray-600">
                                Creating intimate and personal photography experiences
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-gray-600 mb-8 text-lg">
                            <FormattedMessage id="home.about.paragraph2" defaultMessage="My approach to photography is personal and intimate. I believe every family has a unique story, and I'm passionate about documenting these stories in a way that will be cherished for generations." />
                        </p>
                        <Link
                            to="/about"
                            className="inline-block px-8 py-3 bg-amber-700 text-white uppercase text-sm tracking-wider hover:bg-amber-800 transition-colors duration-300"
                        >
                            <FormattedMessage id="home.about.readMore" defaultMessage="Read More" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section with Background Design */}
            <section className="py-16 bg-stone-50 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-48 h-48 bg-amber-700/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-700/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 relative">
                    <div className="max-w-2xl mx-auto bg-white p-10 shadow-sm">
                        <h2 className="font-cormorant text-4xl mb-12 text-center relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-16 after:h-px after:bg-amber-700 after:-translate-x-1/2">
                            <FormattedMessage id="home.about.title" defaultMessage="About Me" />
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            <FormattedMessage id="home.about.paragraph1" defaultMessage="With over 3 years of experience, I specialize in capturing life's most precious moments through my lens." />
                        </p>
                        <p className="text-gray-600 mb-6 text-lg">
                            <FormattedMessage id="home.about.paragraph2" defaultMessage="My approach to photography is personal and intimate. I believe every family has a unique story, and I'm passionate about documenting these stories in a way that will be cherished for generations." />
                        </p>
                        <div className="text-center mt-8">
                            <Link
                                to="/about"
                                className="inline-block mt-4 uppercase text-sm tracking-wider text-amber-700 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-amber-700"
                            >
                                <FormattedMessage id="home.about.readMore" defaultMessage="Read More" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 container mx-auto px-4 text-center">
                <h2 className="font-cormorant text-4xl mb-12 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-16 after:h-px after:bg-amber-700 after:-translate-x-1/2">
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