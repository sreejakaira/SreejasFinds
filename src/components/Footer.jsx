import React, { useState } from 'react';
import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer className="bg-[#282828] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <h3 className="text-xl font-bold mb-4">BE THE FIRST TO KNOW</h3>
          <p className="text-gray-300 mb-6">
            Sign up for updates from mettā muse and receive 10% off your first order.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your e-mail..."
              className="flex-1 bg-transparent border border-gray-600 px-4 py-2 rounded focus:outline-none focus:border-white transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Contact Section */}
          <div>
            <h4 className="font-bold mb-6">CONTACT US</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+44 221 133 5360</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>customercare@mettamuse.com</span>
              </div>
              <div className="mt-6">
                <h5 className="font-bold mb-2">CURRENCY</h5>
                <p className="text-sm">USD</p>
                <p className="text-xs text-gray-400">Transactions will be completed in Euros and a currency reference is available on hover.</p>
              </div>
            </div>
          </div>

          {/* mettā muse Links */}
          <div>
            <h4 className="font-bold mb-6">mettā muse</h4>
            <ul className="space-y-3 text-gray-300">
              {['About Us', 'Stories', 'Artisans', 'Boutiques', 'Contact Us', 'EU Compliance Docs'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight size={16} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6">QUICK LINKS</h4>
            <ul className="space-y-3 text-gray-300">
              {[
                'Orders & Shipping',
                'Join/Login as a Seller',
                'Payment & Pricing',
                'Return & Refunds',
                'FAQs',
                'Privacy Policy',
                'Terms & Conditions'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                    <ChevronRight size={16} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us & Payment Methods */}
          <div>
            <div className="mb-8">
              <h4 className="font-bold mb-4">FOLLOW US</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">mettā muse ACCEPTS</h4>
              <div className="flex flex-wrap gap-3">
                <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlepay.svg" alt="Google Pay" className="w-10 h-10 invert" />
                <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/applepay.svg" alt="Apple Pay" className="w-10 h-10 invert" />
                <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/visa.svg" alt="Visa" className="w-10 h-10 invert" />
                <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mastercard.svg" alt="Mastercard" className="w-10 h-10 invert" />
                <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/americanexpress.svg" alt="American Express" className="w-10 h-10 invert" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 pt-8 border-t border-gray-700">
          <p>Copyright © 2023 mettamuse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;