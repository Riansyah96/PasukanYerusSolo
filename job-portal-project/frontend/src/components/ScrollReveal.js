import React, { useEffect, useRef, useState } from 'react';

const animations = {
  fadeUp: { start: { opacity: 0, transform: 'translateY(40px)' }, end: { opacity: 1, transform: 'translateY(0)' } },
  fadeIn: { start: { opacity: 0 }, end: { opacity: 1 } },
  slideLeft: { start: { opacity: 0, transform: 'translateX(-60px)' }, end: { opacity: 1, transform: 'translateX(0)' } },
  slideRight: { start: { opacity: 0, transform: 'translateX(60px)' }, end: { opacity: 1, transform: 'translateX(0)' } },
  scaleIn: { start: { opacity: 0, transform: 'scale(0.9)' }, end: { opacity: 1, transform: 'scale(1)' } }
};

const ScrollReveal = ({ children, animation = 'fadeUp', delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const anim = animations[animation] || animations.fadeUp;
  const visibleStyle = {
    opacity: 1,
    transform: anim.end.transform || 'none',
    transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1)`
  };
  const hiddenStyle = {
    opacity: 0,
    transform: anim.start.transform || 'none',
    transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1)`
  };

  return (
    <div ref={ref} style={isVisible ? visibleStyle : hiddenStyle}>
      {children}
    </div>
  );
};

export default ScrollReveal;
