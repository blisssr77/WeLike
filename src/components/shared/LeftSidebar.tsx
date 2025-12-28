import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'
import { INavLink } from '@/types'
import { sidebarLinks } from '@/constants'

const LeftSidebar = () => {
  const { pathname } = useLocation()
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()
  const { user } = useUserContext()

  useEffect(() => {
    // CHANGE 1: Navigate to sign-in directly instead of refreshing (navigate(0))
    if (isSuccess) {
        navigate('/sign-in')
    }
  }, [isSuccess])

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to="/" className="flex gap-3 items-center group">
          <img
            src="/assets/icons/logonew3.png"
            alt="logo"
            width={48} 
            height={48}
            className="group-hover:scale-110 transition-transform duration-200"
          />
          
          <div className="flex flex-col">
            <span 
              className="h2-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500 text-transparent bg-clip-text tracking-tighter group-hover:tracking-widest transition-all duration-300"
              style={{ fontSize: '38px', lineHeight: '110%' }}
            >
              Vibe
            </span>
          </div>
        </Link>

        {/* LOGIC: If user has an ID (Logged in), allow click. If Guest, go to Sign-in */}
        <Link 
          to={user.id ? `/profile/${user.id}` : '/sign-in'} 
          className='flex gap-3 items-center'
        >
            <img
              src={user.imageUrl?.replace("/preview", "/view") || "/assets/icons/profile-placeholder.svg"}
              alt='profile'
              className='h-14 w-14 rounded-full'
            />
          <div className='flex flex-col'>
            <p className='body-bold'>
              {user.name || 'Guest User'}
            </p>
            <p className='small-regular text-light-3'>
              {/* Only show @username if it exists, otherwise prompt to sign up */}
              {user.username ? `@${user.username}` : 'Log in to view profile'}
            </p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route

            return (
              <li key={link.label} className={`leftsidebar-link group ${
                isActive && 'bg-pink-700'
              }`}>
                <NavLink
                  to={link.route}
                  className='flex gap-4 items-center p-4'
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      <Button 
          variant='ghost'
          className='shad-button_ghost' 
          onClick={() => signOut()}>
              <img src='/assets/icons/logout.svg' alt='logout'/> 
              <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar