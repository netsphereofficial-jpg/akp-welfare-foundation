'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useContent } from '@/context/ContentContext';
import EditableText from '@/components/editable/EditableText';

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/programs', label: 'Our Programs' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact Us' },
];

const programLinks = [
  { href: '/programs#education', label: 'Education Support' },
  { href: '/programs#food', label: 'Food Distribution' },
  { href: '/programs#healthcare', label: 'Medical Camps' },
  { href: '/programs#community', label: 'Community Welfare' },
];

const socialIconMap = [
  { icon: FaFacebookF, key: 'facebook' },
  { icon: FaTwitter, key: 'twitter' },
  { icon: FaInstagram, key: 'instagram' },
  { icon: FaLinkedinIn, key: 'linkedin' },
  { icon: FaYoutube, key: 'youtube' },
];

export default function Footer() {
  const { get, isEditMode } = useContent();

  const siteConfig = get('siteConfig') || {};
  const social = siteConfig.social || {};
  const registration = siteConfig.registration || {};

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-white text-xl font-bold font-heading">AKP Welfare</span>
            </div>
            {isEditMode ? (
              <EditableText
                contentPath="footer.tagline"
                as="p"
                className="text-sm leading-relaxed mb-6"
                multiline
              />
            ) : (
              <p className="text-sm leading-relaxed mb-6">
                {get('footer.tagline') || 'Empowering communities through education, nutrition, healthcare, and sustainable development since 2018.'}
              </p>
            )}
            <div className="flex gap-3">
              {socialIconMap.map((s, idx) => (
                <a
                  key={idx}
                  href={social[s.key] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Our Programs</h3>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <FaMapMarkerAlt className="text-primary-400 mt-1 shrink-0" />
                {isEditMode ? (
                  <EditableText contentPath="siteConfig.address" as="span" />
                ) : (
                  <span>{siteConfig.address}</span>
                )}
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaPhone className="text-primary-400 shrink-0" />
                {isEditMode ? (
                  <EditableText contentPath="siteConfig.phone" as="span" />
                ) : (
                  <span>{siteConfig.phone}</span>
                )}
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaEnvelope className="text-primary-400 shrink-0" />
                {isEditMode ? (
                  <EditableText contentPath="siteConfig.email" as="span" />
                ) : (
                  <span>{siteConfig.email}</span>
                )}
              </li>
            </ul>
            <Link
              href="/donate"
              className="mt-6 inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
            >
              <FaHeart className="text-xs" />
              Donate Now
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} AKP Welfare Foundation. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Reg: {registration.ngo}</span>
            <span className="mx-2">|</span>
            <span>80G Certified</span>
            <span className="mx-2">|</span>
            <span>FCRA Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
