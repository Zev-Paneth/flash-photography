import React, { useState, FormEvent } from 'react';
import { FormattedMessage } from 'react-intl';

const Contact: React.FC = () => {
    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState('');
    const [message, setMessage] = useState('');

    // Success message state
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Check if bookingInterest is in localStorage
    React.useEffect(() => {
        const bookingInterest = localStorage.getItem('bookingInterest');
        if (bookingInterest) {
            setService(bookingInterest);
            localStorage.removeItem('bookingInterest');
        }
    }, []);

    // Form submission handler
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Temporarily store the form data in localStorage
        const formData = {
            name,
            email,
            phone,
            service,
            message,
            submittedAt: new Date().toISOString()
        };

        // Store in localStorage - for demo purposes only
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        // Show success message
        setSuccessMessage('Thank you for your message! We will contact you soon.');

        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setService('');
        setMessage('');

        // Clear success message after 5 seconds
        setTimeout(() => {
            setSuccessMessage(null);
        }, 5000);
    };

    return (
        <div className="pt-20">
            {/* Page Header */}
            <div className="bg-stone-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-cormorant text-5xl mb-4">
                        <FormattedMessage id="contact.title" defaultMessage="Contact" />
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        <FormattedMessage id="contact.description" defaultMessage="Ready to book your session or have questions? Get in touch and I'll be happy to help." />
                    </p>
                </div>
            </div>

            {/* Contact Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-8 shadow-md">
                        <h2 className="font-cormorant text-3xl mb-6">
                            <FormattedMessage id="contact.form.title" defaultMessage="Send a Message" />
                        </h2>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="bg-green-50 border border-green-200 text-green-800 p-4 mb-6 rounded">
                                <p>{successMessage}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 font-medium">
                                    <FormattedMessage id="contact.form.name" defaultMessage="Full Name" />
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 focus:border-amber-700 focus:outline-none transition-colors"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 font-medium">
                                    <FormattedMessage id="contact.form.email" defaultMessage="Email Address" />
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 focus:border-amber-700 focus:outline-none transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 font-medium">
                                    <FormattedMessage id="contact.form.phone" defaultMessage="Phone Number" />
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full p-3 border border-gray-300 focus:border-amber-700 focus:outline-none transition-colors"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="service" className="block mb-2 font-medium">
                                    <FormattedMessage id="contact.form.service" defaultMessage="Service Interested In" />
                                </label>
                                <select
                                    id="service"
                                    className="w-full p-3 border border-gray-300 focus:border-amber-700 focus:outline-none transition-colors"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                >
                                    <option value="">
                                        <FormattedMessage id="contact.form.selectService" defaultMessage="Please select..." />
                                    </option>
                                    <option value="newborn">
                                        <FormattedMessage id="services.newborn.title" defaultMessage="Newborn Photography" />
                                    </option>
                                    <option value="upshern">
                                        <FormattedMessage id="services.upshern.title" defaultMessage="Upshern Photography" />
                                    </option>
                                    <option value="indoor">
                                        <FormattedMessage id="services.indoor.title" defaultMessage="Indoor Photography" />
                                    </option>
                                    <option value="outdoor">
                                        <FormattedMessage id="services.outdoor.title" defaultMessage="Outdoor Photography" />
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 font-medium">
                                    <FormattedMessage id="contact.form.message" defaultMessage="Your Message" />
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full p-3 border border-gray-300 focus:border-amber-700 focus:outline-none transition-colors"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-amber-700 text-white uppercase text-sm tracking-wider hover:bg-gray-800 transition-colors"
                            >
                                <FormattedMessage id="contact.form.send" defaultMessage="Send Message" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-stone-50 p-8">
                        <h2 className="font-cormorant text-3xl mb-6">
                            <FormattedMessage id="contact.info.title" defaultMessage="Contact Information" />
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium text-lg mb-2">
                                    <FormattedMessage id="contact.info.studio" defaultMessage="Studio Location" />
                                </h3>
                                <p className="text-gray-600">
                                    Flash Photography<br />
                                    Antwerp, Belgium
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-lg mb-2">
                                    <FormattedMessage id="contact.info.email" defaultMessage="Email" />
                                </h3>
                                <a href="mailto:panethch@gmail.com" className="text-amber-700 hover:underline">
                                    panethch@gmail.com
                                </a>
                            </div>

                            <div>
                                <h3 className="font-medium text-lg mb-2">
                                    <FormattedMessage id="contact.info.phone" defaultMessage="Phone" />
                                </h3>
                                <a href="tel:+32493942024" className="text-amber-700 hover:underline">
                                    +324 9394 2024
                                </a>
                            </div>

                            <div>
                                <h3 className="font-medium text-lg mb-2">
                                    <FormattedMessage id="contact.info.hours" defaultMessage="Studio Hours" />
                                </h3>
                                <p className="text-gray-600">
                                    Monday - Friday: 9am - 6pm<br />
                                    Sunday: By appointment
                                </p>
                            </div>

                            <div className="pt-4">
                                <h3 className="font-medium text-lg mb-4">
                                    <FormattedMessage id="contact.info.social" defaultMessage="Follow Me" />
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;