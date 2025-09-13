import React from 'react'
import DashboardOverview from './DashboardOverview'
import { FaBoxOpen, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../shared/Loader';
import ErrorPage from '../../shared/ErrorPage';
import { analyticsAction } from '../../../store/actions';
import { useEffect } from 'react';
import { FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user } = useSelector(state => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  const {
    analytics: {
      productCount,
      totalRevenue,
      totalOrders
    }
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(analyticsAction());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <div className='space-y-8'>
      {/* Welcome Section */}
      <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>
              Welcome back, {user?.username || 'Admin'}!
            </h1>
            <p className='text-slate-600'>
              Here's what's happening with your {isAdmin ? 'platform' : 'store'} today.
            </p>
          </div>
          <div className='hidden md:flex items-center space-x-4'>
            <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center'>
              <FaChartLine className='text-white text-2xl' />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        <DashboardOverview
          title="Total Products"
          amount={productCount}
          Icon={FaBoxOpen}
        />
        <DashboardOverview
          title="Total Orders"
          amount={totalOrders}
          Icon={FaShoppingCart}
        />
        <DashboardOverview
          title="Total Revenue"
          amount={totalRevenue}
          Icon={FaDollarSign}
          revenue
        />
      </div>
    </div>
  );
};

export default Dashboard;