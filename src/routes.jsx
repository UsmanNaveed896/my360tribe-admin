import React, { useContext } from 'react';
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import { FaUsers } from 'react-icons/fa';
import { Home, Profile, Tables, Notifications } from '@/pages/dashboard';
import Permissions from './pages/dashboard/permissions';
import { SignUp } from '@/pages/auth';
import Operator from './pages/forms.jsx/operator';
import Conceirge from './pages/forms.jsx/conceirge';
import { MdOutlineReduceCapacity, MdSupervisedUserCircle } from 'react-icons/md';
import PeerAmbassador from './pages/forms.jsx/peerAmbassador';
import ServicePartners from './pages/forms.jsx/servicePartners';
import { AuthContext } from './pages/auth/authecontext';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

const routes = () => {
  const { auth, role } = useContext(AuthContext);
console.log(role,"role")
  return [
    {
      layout: 'dashboard',
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: 'dashboard',
          path: '/home',
          element: <Home />,
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: 'Users',
          path: '/users',
          element: <Tables />,
          condition: role === 'superAdmin' || role === 'admin',
       
        },
        {
          icon: <InformationCircleIcon {...icon} />,
          name: 'Permissions',
          path: '/roles',
          element: <Permissions />,
          condition: role === 'admin',
        },
        {
          icon: <TableCellsIcon {...icon} />,
          name: 'Operators',
          path: '/operator',
          element: <Operator />,
          condition: role === 'superAdmin' || role === 'operator' || role === 'admin',
        },
        {
          icon: <MdOutlineReduceCapacity {...icon} />,
          name: 'Conceirge',
          path: '/conceirge',
          element: <Conceirge />,
          condition: role === 'superAdmin' || role === 'conceirge' || role === 'admin',
        },
        {
          icon: <MdSupervisedUserCircle {...icon} />,
          name: 'Peer Ambassador',
          path: '/peer-ambassador',
          element: <PeerAmbassador />,
          condition: role === 'superAdmin' || role === 'peerAmbassador' || role === 'admin',
        },
        {
          icon: <FaUsers {...icon} />,
          name: 'Service Partners',
          path: '/service-partner',
          element: <ServicePartners />,
          condition: role === 'superAdmin' || role === 'servicePartner' || role === 'admin',

        },
      ].filter(route => route.condition !== false), 
    },

  ];
};

export default routes;
