import React from 'react';
import { FormattedMessage } from 'react-intl';

const About: React.FC = () => {
    return (
        <div className="pt-20">
            {/* Page Header */}
            <div className="bg-stone-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-cormorant text-5xl mb-4">
                        <FormattedMessage id="about.title" defaultMessage="About Me" />
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        <FormattedMessage id="about.subtitle" defaultMessage="Learn more about my journey, passion, and approach to photography." />
                    </p>
                </div>
            </div>

            {/* Bio Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="w-full md:w-1/3">
                        <img
                            src="/images/photographer.jpg"
                            alt="Photographer"
                            className="w-full h-auto rounded-sm shadow-lg"
                        />
                        <div className="mt-6 space-y-4">
                            <h3 className="font-cormorant text-2xl">
                                <FormattedMessage id="about.name" />
                            </h3>
                            <p className="text-gray-600">
                                <FormattedMessage id="about.title" defaultMessage="Professional Photographer" />
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="font-cormorant text-4xl mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-px after:bg-amber-700 after:-bottom-4 rtl:after:right-0 rtl:after:left-auto">
                            <FormattedMessage id="about.myStory" defaultMessage="My Story" />
                        </h2>
                        <div className="space-y-6 text-gray-600">
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

                        <h2 className="font-cormorant text-4xl mt-12 mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-px after:bg-amber-700 after:-bottom-4 rtl:after:right-0 rtl:after:left-auto">
                            <FormattedMessage id="about.experience" defaultMessage="Experience & Education" />
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium text-lg">
                                    <FormattedMessage id="about.certification" defaultMessage="Professional Photography Certification" />
                                </h3>
                                <p className="text-gray-600">Antwerp Institute of Photography, 2020</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-lg">
                                    <FormattedMessage id="about.specialization" defaultMessage="Newborn Safety Specialization" />
                                </h3>
                                <p className="text-gray-600">Baby Photography Academy, 2022</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-lg">
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
    );
};

export default About;