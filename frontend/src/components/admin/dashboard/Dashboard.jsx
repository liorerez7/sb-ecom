import React /*, { useEffect }*/ from 'react'
import DashboardOverview from './DashboardOverview'
import { FaBoxOpen, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
// import { analyticsAction } from '../../../store/actions';
import Loader from '../../shared/Loader';
import ErrorPage from '../../shared/ErrorPage';
import { analyticsAction } from '../../../store/actions';
import { useEffect } from 'react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const admin = useSelector((state) => state.admin) || {};


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
    <div>
      <div
        className='flex md:flex-row mt-8 flex-col lg:justify-between 
          border border-slate-400 rounded-lg bg-gradient-to-r
          from-blue-50 to-blue-100 shadow-lg'
      >
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
