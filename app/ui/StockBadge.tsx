import React from 'react';
import { StockStatus, OrderStatus } from '../types/types';

export function StockBadge({ status, quantity }: { status: StockStatus; quantity?: number }) {
  if (status === 'out_of_stock') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        Out of Stock
      </span>
    );
  }

  if (status === 'low_stock') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        Low Stock {quantity !== undefined ? `(${quantity} left)` : ''}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      In Stock
    </span>
  );
}