import React from 'react';
import { FormattedMessage } from 'react-intl';
import MetaTags from '../components/MetaTags';

const About: React.FC = () => {
    return (
        <div className="pt-20">
            <MetaTags
                title="About Me | Flash Photography"
                description="Learn more about my journey, passion, and approach to photography."
                keywords="about, photographer, professional photography, family photographer"
            />

            {/* Page Header */}
            <div className="bg-stone-50 py-16 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-amber-700/5 rounded-full -translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-700/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 text-center relative">
                    <h1 className="font-cormorant text-5xl mb-4">
                        <FormattedMessage id="about.title" defaultMessage="About Me" />
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        <FormattedMessage id="about.subtitle" defaultMessage="Learn more about my journey, passion, and approach to photography." />
                    </p>
                </div>
            </div>

            {/* Values Section with Icons */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16">
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
                </div>
            </div>

            {/* Bio Section with White Box */}
            <div className="container mx-auto px-4 py-16 relative">
                {/* More background elements */}
                <div className="absolute top-40 right-20 w-32 h-32 bg-amber-700/5 rounded-full"></div>
                <div className="absolute bottom-40 left-20 w-40 h-40 bg-amber-700/5 rounded-full"></div>

                <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm relative z-10">
                    <h2 className="font-cormorant text-4xl mb-8 text-center relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-16 after:h-px after:bg-amber-700 after:-translate-x-1/2">
                        <FormattedMessage id="about.myStory" defaultMessage="My Story" />
                    </h2>
                    <div className="space-y-6 text-gray-600 text-lg">
                        <p>
                            <FormattedMessage
                                id="about.paragraph1"
                                defaultMessage="My journey in photography began over 3 years ago when I received my first DSLR camera as a gift. What started as a hobby quickly evolved into a passion that has since become my profession and life's work."
                            />
                        </p>
                        <p>
                            <FormattedMessage
                                id="about.paragraph2"
                                defaultMessage="I specialize in newborn, children, and family photography because I believe these fleeting moments are the most precious to capture. As a mother of two, I understand how quickly children grow and change, and I'm passionate about creating beautiful images that freeze these moments in time."
                            />
                        </p>
                        <p>
                            <FormattedMessage
                                id="about.paragraph3"
                                defaultMessage="My approach to photography is gentle, patient, and detail-oriented. I prioritize safety and comfort, especially when working with newborns, and I always take the time needed to create a relaxed environment where natural expressions and connections can shine through."
                            />
                        </p>
                        <p>
                            <FormattedMessage
                                id="about.paragraph4"
                                defaultMessage="Whether in my studio or on location, I focus on creating timeless, emotional images that tell your family's unique story. I believe that photography is not just about creating pretty pictures, but about preserving memories and connections that will be treasured for generations."
                            />
                        </p>
                    </div>
                </div>

                {/* Experience & Education Section */}
                <div className="mt-24 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-cormorant text-4xl mb-12 text-center relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-16 after:h-px after:bg-amber-700 after:-translate-x-1/2">
                            <FormattedMessage id="about.experience" defaultMessage="Experience & Education" />
                        </h2>

                        <div className="bg-white p-8 shadow-sm">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="border-l-4 border-amber-700/30 pl-6">
                                    <h3 className="font-cormorant text-2xl mb-3">
                                        <FormattedMessage id="about.certification" defaultMessage="Professional Photography Certification" />
                                    </h3>
                                    <p className="text-gray-600 mb-1">Antwerp Institute of Photography</p>
                                    <p className="text-amber-700">2020</p>
                                </div>

                                <div className="border-l-4 border-amber-700/30 pl-6">
                                    <h3 className="font-cormorant text-2xl mb-3">
                                        <FormattedMessage id="about.specialization" defaultMessage="Newborn Safety Specialization" />
                                    </h3>
                                    <p className="text-gray-600 mb-1">Baby Photography Academy</p>
                                    <p className="text-amber-700">2022</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="border-l-4 border-amber-700/30 pl-6">
                                    <h3 className="font-cormorant text-2xl mb-3">
                                        <FormattedMessage id="about.workshops" defaultMessage="Advanced Workshops" />
                                    </h3>
                                    <p className="text-gray-600">
                                        <FormattedMessage id="about.workshops.description" defaultMessage="Regularly attends workshops and masterclasses to stay current with the latest techniques and trends in photography." />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;