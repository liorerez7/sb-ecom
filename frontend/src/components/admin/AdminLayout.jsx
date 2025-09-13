import { Dialog, Transition } from '@headlessui/react'
import React, { useState, Fragment } from 'react';
import SideBar from '../shared/SideBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBell, FaUser, FaBars } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector(state => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-72 max-w-xs flex-1 flex-col bg-white/95 backdrop-blur-xl shadow-2xl border-r border-slate-200">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Dialog.Title className="text-lg font-bold text-white">
                    {isAdmin ? 'Admin Panel' : 'Seller Panel'}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-3 py-4">
                  <SideBar />
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-0 flex-1" aria-hidden="true" />
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar - removed fixed positioning for proper layout */}
      <div className="hidden lg:flex lg:w-72 lg:flex-shrink-0">
        <div className="flex flex-col w-72 bg-white/95 backdrop-blur-xl shadow-xl border-r border-slate-200">
          <div className="flex items-center h-20 px-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white block">E-Commerce</span>
                <span className="text-xs text-blue-100">{isAdmin ? 'Admin Panel' : 'Seller Panel'}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-6">
            <SideBar />
          </div>
        </div>
      </div>

      {/* Main content - removed lg:pl-72 since sidebar is no longer fixed */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200 z-10">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="lg:hidden rounded-lg p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <FaBars className="h-6 w-6" />
              </button>
              <div className="hidden lg:block">
                <nav className="flex space-x-2 text-sm text-slate-500" aria-label="Breadcrumb">
                  <span className="hover:text-slate-700 cursor-pointer">Dashboard</span>
                  <span>/</span>
                  <span className="text-slate-900 font-medium">Overview</span>
                </nav>
              </div>
              <span className="lg:hidden text-lg font-semibold text-slate-900">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200" 
                aria-label="Notifications"
              >
                <FaBell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-slate-900">{user?.username || 'Admin User'}</p>
                  <p className="text-xs text-slate-500">{isAdmin ? 'Administrator' : 'Seller'}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <FaUser className="text-white text-sm" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area with proper scrolling */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;