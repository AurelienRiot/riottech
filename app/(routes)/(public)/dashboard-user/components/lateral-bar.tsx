'use client'
import { cn } from '@/lib/utils';
import { CalendarSearchIcon, LayoutDashboard, ListOrderedIcon, Users } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
})

const routes = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard-user',
    color: "text-sky-500",
  },
  {
    name: 'Commandes',
    icon: ListOrderedIcon,
    href: '/dashboard-user/orders',
    color: "text-purple-500",
  },
  {
    name: 'Abonnements',
    icon: CalendarSearchIcon,
    href: '/dashboard-user/subscriptions',
    color: "text-pink-500",
  },
  {
    name: 'Informations Utilisateur',
    icon: Users,
    href: '/dashboard-user/user-info',
    color: "text-green-500",
  },
]

const LateralBar = () => {


  return (
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-16 z-[80] bg-gray-900'>
        <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
          <div className='px-3 py-2 flex-1'>
            <Link href='/' className='flex items-center pl-3 mb-14'>
              <div className='relative w-8 h-8 mr-4'>
                <Image  fill src='/icon-riot-tech.png' alt='logo'  />
              </div>
              <h1 className={cn('text-2xl font-bold', montserrat.className)}>
                  Riot Tech
              </h1>
            </Link>
            <div className='space-y-1'>
              {routes.map((route) => (
                <Link key={route.name} href={route.href}className='text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg trnasition' >
                  <div className='flex items-center flex-1'>
                  <route.icon className={cn('w-5 h-5 mr-3', route.color)} />
                  {route.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
       </div>
  );
};

export default LateralBar;
