import React from "react";
import styles from "./Navbar.module.css";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiGrid,
  FiMenu,
} from "react-icons/fi";

const Navbar: React.FC = () => {
  return (
    <>
      {/* Top Black Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarItem}>
          <FiGrid className={styles.icon} />
          <span>Lorem ipsum dolor</span>
        </div>
        {/* Other items are still in DOM, but will be hidden via CSS */}
        <div className={styles.topBarItem}>
          <FiGrid className={styles.icon} />
          <span>Lorem ipsum dolor</span>
        </div>
        <div className={styles.topBarItem}>
          <FiGrid className={styles.icon} />
          <span>Lorem ipsum dolor</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className={styles.headerRow}>
        <div className={styles.logoSection}>
          <FiMenu className={styles.hamburgerIcon} />
          <img src="/logo.svg" alt="Logo" className={styles.logoIcon} />
        </div>

        <div className={styles.centerLogoText}>LOGO</div>

        <div className={styles.iconSection}>
          <FiSearch />
          <FiHeart />
          <FiShoppingBag />
          <FiUser className={styles.userIcon} />
          <span className={styles.language}>
            ENG <span>▾</span>
          </span>
        </div>
      </div>

      {/* Navigation Links Row */}
      <nav className={styles.navLinksRow}>
        <ul className={styles.navLinks}>
          <li><a href="#">Shop</a></li>
          <li><a href="#">Skills</a></li>
          <li><a href="#">Stories</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
