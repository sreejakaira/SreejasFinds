import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import "./index.css";
import "./App.css";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FilterSidebar from './components/FilterSidebar';
import ProductList from './components/ProductList';
import ProductFilters from './components/ProductFilters';
import Footer from './components/Footer';
import { useAuth } from './contexts/AuthContext';

const MainLayout = () => {
  const { currentUser, logout } = useAuth();
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedSort, setSelectedSort] = useState('Recommended');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      const enhancedData = data.map((product) => ({
        ...product,
        stock: Math.floor(Math.random() * 50),
        isNew: Math.random() > 0.8,
        customizable: Math.random() > 0.7
      }));
      setProducts(enhancedData);
      setFilteredProducts(enhancedData);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = useMemo(() => {
    if (!searchQuery.trim()) return filteredProducts;

    const query = searchQuery.toLowerCase();
    return filteredProducts.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [searchQuery, filteredProducts]);

  const detectFabric = (description) => {
    const fabricKeywords = {
      cotton: ['cotton', 'cotton blend'],
      leather: ['leather', 'faux leather', 'pu leather'],
      polyester: ['polyester', 'poly'],
      wool: ['wool', 'merino', 'cashmere'],
      silk: ['silk']
    };

    const detectedFabrics = [];
    const lowerDesc = description.toLowerCase();

    for (const [fabric, keywords] of Object.entries(fabricKeywords)) {
      if (keywords.some(keyword => lowerDesc.includes(keyword))) {
        detectedFabrics.push(fabric);
      }
    }

    return detectedFabrics;
  };

  const handleFilterChange = ({ categories, fabrics, ratings, priceRange }) => {
    const filtered = products.filter(product => {
      if (categories.length > 0 && !categories.includes(product.category)) {
        return false;
      }

      if (fabrics.length > 0) {
        const productFabrics = detectFabric(product.description);
        if (!fabrics.some(fabric => productFabrics.includes(fabric))) {
          return false;
        }
      }

      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      if (ratings.length > 0) {
        const productRating = product.rating.rate;
        const meetsRating = ratings.some(rating => {
          const minRating = parseInt(rating);
          return productRating >= minRating;
        });
        if (!meetsRating) return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const sortedProducts = [...searchProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Most Popular':
        return b.rating.count - a.rating.count;
      case 'Newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar 
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-contain"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">${item.price}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 border"
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 border"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-black text-white py-3 hover:bg-gray-800 transition">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Discover Our Products</h1>
          <p className="text-gray-600">
            Explore our curated collection of premium products designed to elevate your lifestyle.
            Each item is carefully selected to ensure the highest quality and satisfaction.
          </p>
        </div>

        <ProductFilters
          productsCount={sortedProducts.length}
          isFilterOpen={isFilterOpen}
          selectedSort={selectedSort}
          onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
          onSortChange={setSelectedSort}
        />

        <div className="flex gap-8">
          <FilterSidebar 
            isOpen={isFilterOpen}
            onFilterChange={handleFilterChange}
          />

          <div className="flex-1">
            <ProductList
              products={sortedProducts}
              loading={loading}
              error={error}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onAddToCart={addToCart}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;