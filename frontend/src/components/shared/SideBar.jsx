import React from 'react'
import { FaTachometerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { adminNavigation, sellerNavigation } from '../../utils';
import { Link } from 'react-router-dom';


const SideBar = ({isProfileLayout = false}) => {

    const pathName = useLocation().pathname;
    const {user} = useSelector(state => state.auth);
    const isAdmin = user && user?.roles.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles.includes("ROLE_SELLER");

    
    const sideBarLayout = isAdmin ? adminNavigation : sellerNavigation;
    

  return (
    <div className='sidebar'>
        <div className='sidebar-content'>
            <FaTachometerAlt />
            {isAdmin && (
                <span className='sidebar-title'>Admin Panel</span>
            )}
            {isSeller && !isAdmin && (
                <span className='sidebar-title'>Seller Panel</span>
            )}
        </div>
        <nav className='flex flex-1 flex-col'>
            <ul role='list'>
                {sideBarLayout.map(item => (
                    <li key={item.name}>
                        <Link to={item.href} className={`sidebar-link ${pathName === item.href ? 'bg-custom-blue text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-black'}`}>
                            {item.icon}
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

        </nav>
    </div>
  )
}

export default SideBar