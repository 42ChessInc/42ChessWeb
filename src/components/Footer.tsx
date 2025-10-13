export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-10 mt-10 bg-[var(--color-secondary)]">
      <div className="container mx-auto px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        <div className="flex flex-col mb-6">
          <a
            href="/"
            className="flex items-start mb-3 text-gray-800 no-underline"
            aria-label="Logo"
          >
            <h5 className="text-3xl font-bold">42ChessClub</h5>
          </a>
          <p className="text-sm text-gray-500">
            Made with ♟️ and coffee in Porto.
          </p>
        </div>
        <div></div>
        <div></div>
        <div>
          <h5 className="mb-4 font-semibold text-gray-800">Useful links</h5>
          <ul className="flex flex-col space-y-2">
            <li>
              <a
                href="/"
                className="text-gray-500 hover:text-gray-800 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://github.com/42ChessInc"
                className="text-gray-500 hover:text-gray-800 transition"
              >
                Play Chess
              </a>
            </li>
            <li>
              <a
                href="/learn"
                className="text-gray-500 hover:text-gray-800 transition"
              >
                Learn Chess
              </a>
            </li>
            <li>
              <a
                href="https://github.com/42ChessInc"
                className="text-gray-500 hover:text-gray-800 transition"
                target="_blank"
              >
                Puzzles
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-500 hover:text-gray-800 transition"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-semibold text-gray-800">Contribute</h5>
          <ul className="flex flex-col space-y-2">
            <li>
              <a
                href="https://github.com/42ChessInc"
                className="text-gray-500 hover:text-gray-800 transition"
                target="_blank"
              >
                Contacts
              </a>
            </li>
            <li>
              <a
                href="https://github.com/42ChessInc"
                className="text-gray-500 hover:text-gray-800 transition"
                target="_blank"
              >
                Partnership
              </a>
            </li>
            <li>
              <a
                href="https://github.com/42ChessInc"
                className="text-gray-500 hover:text-gray-800 transition"
                target="_blank"
              >
                Our Github
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 px-10 w-full">
        <hr className="text-gray-400"></hr>
      </div>
      <div className="flex sm:flex-row justify-center py-6 px-10">
        <p className="text-gray-500 text-sm text-center sm:text-left">
          © 2025 42ChessClub, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
