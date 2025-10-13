import React from "react";
import Profiles from "./components/Profile";

type Collaborator = { name: string; href?: string; description?: string };

const collaborators: Collaborator[] = [
  // Fill these in when you have names/links
  // { name: 'Alice Example', href: 'https://github.com/alice', description: 'Core organizer' },
];

const githubLink = ""; // add GitHub organization/repo link here when ready

export const About: React.FC = () => {
  return (
    <section
      className="min-h-screen py-12 px-6"
      style={{
        background: "var(--color-bg-100)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold">About 42ChessClub</h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            A student-run club at 42 Porto that blends competition, learning and
            tech to make chess accessible and welcoming for adults of all
            levels.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="p-6 rounded-2xl shadow-sm bg-[var(--color-bg-100)]">
            <h2 className="text-xl font-bold mb-3">Who we are</h2>
            <p className="text-sm text-[var(--text-secondary)]">
              We are a community and learning hub open to players of all
              strengths. 42ChessClub combines over-the-board play with training,
              online tools and events to help members improve and connect.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold">Mission</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Foster an inclusive chess community in Porto that balances
                competitive spirit with casual play and integrates modern
                technology for learning.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Vision</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Be a benchmark for modern chess culture by combining technology,
                education and community.
              </p>
            </div>
          </article>

          <article className="p-6 rounded-2xl shadow-sm bg-[var(--color-bg-100)]">
            <h2 className="text-xl font-bold mb-3">Our collaborators</h2>
            {collaborators.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">
                We&apos;re still gathering names — add collaborator objects to{" "}
                <code>src/pages/About.tsx</code> when ready.
              </p>
            ) : (
              <ul className="space-y-3">
                {collaborators.map((c) => (
                  <li key={c.name}>
                    <a
                      href={c.href || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium hover:underline"
                    >
                      {c.name}
                    </a>
                    {c.description && (
                      <div className="text-sm text-[var(--text-secondary)]">
                        {c.description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6">
              <h3 className="font-semibold">GitHub</h3>
              {githubLink ? (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium hover:underline"
                >
                  {githubLink}
                </a>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">
                  Repository link pending — add the GitHub org/repo URL to{" "}
                  <code>githubLink</code> in this file when ready.
                </p>
              )}
            </div>
          </article>
        </section>
      </div>
      <Profiles />
    </section>
  );
};