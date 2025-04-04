import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  Globe,
  Hexagon,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const primaryNavItems = [
  { label: 'Shop', href: '/shop' },
  { label: 'Skills', href: '/skills' },
  { label: 'Stories', href: '/stories' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' }
];

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' }
];

const Navbar = ({ 
  cartCount = 0, 
  wishlistCount = 0, 
  onCartClick, 
  products = [],
  searchQuery,
  setSearchQuery
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    ).slice(0, 5);

    setSearchResults(filtered);
  }, [searchQuery, products]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
      setIsSigningOut(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div className="flex items-center">
            <Hexagon className="w-8 h-8 hidden lg:block" />
            <h1 className="text-xl font-bold lg:hidden">Sreeja's Finds</h1>
          </div>

          <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
            Sreeja's Finds
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block" ref={searchRef}>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`${
                    isSearchOpen 
                      ? 'w-64 pl-10 pr-4 py-2 border-gray-300' 
                      : 'w-0 p-0 border-transparent'
                  } transition-all duration-300 ease-in-out border rounded-full focus:outline-none focus:border-gray-400`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                />
                <button
                  className={`p-2 hover:bg-gray-100 rounded-full ${
                    isSearchOpen ? 'absolute left-2' : ''
                  }`}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 object-contain"
                      />
                      <div>
                        <h3 className="text-sm font-medium line-clamp-1">{product.title}</h3>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative hidden md:block">
              <button
                className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{selectedLanguage.code.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageDropdownOpen(false);
                      }}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              className="p-2 hover:bg-gray-100 rounded-full relative"
              onClick={onCartClick}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative" ref={userMenuRef}>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User className="w-5 h-5" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        {user.email}
                      </div>
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-opacity duration-300 ${
                          isSigningOut ? 'opacity-50' : 'opacity-100'
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        {isSigningOut ? 'Signing out...' : 'Sign out'}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Create account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:block border-t border-gray-100">
          <ul className="flex justify-center space-x-8 py-4">
            {primaryNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-4 py-2 space-y-1 border-t border-gray-100">
            {primaryNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;