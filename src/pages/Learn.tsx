import React from "react";

export const Learn: React.FC = () => {
  return (
    <section
      className="min-h-screen px-6 py-12"
      style={{
        background: "var(--color-bg-200)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">Rules of chess</h1>

        <p className="mb-6 text-lg text-[var(--text-secondary)]">
          The basic goal in chess is to checkmate your opponent's king: place it
          under attack with no legal escape. Play alternates between White and
          Black as pieces move and capture. Below are the core rules and a short
          beginner's guide to opening play.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-3">Setup</h2>
          <p className="mb-3">
            Pieces are arranged on the first two ranks for each player: pawns on
            the second rank, major pieces on the first. The board is oriented so
            each player has a light square on their right-hand corner.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-3">Piece movement</h2>
          <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
            <li>
              <strong>Pawns</strong>: Move forward one square (two squares on
              their first move). Pawns capture one square diagonally forward.
              Special pawn rules: en passant and promotion.
            </li>
            <li>
              <strong>Knights</strong>: Move in an L-shape: two squares in one
              direction, then one square perpendicular. Knights jump over
              pieces.
            </li>
            <li>
              <strong>Bishops</strong>: Move any number of unobstructed squares
              diagonally.
            </li>
            <li>
              <strong>Rooks</strong>: Move any number of unobstructed squares
              horizontally or vertically.
            </li>
            <li>
              <strong>Queen</strong>: Moves any number of unobstructed squares
              horizontally, vertically, or diagonally.
            </li>
            <li>
              <strong>King</strong>: Moves one square in any direction. The king
              is the piece you must protect.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-3">
            Capturing & special moves
          </h2>
          <p className="mb-3 text-[var(--text-secondary)]">
            When a piece lands on a square occupied by an opponent's piece, that
            piece is captured and removed from the board. Pawns capture
            diagonally.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
            <li>
              <strong>Castling</strong>: A king-and-rook move for safety. The
              king moves two squares toward a rook and the rook moves to the
              square the king crossed. Castling is only legal if neither piece
              has moved, the squares between are empty, and the king does not
              pass through or end in check.
            </li>
            <li>
              <strong>En passant</strong>: A special pawn capture available
              immediately after an opponent pawn moves two squares and lands
              adjacent to yours.
            </li>
            <li>
              <strong>Promotion</strong>: A pawn reaching the far rank is
              promoted, usually to a queen.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-3">Winning and draws</h2>
          <p className="text-[var(--text-secondary)]">
            A player wins by checkmating the opponent's king. A game can end in
            a draw by stalemate, agreement, insufficient material, threefold
            repetition, or the fifty-move rule.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-medium mb-3">
            Opening principles for beginners
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
            <li>
              <strong>Control the center</strong> (e4, d4, e5, d5) to maximize
              piece mobility.
            </li>
            <li>
              <strong>Develop pieces</strong> (knights and bishops) quickly;
              avoid moving the same piece repeatedly.
            </li>
            <li>
              <strong>Develop knights before bishops</strong> in many lines —
              knights are less dependent on pawn structure.
            </li>
            <li>
              <strong>Castle early</strong> (usually between moves 5–8) to
              protect your king.
            </li>
            <li>
              <strong>Avoid bringing the queen out too soon</strong> — it can be
              chased and you lose time (tempo).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-medium mb-3">
            Beginner-friendly openings
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-[var(--text-secondary)]">
            <li>
              <strong>Italian Game</strong>: Easy to learn and develops pieces
              naturally.
            </li>
            <li>
              <strong>Ruy Lopez</strong>: Classical and instructive; teaches
              central control and piece play.
            </li>
            <li>
              <strong>Queen's Gambit Declined</strong>: Solid and teaches pawn
              structures and long-term planning.
            </li>
          </ol>
        </section>

        <footer className="text-sm text-[var(--text-muted)]">
          <p>
            Tips: practice the opening principles, solve simple puzzles, and
            review your games to spot mistakes — slow, steady improvement comes
            from repetition and study.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Learn;
