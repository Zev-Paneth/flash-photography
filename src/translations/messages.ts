// Define types for translation messages
type MessageRecord = Record<string, string>;

// English messages
const en: MessageRecord = {
    'about.name': 'Chani Paneth',

    // Navigation
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.about': 'About',

    // Home page
    'home.hero.title': 'Capturing Life\'s Precious Moments',
    'home.hero.subtitle': 'Professional photography services for newborns, children, and families',
    'home.cta.button': 'View Gallery',
    'home.featured.title': 'Featured Work',
    'home.about.title': 'About Me',
    'home.about.paragraph1': 'With over 3 years of experience, I specialize in capturing life\'s most precious moments through my lens.',
    'home.about.paragraph2': 'My approach to photography is personal and intimate. I believe every family has a unique story, and I\'m passionate about documenting these stories in a way that will be cherished for generations.',
    'home.about.readMore': 'Read More',
    'home.testimonials.title': 'Client Testimonials',

    // Gallery page
    'gallery.title': 'Gallery',
    'gallery.description': 'Browse through my portfolio showcasing beautiful moments captured with love and care.',
    'gallery.viewLarger': 'View Larger',

    // Services page
    'services.title': 'Services',
    'services.description': 'Professional photography services tailored to capture the beauty of every stage of life.',
    'services.includes': 'Session Includes:',
    'services.bookNow': 'Book Now',

    // Services details
    'services.newborn.title': 'Newborn Photography',
    'services.newborn.description': 'Capture the precious first days of your baby\'s life with a gentle, professional photoshoot designed specifically for newborns.',
    'services.newborn.includes.1': 'Safety-focused posing',
    'services.newborn.includes.2': 'Various setups and props',
    'services.newborn.includes.3': 'Family and sibling photos',
    'services.newborn.includes.4': 'Edited digital images',

    'services.children.title': 'Children Photography',
    'services.children.description': 'Fun and natural photoshoots that capture your child\'s personality and spirit, creating timeless portraits.',
    'services.children.includes.1': 'Playful guidance for natural expressions',
    'services.children.includes.2': 'Indoor or outdoor sessions',
    'services.children.includes.3': 'Wardrobe consultation',
    'services.children.includes.4': 'Professionally edited images',

    'services.family.title': 'Family Photography',
    'services.family.description': 'Beautiful family portraits that document your connection and create heirlooms to be cherished for generations.',
    'services.family.includes.1': 'Relaxed, guided posing',
    'services.family.includes.2': 'Studio or location options',
    'services.family.includes.3': 'Group and individual portraits',
    'services.family.includes.4': 'High resolution digital files',

    // Contact page
    'contact.title': 'Contact',
    'contact.description': 'Ready to book your session or have questions? Get in touch and I\'ll be happy to help.',
    'contact.form.title': 'Send a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.service': 'Service Interested In',
    'contact.form.selectService': 'Please select...',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.studio': 'Studio Location',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.hours': 'Studio Hours',
    'contact.info.social': 'Follow Me',

    // Footer
    'footer.tagline': 'Capturing life\'s most precious moments with an artistic touch and professional care.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact Info',
    'footer.copyright': '© 2025 Flash Photography. All rights reserved.'
};

