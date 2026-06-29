import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const btnBase = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    color: isDark ? '#a8a29e' : '#57534e',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  };

  const activeBtn = {
    ...btnBase,
    background: '#ea580c',
    color: '#fff'
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4px',
      padding: '20px 0 10px'
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ ...btnBase, opacity: currentPage === 1 ? 0.4 : 1 }}
      >
        <ChevronLeftIcon style={{ width: '14px', height: '14px' }} />
      </button>
      {getPageNumbers().map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={p === currentPage ? activeBtn : btnBase}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ ...btnBase, opacity: currentPage === totalPages ? 0.4 : 1 }}
      >
        <ChevronRightIcon style={{ width: '14px', height: '14px' }} />
      </button>
    </div>
  );
};

export default Pagination;
