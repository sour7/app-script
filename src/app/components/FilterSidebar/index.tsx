'use client';

import React, { useState } from 'react';
import styles from './FilterSidebar.module.css';

// Filter category structure
interface FilterCategory {
  title: string;
  options: string[];
}

const FILTERS: FilterCategory[] = [
  {
    title: 'CUSTOMIZABLE',
    options: ['Yes', 'No'],
  },
  {
    title: 'IDEAL FOR',
    options: ['Men', 'Women', 'Baby & Kids'],
  },
  {
    title: 'OCCASION',
    options: ['All', 'Casual', 'Formal', 'Party'],
  },
  {
    title: 'AGE',
    options: ['All', '0-5', '5-10', '10-18', '18+'],
  },
  {
    title: 'FABRIC',
    options: ['Cotton', 'Denim', 'Wool', 'Silk'],
  },
  {
    title: 'SUITABLE FOR',
    options: ['Summer', 'Winter', 'All Seasons'],
  },
  {
    title: 'RAW MATERIALS',
    options: ['All', 'Natural Fibers', 'Synthetic Fibers'],
  },
  {
    title: 'PATTERN',
    options: ['Solid', 'Striped', 'Printed', 'Embroidered'],
  },
];

const FilterSidebar: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleToggle = (categoryTitle: string) => {
    setOpenCategory((prev) => (prev === categoryTitle ? null : categoryTitle));
  };

  return (
    <div className={styles.filterSidebar}>
      {FILTERS.map((filter) => (
        <div key={filter.title} className={styles.filterGroup}>
          <button
            className={styles.filterAccordion}
            onClick={() => handleToggle(filter.title)}
          >
            {filter.title}
            <span className={styles.chevron}>
              {openCategory === filter.title ? '▲' : '▼'}
            </span>
          </button>

          {openCategory === filter.title && (
            <div className={styles.filterOptions}>
              {filter.options.map((option) => (
                <label key={option} className={styles.optionLabel}>
                  <input
                    type="checkbox"
                    className={styles.optionCheckbox}
                    value={option}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
