import { Card } from './style';
import bookIcon from './assets/book.svg';
import pawnIcon from './assets/pawn.svg';
import puzzleIcon from './assets/puzzle.svg';
import trophyIcon from './assets/trophy.svg';
import Carousel from './components/Carousel';
import Queen from '../../components/Queen';

export const Home = () => {
	return (
		<section className="my-10 overflow-y-auto overflow-x-hidden">
			<article className="w-full flex flex-col justify-center items-center gap-20 font-jersey p-4 md:flex-row">
				<div className="max-w-xl grid grid-cols-2 grid-rows-2 w-[90vw] gap-3">
					<Card $cardColor="1">
						<h2 className="md:text-5xl">
							Play
						</h2>
						<div className="w-20 md:w-38 flex justify-end">
							<img
								src={pawnIcon}
								alt=""
							/>
						</div>
					</Card>
					<Card $cardColor="2">
						<h2 className="md:text-5xl">
							Puzzles
						</h2>
						<div className="w-20 md:w-38 flex justify-end">
							<img
								src={puzzleIcon}
								alt=""
							/>
						</div>
					</Card>
					<Card
						$cardColor="2"
						href="/learn">
						<h2 className="md:text-5xl">
							Learn chess
						</h2>
						<div className="w-20 md:w-38 flex justify-end">
							<img
								src={bookIcon}
								alt=""
							/>
						</div>
					</Card>
					<Card $cardColor="1">
						<h2 className="md:text-5xl">
							Tournament
						</h2>
						<div className="w-20 md:w-38 flex justify-end">
							<img
								src={trophyIcon}
								alt=""
							/>
						</div>
					</Card>
				</div>
				<Queen />
			</article>
			<Carousel />
		</section>
	);
};
