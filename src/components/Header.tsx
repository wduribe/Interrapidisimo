import { NavLink } from 'react-router-dom';
import { LogoHeader } from './LogoHeader';

export const Header = () => {
	return (
		<header className=' py-5 flex justify-center shadow-md '>
			<div className='max-w-full w-[1100px] px-5 flex justify-between max-[460px]:flex-col max-[460px]:items-center max-[460px]:gap-2'>
				<div>
					<LogoHeader />
				</div>
				<nav className='flex gap-5'>
					<li className='list-none'><NavLink className={({ isActive }) => `hover:underline text-lg ${isActive ? 'text-[#fe7d14]' : ''}`} to="/">Ingresos</NavLink></li>
					<li className='list-none'><NavLink className={({ isActive }) => `hover:underline text-lg ${isActive ? 'text-[#fe7d14]' : ''}`} to="/salidas">Salidas</NavLink></li>
					<li className='list-none'><NavLink className={({ isActive }) => `hover:underline text-lg ${isActive ? 'text-[#fe7d14]' : ''}`} to="/historial">Historial</NavLink></li>
				</nav>
			</div>
		</header>
	);
}