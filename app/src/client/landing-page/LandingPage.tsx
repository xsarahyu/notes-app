import { Link } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiBars3 } from 'react-icons/hi2';
import { BiLogIn } from 'react-icons/bi';
import logo from '../static/logo.png';
import openSaasBanner from '../static/open-saas-banner.png';
import { features, navigation } from './contentSections';
import DropdownUser from '../components/DropdownUser';
import { DOCS_URL } from '../../shared/constants';
import { UserMenuItems } from '../components/UserMenuItems';
import DarkModeSwitcher from '../admin/components/DarkModeSwitcher';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: user, isLoading: isUserLoading } = useAuth();

  const NavLogo = () => <img className='h-8 w-8' src={logo} alt='Your SaaS App' />;

  return (
    <div className='bg-white dark:text-white dark:bg-boxdark-2'>
      {/* Header */}
      <header className='absolute inset-x-0 top-0 z-50 dark:bg-boxdark-2'>
        <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
          <div className='flex items-center lg:flex-1'>
            <a
              href='/'
              className='flex items-center -m-1.5 p-1.5 text-gray-900 duration-300 ease-in-out hover:text-yellow-500'
            >
              <NavLogo />
              <span className='ml-2 text-sm font-semibold leading-6 dark:text-white'>RC ASCEND</span>
            </a>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <HiBars3 className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-sm font-semibold leading-6 text-gray-900 duration-300 ease-in-out hover:text-yellow-500 dark:text-white'
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:align-end'>
            {/* <!-- Dark Mode Toggler --> */}
            <div className='flex items-center gap-3 2xsm:gap-7'>
              <ul className='flex justify-center items-center gap-2 2xsm:gap-4'>
                <DarkModeSwitcher />
              </ul>
              {isUserLoading ? null : !user ? (
                <Link to='/login'>
                  <div className='flex justify-end items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white'>
                    Log in <BiLogIn size='1.1rem' className='ml-1' />
                  </div>
                </Link>
              ) : (
                <DropdownUser user={user} />
              )}
            </div>
          </div>
        </nav>
        <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className='fixed inset-0 z-50' />
          <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-boxdark dark:text-white'>
            <div className='flex items-center justify-between'>
              <a href='/' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Your SaaS</span>
                <NavLogo />
              </a>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-50'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <AiFillCloseCircle className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-boxdark-2'
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='py-6'>
                  {isUserLoading ? null : !user ? (
                    <Link to='/login'>
                      <div className='flex justify-end items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white'>
                        Log in <BiLogIn size='1.1rem' className='ml-1' />
                      </div>
                    </Link>
                  ) : (
                    <UserMenuItems user={user} />
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main className='isolate dark:bg-boxdark-2'>
        {/* Hero section */}
        <div className='relative pt-14 w-full '>
          <div
            className='absolute top-0 right-0 -z-10 transform-gpu overflow-hidden w-full blur-3xl sm:top-0 '
            aria-hidden='true'
          >
            <div
              className='aspect-[1020/880] w-[55rem] flex-none sm:right-1/4 sm:translate-x-1/2 dark:hidden bg-gradient-to-tr from-amber-400 to-purple-300 opacity-40'
              style={{
                clipPath: 'polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)',
              }}
            />
          </div>
          <div
            className='absolute inset-x-0 top-[calc(100%-40rem)] sm:top-[calc(100%-65rem)] -z-10 transform-gpu overflow-hidden blur-3xl'
            aria-hidden='true'
          >
            <div
              className='relative aspect-[1020/880] sm:-left-3/4 sm:translate-x-1/4 dark:hidden bg-gradient-to-br from-amber-400 to-purple-300  opacity-50 w-[72.1875rem]'
              style={{
                clipPath: 'ellipse(80% 30% at 80% 50%)',
              }}
            />
          </div>
          <div className='py-24 sm:py-32'>
            <div className='mx-auto max-w-8xl px-6 lg:px-8'>
              <div className='lg:mb-18 mx-auto max-w-3xl text-center'>
                <h1 className='text-4xl font-bold text-gray-900 sm:text-6xl dark:text-white'>
                  Discover the ultimate <span className='italic text-yellow-500'>Notes app</span>
                </h1>
                {/* <p className='mt-6 mx-auto max-w-2xl text-lg leading-8 text-gray-600 dark:text-white'>
                  it's everything you need to be productive
                </p> */}
                <div className='mt-15 flex items-center justify-center gap-x-6'>
                <Link to='/signup' className='rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-200 hover:ring-2 hover:ring-yellow-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white'>
                    Get Started <span aria-hidden='true'>→</span>
                </Link>
                </div>
              </div>
              {/* Feature section */}
              <div id='features' className='mx-auto mt-20 max-w-7xl px-6 lg:px-8'>
                {/* <div className='mx-auto max-w-2xl text-center'>
                  <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
                    Unlock <span className='text-yellow-500'>Premium</span> Features
                  </p>
                  <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-white'>
                    Work smarter,
                    <br /> not harder.
                  </p>
                </div> */}
                <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
                  <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
                    {features.map((feature) => (
                      <div key={feature.name} className={`relative pl-16`}>
                        <dt className='text-base font-semibold leading-7 text-gray-900 dark:text-white'>
                          <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center border border-yellow-400 bg-yellow-100/50 dark:bg-boxdark rounded-lg'>
                            <div className='text-2xl'>{feature.icon}</div>
                          </div>
                          {feature.name}
                        </dt>
                        <dd className='mt-2 text-base leading-7 text-gray-600 dark:text-white'>{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
