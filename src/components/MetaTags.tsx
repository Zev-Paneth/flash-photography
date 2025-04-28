import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaTagsProps {
    title: string;
    description: string;
    keywords?: string;
    imageUrl?: string;
    canonicalUrl?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
                                               title,
                                               description,
                                               keywords,
                                               imageUrl = '/images/og-default.jpg', // Default social sharing image
                                               canonicalUrl,
                                           }) => {
    // Base URL
    const siteUrl = window.location.origin;
    const currentUrl = canonicalUrl || window.location.href;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${imageUrl}`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${siteUrl}${imageUrl}`} />
        </Helmet>
    );
};

export default MetaTags;