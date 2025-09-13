import React from 'react'
import { FaTachometerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { adminNavigation, sellerNavigation } from '../../utils';
import { Link } from 'react-router-dom';

const SideBar = ({isProfileLayout = false}) => {
    const pathName = useLocation().pathname;
    const {user} = useSelector(state => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles?.includes("ROLE_SELLER");
    
    const sideBarLayout = isAdmin ? adminNavigation : sellerNavigation;

    return (
        <div className='space-y-4'>
            <nav className='px-3'>
                <ul role='list' className='space-y-1'>
                    {sideBarLayout.map(item => (
                        <li key={item.name}>
                            <Link 
                                to={item.href} 
                                className={`group flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                    pathName === item.href 
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25' 
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                                aria-current={pathName === item.href ? 'page' : undefined}
                            >
                                <div className={`w-5 h-5 flex items-center justify-center ${
                                    pathName === item.href 
                                        ? 'text-white' 
                                        : 'text-slate-500 group-hover:text-slate-700'
                                }`}>
                                    {item.icon}
                                </div>
                                <span className='truncate'>{item.name}</span>
                                {pathName === item.href && (
                                    <div className='ml-auto w-2 h-2 bg-white rounded-full opacity-75'></div>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default SideBar