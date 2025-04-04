import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const sortOptions = ['Recommended', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

const ProductFilters = ({
  productsCount,
  isFilterOpen,
  selectedSort,
  onFilterToggle,
  onSortChange
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">{productsCount} ITEMS</span>
        <button
          onClick={onFilterToggle}
          className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <Filter className="w-4 h-4" />
          <span>{isFilterOpen ? 'HIDE FILTER' : 'SHOW FILTER'}</span>
        </button>
      </div>

      <div className="relative">
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-transparent border-b border-gray-300 py-1 pr-8 text-sm font-medium focus:outline-none focus:border-gray-900"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
      </div>
    </div>
  );
};

export default ProductFilters;