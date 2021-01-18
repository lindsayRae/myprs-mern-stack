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
    title: 'Donate',
    path: '/#',
    icon: <MdIcons.MdAttachMoney />,
    cName: 'nav-text',
  },
  {
    title: 'Privacy Policy',
    path: '/#',
    icon: <MdIcons.MdSecurity />,
    cName: 'nav-text',
  },
  {
    title: 'Logout',
    path: '/#',
    icon: <MdIcons.MdExitToApp />,
    cName: 'nav-text',
  },
];
