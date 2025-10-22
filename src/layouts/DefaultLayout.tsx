import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const DefaultLayout = () => {
	return (
		<div className="bg-[var(--color-background)]">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
