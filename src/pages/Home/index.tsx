import { Card } from "./style";
import bookIcon from "./assets/book.svg";
import pawnIcon from "./assets/pawn.svg";
import puzzleIcon from "./assets/puzzle.svg";
import trophyIcon from "./assets/trophy.svg";

export const Home = () => {
  return (
    <section className="w-full flex justify-center items-center font-jersey text-5xl p-8 md:justify-start md:items-start md:p-16">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card $cardColor="1">
          <h2>Play</h2>
          <div className="h-32 w-full flex justify-end">
            <img src={pawnIcon} alt="" />
          </div>
        </Card>
        <Card $cardColor="2">
          <h2>Puzzles</h2>
          <div className="h-32 w-full flex justify-end">
            <img src={puzzleIcon} alt="" />
          </div>
        </Card>
        <Card $cardColor="2">
          <h2>Learn chess</h2>
          <div className="h-32 w-full flex justify-end">
            <img src={bookIcon} alt="" />
          </div>
        </Card>
        <Card $cardColor="1">
          <h2>Tournament</h2>
          <div className="h-32 w-full flex justify-end">
            <img src={trophyIcon} alt="" />
          </div>
        </Card>
      </article>
    </section>
  );
};
