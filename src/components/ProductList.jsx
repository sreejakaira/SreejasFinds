import React from 'react';
import { Heart, Loader2, AlertCircle } from 'lucide-react';

const ProductList = ({ 
  products, 
  loading, 
  error, 
  wishlist,
  onToggleWishlist,
  onAddToCart 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="group flex flex-col bg-white rounded-lg overflow-hidden h-full"
        >
          {/* Image Container with Fixed Aspect Ratio */}
          <div className="relative pt-[100%] bg-gray-50">
            <div className="absolute inset-0 p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 space-y-2">
                {product.isNew && (
                  <div className="bg-black text-white text-xs px-2 py-1 rounded">
                    NEW
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    OUT OF STOCK
                  </div>
                )}
              </div>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                  wishlist.includes(product.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:scale-110 shadow-md'
                }`}
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Details with Consistent Height */}
          <div className="flex flex-col flex-grow p-4">
            <h3 className="font-medium text-sm mb-2 line-clamp-2 flex-grow">
              {product.title}
            </h3>
            
            <div className="mt-auto space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">${product.price.toFixed(2)}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{product.rating.rate}</span>
                  <span className="text-gray-400 ml-1">({product.rating.count})</span>
                </div>
              </div>
              
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
                className={`w-full py-2 rounded transition-colors ${
                  product.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;