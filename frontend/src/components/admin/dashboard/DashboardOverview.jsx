
import React from 'react'
import { formatRevenue } from '../../../utils/formatPrice';

const DashboardOverview = ({ title, amount, Icon, revenue = false }) => {
  const numericAmount = Number(amount ?? 0); // ברירת מחדל 0, מספר נקי
  const displayAmount = revenue ? formatRevenue(numericAmount) : numericAmount;

  return (
    <div className='xl:w-80 w-full space-y-4 text-center md:text-start px-5 py-8'>
      <div className='flex md:justify-start justify-center items-center gap-2'>
        <h3 className='uppercase text-2xl text-slate-700 font-semibold'>{title}</h3>
        {Icon ? <Icon className='text-slate-800 text-2xl' /> : null}
      </div>

      <h1 className='font-bold text-slate-800 text-3xl'>
        {revenue ? "$" : null}{displayAmount}
      </h1>
    </div>
  );
};

export default DashboardOverview;