// Hebrew messages
const he: MessageRecord = {
    // Navigation
    'nav.home': 'דף הבית',
    'nav.gallery': 'גלריה',
    'nav.services': 'שירותים',
    'nav.contact': 'צור קשר',
    'nav.about': 'אודות',

    // Home page
    'home.hero.title': 'מנציחים את הרגעים היקרים בחיים',
    'home.hero.subtitle': 'שירותי צילום מקצועיים לתינוקות, ילדים ומשפחות',
    'home.cta.button': 'לצפייה בגלריה',
    'home.featured.title': 'עבודות נבחרות',
    'home.about.title': 'קצת עליי',
    'home.about.paragraph1': 'עם ניסיון של למעלה מ-10 שנים, אני מתמחה בלתפוס את הרגעים היקרים ביותר בחיים דרך העדשה שלי.',
    'home.about.paragraph2': 'הגישה שלי לצילום היא אישית ואינטימית. אני מאמינה שלכל משפחה יש סיפור ייחודי, ואני מתמסרת לתעד את הסיפורים הללו באופן שיישמר לדורות.',
    'home.about.readMore': 'קרא עוד',
    'home.testimonials.title': 'מה הלקוחות אומרים',

    // Gallery page
    'gallery.title': 'גלריה',
    'gallery.description': 'צפו בתיק העבודות שלי המציג רגעים יפים שנתפסו באהבה ובדאגה.',
    'gallery.viewLarger': 'להגדלה',

    // Services page
    'services.title': 'שירותים',
    'services.description': 'שירותי צילום מקצועיים המותאמים לתפוס את היופי בכל שלב בחיים.',
    'services.includes': 'הפגישה כוללת:',
    'services.bookNow': 'הזמן עכשיו',

    // Services details
    'services.newborn.title': 'צילום ילודים',
    'services.newborn.description': 'הנציחו את הימים הראשונים היקרים של תינוקכם עם צילום מקצועי עדין המותאם במיוחד לילודים.',
    'services.newborn.includes.1': 'תנוחות בהתמקדות על בטיחות',
    'services.newborn.includes.2': 'מגוון סטים ואביזרים',
    'services.newborn.includes.3': 'צילומי משפחה ואחים',
    'services.newborn.includes.4': 'תמונות דיגיטליות ערוכות',

    'services.children.title': 'צילומי ילדים',
    'services.children.description': 'צילומים כיפיים וטבעיים שתופסים את האישיות והרוח של ילדכם, ויוצרים תמונות נצחיות.',
    'services.children.includes.1': 'הדרכה משחקית להבעות טבעיות',
    'services.children.includes.2': 'צילומים בפנים או בחוץ',
    'services.children.includes.3': 'ייעוץ מלתחה',
    'services.children.includes.4': 'תמונות ערוכות מקצועית',

    'services.family.title': 'צילומי משפחה',
    'services.family.description': 'פורטרטים משפחתיים יפים שמתעדים את הקשר שלכם ויוצרים נכסים שיישמרו לדורות.',
    'services.family.includes.1': 'תנוחות מונחות ורגועות',
    'services.family.includes.2': 'אפשרויות לסטודיו או לוקיישן',
    'services.family.includes.3': 'פורטרטים קבוצתיים ואישיים',
    'services.family.includes.4': 'קבצים דיגיטליים באיכות גבוהה',

    // Contact page
    'contact.title': 'צור קשר',
    'contact.description': 'מוכנים להזמין פגישה או יש לכם שאלות? צרו קשר ואשמח לעזור.',
    'contact.form.title': 'שלח הודעה',
    'contact.form.name': 'שם מלא',
    'contact.form.email': 'כתובת אימייל',
    'contact.form.phone': 'מספר טלפון',
    'contact.form.service': 'שירות שמעניין אותך',
    'contact.form.selectService': 'אנא בחר...',
    'contact.form.message': 'ההודעה שלך',
    'contact.form.send': 'שלח הודעה',
    'contact.info.title': 'פרטי התקשרות',
    'contact.info.studio': 'מיקום הסטודיו',
    'contact.info.email': 'אימייל',
    'contact.info.phone': 'טלפון',
    'contact.info.hours': 'שעות פעילות',
    'contact.info.social': 'עקבו אחריי',

    // Footer
    'footer.tagline': 'מנציחים את הרגעים היקרים בחיים עם נגיעה אמנותית וטיפול מקצועי.',
    'footer.quickLinks': 'קישורים מהירים',
    'footer.services': 'שירותים',
    'footer.contact': 'פרטי התקשרות',
    'footer.copyright': '© 2025 סטודיו לצילום. כל הזכויות שמורות.'
};

