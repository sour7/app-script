'use client';

import React, { useEffect, useState } from 'react';
import styles from './Productlist.module.css';
import FilterSidebar from '../FilterSidebar';
import ProductCard from '../ProductCard';

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
  isOutOfStock?: boolean;
}

export default function ProductList() {
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>('recommended');

  // Fetch data from Fakestore API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        // Map the data to our local interface
        const mappedData: Product[] = data.map((item: Product) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          description: item.description,
          price: item.price,
          category: item.category,
          rating: item.rating.rate,
        }));
        setProducts(mappedData);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  // Handle user changing "Recommended" sort dropdown
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSortOption(selectedValue);
    // If you want to sort the products array, do so here:
    // Example: sort by price low to high, etc.
  };

  return (
    <div className={styles.productListingPage}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.itemsCount}>
          {products.length} items
        </div>

        <button className={styles.hideFilterBtn} onClick={toggleFilter}>
          {showFilter ? 'Hide Filter' : 'Show Filter'}
        </button>

        {/* Recommended Dropdown */}
        <div className={styles.recommended}>
          <select
            className={styles.sortSelect}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest First</option>
            <option value="popular">Popular</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Content: Sidebar + Products Grid */}
      <div className={styles.contentWrapper}>
        {showFilter && (
          <aside className={styles.sidebar}>
            <FilterSidebar />
          </aside>
        )}

        <section className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
