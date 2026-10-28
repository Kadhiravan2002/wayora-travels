export interface ContactInfo {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  address: string;
  cityState: string;
  officeHours: string;
  mapsEmbedUrl: string;
  mapsShareUrl: string;
}

/**
 * Global Contact Configuration
 */
export const CONTACT_INFO: ContactInfo = {
  phone: '+91 63838 09269',
  phoneHref: 'tel:+916383809269',
  email: 'kadhiravan2026@gmail.com',
  emailHref: 'mailto:kadhiravan2026@gmail.com',
  address: 'Thangam Avenue, Chikkarayapuram, Kovur',
  cityState: 'Chennai, Tamil Nadu 600128',
  officeHours: 'Monday – Saturday: 9:30 AM – 6:30 PM',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2!2d80.1147!3d13.0139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261005653222b%3A0x2c9ce2623c7fb27e!2sThangam%20Avenue%20chikkarayapuram!5e0!3m2!1sen!2sin!4v1700000000000',
  mapsShareUrl: 'https://maps.app.goo.gl/ai7YazyuzqsKvJ1s6',
};
