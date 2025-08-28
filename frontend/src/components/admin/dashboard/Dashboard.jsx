import React /*, { useEffect }*/ from 'react'
import DashboardOverview from './DashboardOverview'
import { FaBoxOpen, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
// import { analyticsAction } from '../../../store/actions';
import Loader from '../../shared/Loader';
import ErrorPage from '../../shared/ErrorPage';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  // קח את admin ואם אין analytics – החזר אובייקט ריק
  const admin = useSelector((state) => state.admin) || {};
  const analytics = admin.analytics || {};

  // ברירות מחדל כדי לא לקרוס כשהנתונים עדיין לא קיימים
  const {
    productCount = 0,
    totalRevenue = 0,
    totalOrders = 0,
  } = analytics;

  // כשיהיה לך API מוכן – תוכל להחזיר את ה-useEffect הזה:
  // useEffect(() => {
  //   dispatch(analyticsAction());
  // }, [dispatch]);

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
