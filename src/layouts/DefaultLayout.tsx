import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import Queen from '../components/Queen';

export const DefaultLayout = () => {
	return (
		<main className="relative h-screen w-screen bg-[var(--color-background)]">
			<Header />
			<Queen />
			<Outlet />
		</main>
	);
};
