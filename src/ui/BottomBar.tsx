import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { bottombarLinks } from '../constants'

interface BottomBarProps {}

const BottomBar: FC<BottomBarProps> = () => {
  const { pathname } = useLocation()
  return (
    <section className='bottom-bar p-1'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route
        return (
          <Link
            to={link.route}
            key={link.id}
            className={`${
              isActive && 'bg-primary-500 rounded-[10px]'
            } flex-center flex-col gap-1 p-2 rounded-[10px] transition`}
          >
            <img
              src={link.imgURL}
              width={20}
              height={20}
              alt={link.label}
              className={`${isActive && 'invert-white'}`}
            />
            <p className='tiny-medium text-light-2'>{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default BottomBar
