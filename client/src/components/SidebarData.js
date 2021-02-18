import React from 'react';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdIcons.MdDashboard />,
    cName: 'nav-text',
  },
  {
    title: 'Cardio',
    path: '/cardios',
    icon: <MdIcons.MdDirectionsRun />,
    cName: 'nav-text',
  },
  {
    title: 'Lifts',
    path: '/lifts',
    icon: <MdIcons.MdFitnessCenter />,
    cName: 'nav-text',
  },
  {
    title: 'Skills',
    path: '/skills',
    icon: <MdIcons.MdStar />,
    cName: 'nav-text',
  },
  {
    title: 'Contact',
    path: '/contact',
    icon: <MdIcons.MdEmail />,
    cName: 'nav-text',
  },
  {
    title: 'Cool Gear',
    path: '/gear',
    icon: <MdIcons.MdShoppingCart />,
    cName: 'nav-text',
  },
  {
    title: 'Donate',
    path: '/donate',
    icon: <MdIcons.MdAttachMoney />,
    cName: 'nav-text',
  },
  {
    title: 'Privacy Policy',
    path: '/privacy',
    icon: <MdIcons.MdSecurity />,
    cName: 'nav-text',
  },
  {
    title: 'Change Password',
    path: '/change-password',
    icon: <MdIcons.MdLockOutline />,
    cName: 'nav-text',
  },
];