// Flemish (Dutch) messages
const nl: MessageRecord = {
    // Navigation
    'nav.home': 'Home',
    'nav.gallery': 'Galerij',
    'nav.services': 'Diensten',
    'nav.contact': 'Contact',
    'nav.about': 'Over Ons',

    // Home page
    'home.hero.title': 'Kostbare Momenten Vastleggen',
    'home.hero.subtitle': 'Professionele fotografie voor pasgeborenen, kinderen en families',
    'home.cta.button': 'Bekijk Galerij',
    'home.featured.title': 'Uitgelicht Werk',
    'home.about.title': 'Over Mij',
    'home.about.paragraph1': 'Met meer dan 10 jaar ervaring ben ik gespecialiseerd in het vastleggen van de meest kostbare momenten door mijn lens.',
    'home.about.paragraph2': 'Mijn benadering van fotografie is persoonlijk en intiem. Ik geloof dat elke familie een uniek verhaal heeft, en ik ben gepassioneerd om deze verhalen vast te leggen op een manier die generaties lang gekoesterd zal worden.',
    'home.about.readMore': 'Lees Meer',
    'home.testimonials.title': 'Klantervaringen',

    // Gallery page
    'gallery.title': 'Galerij',
    'gallery.description': 'Blader door mijn portfolio met prachtige momenten, vastgelegd met liefde en zorg.',
    'gallery.viewLarger': 'Vergroot Weergave',

    // Services page
    'services.title': 'Diensten',
    'services.description': 'Professionele fotografie op maat om de schoonheid van elke levensfase vast te leggen.',
    'services.includes': 'Sessie Omvat:',
    'services.bookNow': 'Nu Boeken',

    // Services details
    'services.newborn.title': 'Pasgeboren Fotografie',
    'services.newborn.description': 'Leg de kostbare eerste dagen van je baby vast met een zachte, professionele fotoshoot speciaal ontworpen voor pasgeborenen.',
    'services.newborn.includes.1': 'Veilige positionering',
    'services.newborn.includes.2': 'Verschillende opstellingen en rekwisieten',
    'services.newborn.includes.3': 'Familie- en siblingfoto\'s',
    'services.newborn.includes.4': 'Bewerkte digitale beelden',

    'services.children.title': 'Kinderfotografie',
    'services.children.description': 'Leuke en natuurlijke fotoshoots die de persoonlijkheid en geest van je kind vastleggen, voor tijdloze portretten.',
    'services.children.includes.1': 'Speelse begeleiding voor natuurlijke expressies',
    'services.children.includes.2': 'Binnen- of buitensessies',
    'services.children.includes.3': 'Garderobeadvies',
    'services.children.includes.4': 'Professioneel bewerkte beelden',

    'services.family.title': 'Familiefotografie',
    'services.family.description': 'Prachtige familieportretten die jullie band vastleggen en erfstukken creëren om generaties lang te koesteren.',
    'services.family.includes.1': 'Ontspannen, begeleide posering',
    'services.family.includes.2': 'Studio- of locatieopties',
    'services.family.includes.3': 'Groeps- en individuele portretten',
    'services.family.includes.4': 'Digitale bestanden in hoge resolutie',

    // Contact page
    'contact.title': 'Contact',
    'contact.description': 'Klaar om een sessie te boeken of heb je vragen? Neem contact op en ik help je graag verder.',
    'contact.form.title': 'Stuur een Bericht',
    'contact.form.name': 'Volledige Naam',
    'contact.form.email': 'E-mailadres',
    'contact.form.phone': 'Telefoonnummer',
    'contact.form.service': 'Interesse in Dienst',
    'contact.form.selectService': 'Selecteer alstublieft...',
    'contact.form.message': 'Jouw Bericht',
    'contact.form.send': 'Verstuur Bericht',
    'contact.info.title': 'Contactinformatie',
    'contact.info.studio': 'Studioadres',
    'contact.info.email': 'E-mail',
    'contact.info.phone': 'Telefoon',
    'contact.info.hours': 'Studio-uren',
    'contact.info.social': 'Volg Mij',

    // Footer
    'footer.tagline': 'Het vastleggen van de meest kostbare momenten in het leven met een artistieke touch en professionele zorg.',
    'footer.quickLinks': 'Snelle Links',
    'footer.services': 'Diensten',
    'footer.contact': 'Contactinfo',
    'footer.copyright': '© 2025 Fotostudio. Alle rechten voorbehouden.'
};

// Export the messages object with all supported languages
const messages = {
    en,
    he,
    nl
};

export default messages;