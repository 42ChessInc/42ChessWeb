import king from "../assets/pieces/king_piece.png";

const HeroSection = () => {
  return (
    <section>
      <article className="flex flex-col">
        <h1 className="text-5xl">Welcome to 42 chess club</h1>
        <h2 className="text-2xl">
          A community built by 42 students — open to everyone who loves to play,
          learn, and share the art of chess.
        </h2>
        <div className="flex gap-5 text-white">
          <a className="px-5 py-3 bg-black rounded-xl" href="">
            Join our community
          </a>
          <a className="px-5 py-3 bg-black rounded-xl" href="">
            Play
          </a>
        </div>
        {/* maybe the chess piece to be 3d? 
         and follow the page? 
         difficult but a nice touch */}
        <img
          className="absolute right-0 top-0"
          src={king}
          alt="king chess piece"
        />
      </article>
    </section>
  );
};

export default HeroSection;