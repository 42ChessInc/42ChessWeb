// import HeroSection from "../components/HeroSection";

import { NewspaperIcon, PuzzlePieceIcon } from "@phosphor-icons/react";

export const Home = () => {
  return (
    <section className="home-page home-center">
      <article className="h-screen w-3/5 pt-10 pl-10 grid grid-cols-8 grid-rows-4 content-center justify-start">
        <div className="home-card card-play col-span-4 row-span-2">
          <h1>Play</h1>
        </div>

        <a href="/learn" className="home-card card-learn col-span-4 row-span-2">
          <h1>Learn chess</h1>
        </a>

        <div className="group flex flex-col home-card card-puzzles col-span-4">
          <h1>Puzzles</h1>
		  <div className="w-full h-full flex items-center justify-end">
			<PuzzlePieceIcon size={150} className="group-hover:rotate-15 group-hover:scale-110 transition-all"/>
		  </div>
        </div>

        <a href="/about" className="flex flex-col home-card card-about col-span-4">
          <h1>About Us</h1>
		  <div className="w-full h-full flex items-center justify-end">
			<NewspaperIcon size={150} />
		  </div>
        </a>
      </article>
    </section>
  );
};
