import React from 'react'
import { formatRevenue } from '../../../utils/formatPrice';

const DashboardOverview = ({ title, amount, Icon, revenue = false }) => {
  const numericAmount = Number(amount ?? 0);
  const displayAmount = revenue ? formatRevenue(numericAmount) : numericAmount;

  const getIconColor = () => {
    if (title.includes('Products')) return 'from-purple-500 to-purple-600';
    if (title.includes('Orders')) return 'from-blue-500 to-blue-600';
    if (title.includes('Revenue')) return 'from-emerald-500 to-emerald-600';
    return 'from-slate-500 to-slate-600';
  };

  const getBackgroundGradient = () => {
    if (title.includes('Products')) return 'from-purple-50 to-purple-100';
    if (title.includes('Orders')) return 'from-blue-50 to-blue-100';
    if (title.includes('Revenue')) return 'from-emerald-50 to-emerald-100';
    return 'from-slate-50 to-slate-100';
  };

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300'>
      <div className='flex items-center justify-between mb-4'>
        <div className={`w-12 h-12 bg-gradient-to-br ${getIconColor()} rounded-xl flex items-center justify-center shadow-lg`}>
          {Icon && <Icon className='text-white text-xl' />}
        </div>
        <div className={`px-3 py-1 bg-gradient-to-r ${getBackgroundGradient()} rounded-full`}>
          <span className='text-xs font-medium text-slate-700'>Live</span>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='text-sm font-semibold text-slate-600 uppercase tracking-wide'>
          {title}
        </h3>
        <div className='flex items-baseline space-x-2'>
          <h1 className='text-3xl font-bold text-slate-900'>
            {revenue ? '$' : ''}{displayAmount}
          </h1>
          <div className='flex items-center space-x-1 text-emerald-600'>
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z' clipRule='evenodd' />
            </svg>
            <span className='text-xs font-medium'>+12%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;