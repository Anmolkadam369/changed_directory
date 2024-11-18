import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import claimproAssistLogo from '../../Assets/claimproassistwithoutName.jpg';
import './SplashScreen.css'; // Include CSS for star light effect

const SplashScreen = ({ onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 3000); // Display for 3 seconds

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div style={styles.container}>
      {/* Logo Container */}
      <div style={styles.logoWrapper}>
        <motion.img
          src={claimproAssistLogo}
          alt="ClaimPro Assist Logo"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1 }}
          style={styles.logo}
        />
        <div className="star-light-effect"></div>
      </div>

      {/* Logo Name */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={styles.title}
      >
        ClaimPro Assist
      </motion.h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  logoWrapper: {
    position: 'relative',
    width: '100px',
    height: '85px',
  },
  logo: {
    width: '90%',
    height: '80%',
    zIndex: 1,
  },
  title: {
    // marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    // fontFamily: 'Arial, sans-serif',
  },
};

export default SplashScreen;
