import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PlaceholderPage() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const title = pathParts[pathParts.length - 1]
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="flex-1 p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
      <p className="text-sm text-gray-500">This module is under development.</p>
    </div>
  );
}
