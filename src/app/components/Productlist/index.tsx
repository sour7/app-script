'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './Productlist.module.css';
import FilterSidebar from '../FilterSidebar';
import ProductCard from '../ProductCard';
import { BiChevronLeft, BiChevronRight, BiCheck, BiChevronDown } from 'react-icons/bi';
import useIsMobile from '../../hooks/useIsMobile';

export interface Product {
  id: number;
  label?: string;
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductList() {
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>('recommended');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [showOverlayFilter, setShowOverlayFilter] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: 'recommended', label: 'Recommended', image: '/images/recommended.png' },
    { value: 'newestFirst', label: 'Newest First', image: '/images/newest.png' },
    { value: 'popular', label: 'Popular', image: '/images/popular.png' },
    { value: 'priceLowToHigh', label: 'Price: Low to High', image: '/images/low-to-high.png' },
    { value: 'priceHighToLow', label: 'Price: High to Low', image: '/images/high-to-low.png' },
  ];

  const handleOptionClick = (value: string) => {
    setSortOption(value);
    handleSortChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>);
  };

  // Fetch data from Fakestore API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        const mappedData: Product[] = data.map((item: Product) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          description: item.description,
          price: item.price,
          category: item.category,
          rating: {
            rate: item.rating.rate,
            count: item.rating.count,
          },
        }));
        setProducts(mappedData);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const toggleOverlayFilter = () => {
    setShowOverlayFilter((prev) => !prev);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSortOption(selectedValue);
    const sortedProducts = [...products].sort((a, b) => {
      if (selectedValue === 'priceLowToHigh') {
        return a.price - b.price;
      } else if (selectedValue === 'priceHighToLow') {
        return b.price - a.price;
      } else if (selectedValue === 'ratingHighToLow') {
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      } else if (selectedValue === 'newestFirst') {
        return b.id - a.id;
      } else if (selectedValue === 'popular') {
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      }
      return 0;
    });
    setProducts(sortedProducts);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategory(categories);
  };

  const filteredProducts = products.filter((product) =>
    selectedCategory.length === 0 || selectedCategory.includes('All') || selectedCategory.includes(product.category)
  );

  return (
    <div className={styles.productListingPage}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.itemsCount}>
          {filteredProducts.length} items
        </div>
        <div className={styles.hideFilterBtn} onClick={toggleFilter}>
          {isMobile === false ? (
            showFilter ? (
              <span className={styles.filterBtnContent}>
                <BiChevronLeft size={30} />
                <span>Hide Filter</span>
              </span>
            ) : (
              <span className={styles.filterBtnContent}>
                <BiChevronRight size={30} />
                <span>Show Filter</span>
              </span>
            )
          ) : (
            <div className={styles.filterBtn} onClick={toggleOverlayFilter}>FILTERS</div>
          )}
        </div>

        {/* Recommended Dropdown */}
        <div className={styles.recommended} ref={dropdownRef}>
          <div className={styles.customDropdown}>
            <div className={styles.selectedOption}>
              <span>{sortOptions.find((option) => option.value === sortOption)?.label}</span>
              <BiChevronDown/>
            </div>
            <div className={styles.dropdownOptions}>
              {sortOptions.map((option) => (
                <div
                  key={option.value}
                  className={styles.dropdownOption}
                  onClick={() => handleOptionClick(option.value)}
                >
                   {sortOption === option.value && (
                    <BiCheck className={styles.tickIcon} />
                  )}
                  <span>{option.label}</span>
                 
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Products Grid */}
      <div className={styles.contentWrapper}>
        {showFilter && (
          <aside className={styles.sidebar}>
            {isMobile === false && <FilterSidebar onCategoryChange={handleCategoryChange} />}
          </aside>
        )}

        <section className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          {isMobile && showOverlayFilter && (
            <div className={styles.overlayFilter}>
              <FilterSidebar onCategoryChange={handleCategoryChange} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}