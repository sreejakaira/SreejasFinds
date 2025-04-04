import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Collapse,
  FormGroup,
  Slider,
  Button,
} from '@mui/material';
import { ChevronDown, X } from 'lucide-react';

const categories = [
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery"
];

const fabrics = [
  { id: 'cotton', label: 'Cotton', keywords: ['cotton', 'cotton blend'] },
  { id: 'leather', label: 'Leather', keywords: ['leather', 'faux leather', 'pu leather'] },
  { id: 'polyester', label: 'Polyester', keywords: ['polyester', 'poly'] },
  { id: 'wool', label: 'Wool', keywords: ['wool', 'merino', 'cashmere'] },
  { id: 'silk', label: 'Silk', keywords: ['silk'] }
];

const ratings = [
  { value: '4+', label: '4+ Stars' },
  { value: '3+', label: '3+ Stars' },
  { value: '2+', label: '2+ Stars' }
];

const FilterSidebar = ({ isOpen, onFilterChange }) => {
  const [expanded, setExpanded] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    updateFilters(newCategories, selectedFabrics, selectedRatings, priceRange);
  };

  const handleFabricChange = (fabricId) => {
    const newFabrics = selectedFabrics.includes(fabricId)
      ? selectedFabrics.filter(f => f !== fabricId)
      : [...selectedFabrics, fabricId];
    
    setSelectedFabrics(newFabrics);
    updateFilters(selectedCategories, newFabrics, selectedRatings, priceRange);
  };

  const handleRatingChange = (rating) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    
    setSelectedRatings(newRatings);
    updateFilters(selectedCategories, selectedFabrics, newRatings, priceRange);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    updateFilters(selectedCategories, selectedFabrics, selectedRatings, newValue);
  };

  const updateFilters = (categories, fabrics, ratings, price) => {
    onFilterChange({
      categories,
      fabrics,
      ratings,
      priceRange: price
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedRatings([]);
    setPriceRange([0, 1000]);
    updateFilters([], [], [], [0, 1000]);
  };

  const hasActiveFilters = () => {
    return selectedCategories.length > 0 || 
           selectedFabrics.length > 0 ||
           selectedRatings.length > 0 || 
           priceRange[0] !== 0 || 
           priceRange[1] !== 1000;
  };

  return (
    <Collapse in={isOpen} orientation="horizontal">
      <Box
        sx={{
          width: 280,
          bgcolor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          height: '100%',
          position: 'sticky',
          top: 0,
          pt: 2,
          pb: 4,
          overflowY: 'auto'
        }}
      >
        <Box sx={{ px: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 16 }}>
            FILTERS
          </Typography>
          {hasActiveFilters() && (
            <Button
              startIcon={<X size={16} />}
              onClick={clearAllFilters}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              Clear All
            </Button>
          )}
        </Box>

        <Accordion
          expanded={expanded === 'category'}
          onChange={handleAccordionChange('category')}
          elevation={0}
          sx={{
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={20} />}
            sx={{ px: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                CATEGORY
              </Typography>
              {selectedCategories.length > 0 && (
                <Typography sx={{ fontSize: 12, color: 'text.secondary', ml: 1 }}>
                  ({selectedCategories.length})
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      size="small"
                      sx={{
                        '&.Mui-checked': {
                          color: 'black',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 14, textTransform: 'capitalize' }}>
                      {category}
                    </Typography>
                  }
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'fabric'}
          onChange={handleAccordionChange('fabric')}
          elevation={0}
          sx={{
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={20} />}
            sx={{ px: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                FABRIC
              </Typography>
              {selectedFabrics.length > 0 && (
                <Typography sx={{ fontSize: 12, color: 'text.secondary', ml: 1 }}>
                  ({selectedFabrics.length})
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
            <FormGroup>
              {fabrics.map((fabric) => (
                <FormControlLabel
                  key={fabric.id}
                  control={
                    <Checkbox
                      checked={selectedFabrics.includes(fabric.id)}
                      onChange={() => handleFabricChange(fabric.id)}
                      size="small"
                      sx={{
                        '&.Mui-checked': {
                          color: 'black',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 14 }}>
                      {fabric.label}
                    </Typography>
                  }
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'price'}
          onChange={handleAccordionChange('price')}
          elevation={0}
          sx={{
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={20} />}
            sx={{ px: 2 }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
              PRICE RANGE
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
            <Box sx={{ px: 1 }}>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                sx={{
                  color: 'black',
                  '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.16)',
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography sx={{ fontSize: 12 }}>${priceRange[0]}</Typography>
                <Typography sx={{ fontSize: 12 }}>${priceRange[1]}</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'rating'}
          onChange={handleAccordionChange('rating')}
          elevation={0}
          sx={{
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown size={20} />}
            sx={{ px: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                RATING
              </Typography>
              {selectedRatings.length > 0 && (
                <Typography sx={{ fontSize: 12, color: 'text.secondary', ml: 1 }}>
                  ({selectedRatings.length})
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
            <FormGroup>
              {ratings.map((rating) => (
                <FormControlLabel
                  key={rating.value}
                  control={
                    <Checkbox
                      checked={selectedRatings.includes(rating.value)}
                      onChange={() => handleRatingChange(rating.value)}
                      size="small"
                      sx={{
                        '&.Mui-checked': {
                          color: 'black',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 14 }}>
                      {rating.label}
                    </Typography>
                  }
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Collapse>
  );
};

export default FilterSidebar;