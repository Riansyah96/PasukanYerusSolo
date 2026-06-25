import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'page-transition-keyframes';
    style.textContent = `
      @keyframes pageEnter {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    if (!document.getElementById('page-transition-keyframes')) {
      document.head.appendChild(style);
    }
    return () => {
      const existing = document.getElementById('page-transition-keyframes');
      if (existing) existing.remove();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.animation = 'none';
      void containerRef.current.offsetHeight;
      containerRef.current.style.animation = 'pageEnter 0.35s ease-out';
    }
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      style={{
        willChange: 'opacity, transform',
        animation: 'pageEnter 0.35s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
