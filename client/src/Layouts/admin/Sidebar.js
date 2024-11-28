import React, { useState } from 'react';
import '../../assets/css/admin/sidebar.css';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const location = useLocation();

  // List of paths where "Course" should be highlighted
  const coursePaths = ['/all-course', '/add-course', '/course-category', '/course-coupon'];

  const blogsPaths = ['/admin/all-blogs', '/admin/add-blogs', '/admin/blog-category'];

  const affiliatePaths = ['/admin/products', '/admin/add-products', '/admin/product-category'];

  const settingPathes = ['/payment-setting', '/notification-setting'];

  const isCourseActive = coursePaths.includes(location.pathname);
  const isBlogActive = blogsPaths.includes(location.pathname);
  const isAffiliateActive = affiliatePaths.includes(location.pathname);
  const isSettingActive = settingPathes.includes(location.pathname);

  const toggleDropdown = (menu, event) => {
    event.preventDefault(); // Prevent default anchor behavior
    setActiveDropdown((prevMenu) => (prevMenu === menu ? null : menu));
  };

  return (
    <>
      <aside className="sidebar active">
        <div className="sidebar-top">
          <ul>
            <li className="main-li">
              <a href={() => false} onClick={(e) => toggleDropdown('dropdown1', e)}>
                <i className="fa-solid fa-gauge-high"></i> <span>Dashboard</span>
              </a>
            </li>

            
            <li className="main-li">
              <NavLink to={'/admin/sets'}>
                <i className="fa fa-question-circle"></i>
                <span>Sets</span>
              </NavLink>
            </li>

            
            <li className="main-li">
              <NavLink to={'/admin/players'}>
                <i className="fa fa-question-circle"></i>
                <span>Players</span>
              </NavLink>
            </li>


            
            <li className="main-li">
              <NavLink to={'/admin/teams'}>
                <i className="fa fa-question-circle"></i>
                <span>Teams</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* -------------------- setting ----------------------- */}

        <div className="sidebar-bottom">
          <ul>
            <li className="main-li">
              <NavLink to={'/profile'}>
                <i className="fa-regular fa-user"></i>
                <span>Profile</span>
              </NavLink>
            </li>
            <li className="main-li">
              <a
                href={() => false}
                onClick={(e) => toggleDropdown('setting', e)}
                className={isSettingActive ? 'active' : ''}
              >
                <i className="fa-solid fa-gear"></i>
                <span>Setting</span>
                <i className={`fa-solid ${activeDropdown === 'setting' ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
              </a>
              {activeDropdown === 'setting' && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to={'/payment-setting'}>
                      <i className="fa-solid fa-caret-right"></i>Payment Setting
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/notification-setting'}>
                      <i className="fa-solid fa-caret-right"></i>Notification Setting
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li className="main-li">
              <a href={() => false}>
                <i className="fa-solid fa-power-off"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
