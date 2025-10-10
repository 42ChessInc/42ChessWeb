// import HeroSection from "../components/HeroSection";

export const Home = () => {
	return (
		<section className="h-full w-full flex items-center justify-center">
			<div className="h-full w-full pt-10 text-white text-3xl grid grid-cols-6 grid-rows-3 gap-5 content-center justify-center max-w-5/6">
				<div className="bg-[#1A284C] rounded-xl flex items-start justify-start p-10 col-span-3 row-span-2 border border-transparent hover:border-amber-50 cursor-pointer">
					<h1 className="text-7xl">Play</h1>
				</div>

				<div className="bg-[#08235E] rounded-xl flex items-start justify-start p-10 col-span-2 row-span-2  border border-transparent hover:border-amber-50 cursor-pointer">
					<h1>Learn chess</h1>
				</div>

				<div className="bg-[#273C72] rounded-xl flex items-start justify-start p-10 col-span-1  border border-transparent hover:border-amber-50 cursor-pointer">
					<h1>Puzzles</h1>
				</div>

				<div className="bg-[#0F46BD] rounded-xl flex items-start justify-start p-10 col-span-1  border border-transparent hover:border-amber-50 cursor-pointer">
					<h1>Social</h1>
				</div>

				<div className="bg-[#4164BE] rounded-xl flex items-start justify-start p-10 col-span-2  border border-transparent hover:border-amber-50 cursor-pointer">
					<h1>About Us</h1>
				</div>

				<div className="bg-[#1358EC] rounded-xl flex items-start justify-start p-10 col-span-2  border border-transparent hover:border-amber-50 cursor-pointer">
					<h1>Our Contributors</h1>
				</div>

				<div className="bg-[#6783CB] rounded-xl flex items-start justify-start p-10 col-span-2  border border-transparent hover:border-amber-50 cursor-pointer">
					<h1>Become our partner</h1>
				</div>
			</div>
		</section>
	);
};
