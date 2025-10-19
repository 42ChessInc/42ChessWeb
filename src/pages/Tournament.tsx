import React, { useEffect, useState } from "react";

type Participant = {
  id: string;
  tournamentId?: string;
  userId: string;
  byeCount?: number;
  createdAt?: string;
  user?: { id: string; name?: string; email?: string; img?: string };
};

type Match = {
  id: string;
  tournamentId?: string;
  round: number;
  playerAId?: string;
  playerBId?: string | null;
  playerA?: { user?: { name?: string } } | null;
  playerB?: { user?: { name?: string } } | null;
  scoreA?: number;
  scoreB?: number;
};

type Tournament = {
  id: string;
  name: string;
  createdAt: string;
  startedAt?: string | null;
  endedAt?: string | null;
  winnerId?: string | null;
  participants?: Participant[];
  matches?: Match[];
};

export const Tournament: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selected, setSelected] = useState<Tournament | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchLoading, setMatchLoading] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);

  const palette = {
    text: "#131628",
    background: "#CFB18C",
    primary: "#C19A6B",
    secondary: "#E6D9C2",
    accent: "#7D4B32",
  };

  const baseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:3000"
  ).replace(/\/+$/, "");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/tornament/`);
        const json = await res.json();
        if (res.ok) {
          setTournaments(json);
        } else {
          setError(json?.message || "Failed to load tournaments");
        }
      } catch {
        // console.error(err);
        setError("Failed to load tournaments");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [baseUrl]);

  const selectTournament = async (t: Tournament) => {
    setSelected(t);
    setMatches([]);
    try {
      const res = await fetch(`${baseUrl}/tornament/${t.id}/matches`);
      const json = await res.json();
      if (res.ok) setMatches(json);
    } catch {
      // ignore matches load error for now
    }

    // refresh tournament object (participants may have changed)
    try {
      const res2 = await fetch(`${baseUrl}/tornament/`);
      const all = await res2.json();
      if (res2.ok) {
        const updated = Array.isArray(all)
          ? all.find((x) => x.id === t.id)
          : null;
        if (updated) setSelected(updated);
      }
    } catch {
      // ignore
    }
  };

  // compute points map from matches
  const computePoints = (ms: Match[]) => {
    const map: Record<string, number> = {};
    ms.forEach((m) => {
      if (m.playerAId) {
        map[m.playerAId] =
          (map[m.playerAId] || 0) +
          (typeof m.scoreA === "number" ? m.scoreA : 0);
      }
      if (m.playerBId) {
        map[m.playerBId] =
          (map[m.playerBId] || 0) +
          (typeof m.scoreB === "number" ? m.scoreB : 0);
      }
    });
    return map;
  };

  // helper to get raw token string (strip leading 'Bearer ' if present)
  const getRawToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token.startsWith("Bearer ") ? token.slice(7) : token;
  };

  const parseTokenPayload = () => {
    const raw = getRawToken();
    if (!raw) return null;
    try {
      const payload = raw.split(".")[1];
      // URL-safe base64 to normal
      const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const json = JSON.parse(atob(b64));
      return json;
    } catch {
      // invalid token format
      return null;
    }
  };

  const isAdmin = Boolean(parseTokenPayload()?.isAdmin);

  const startTournament = async (t: Tournament) => {
    setStartLoading(true);
    setError(null);
    try {
      const raw = getRawToken();
      if (!raw) return setError("Admin token required to start tournament");

      const res = await fetch(`${baseUrl}/tornament/${t.id}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${raw}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.message || "Failed to start tournament");
      } else {
        // refresh matches and update selected/tournaments
        await selectTournament(t);
        const now = new Date().toISOString();
        setSelected((prev) => (prev ? { ...prev, startedAt: now } : prev));
        setTournaments((prev) =>
          prev.map((p) => (p.id === t.id ? { ...p, startedAt: now } : p))
        );
      }
    } catch {
      // console.error(err);
      setError("Failed to start tournament");
    } finally {
      setStartLoading(false);
    }
  };

  const resetTournament = async (t: Tournament) => {
    setResetLoading(true);
    setError(null);
    try {
      const raw = getRawToken();
      if (!raw) return setError("Admin token required to reset tournament");

      const res = await fetch(`${baseUrl}/tornament/${t.id}/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${raw}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.message || "Failed to reset tournament");
      } else {
        // update UI: tournament cleared of matches
        const updatedT = json.tournament as Tournament;
        setTournaments((prev) =>
          prev.map((p) => (p.id === t.id ? updatedT : p))
        );
        setSelected(updatedT);
        setMatches([]);
      }
    } catch {
      // console.error(err);
      setError("Failed to reset tournament");
    } finally {
      setResetLoading(false);
    }
  };

  const register = async (t: Tournament) => {
    setRegLoading(true);
    setError(null);
    try {
      const raw = getRawToken();
      if (!raw) return setError("You must be logged in to register");

      const res = await fetch(`${baseUrl}/tornament/${t.id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${raw}`,
        },
      });
      const json = await res.json();
      if (res.ok) {
        // update participants list locally
        const updated = { ...t };
        updated.participants = updated.participants
          ? [...updated.participants, json]
          : [json];
        setTournaments((prev) =>
          prev.map((p) => (p.id === t.id ? updated : p))
        );
        setSelected(updated);
      } else {
        setError(json?.message || "Failed to register");
      }
    } catch {
      // console.error(err);
      setError("Failed to register");
    } finally {
      setRegLoading(false);
    }
  };

  const createTournament = async () => {
    if (!isAdmin) return setError("Only admins can create tournaments");
    const name = window.prompt("Tournament name:");
    if (!name || !name.trim()) return;
    setCreateLoading(true);
    setError(null);
    try {
      const raw = getRawToken();
      if (!raw) return setError("Admin token required to create tournament");
      const res = await fetch(`${baseUrl}/tornament/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${raw}`,
        },
        body: JSON.stringify({ name: name.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.message || "Failed to create tournament");
      } else {
        // add new tournament to list and select it
        setTournaments((prev) => [json, ...prev]);
        setSelected(json);
        setMatches([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create tournament");
    } finally {
      setCreateLoading(false);
    }
  };

  const notStarted = (t?: Tournament | null) => {
    // consider tournament not started if there are no matches yet
    if (!t) return false;
    return !(matches.length > 0 || (t.matches && t.matches.length > 0));
  };

  const setMatchResult = async (
    matchId: string,
    resultPayload: { result?: string; scoreA?: number; scoreB?: number }
  ) => {
    if (!selected) return;
    setError(null);
    setMatchLoading((s) => ({ ...s, [matchId]: true }));
    try {
      const raw = getRawToken();
      if (!raw) {
        setError("Admin token required to update match");
        setMatchLoading((s) => ({ ...s, [matchId]: false }));
        return;
      }
      console.debug("setMatchResult:", { matchId, resultPayload, raw });
      const res = await fetch(
        `${baseUrl}/tornament/${selected.id}/matches/${matchId}/result`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: raw ? `Bearer ${raw}` : "",
          },
          body: JSON.stringify(resultPayload),
        }
      );
      const json = await res.json();
      console.debug("setMatchResult response:", res.status, json);
      if (!res.ok) {
        setError(json?.message || "Failed to update match");
        return;
      }
      // Refresh matches from server to reflect database state (and any side-effects)
      try {
        const r2 = await fetch(`${baseUrl}/tornament/${selected.id}/matches`);
        const j2 = await r2.json();
        if (r2.ok) {
          setMatches(j2);
          // also refresh tournament participants (points updated)
          const tRes = await fetch(`${baseUrl}/tornament/`);
          const tJson = await tRes.json();
          if (tRes.ok) setTournaments(tJson);
        }
        // fall back to replacing the single match if matches endpoint failed
        else
          setMatches((prev) => prev.map((m) => (m.id === json.id ? json : m)));
      } catch {
        // fallback: replace single match
        setMatches((prev) => prev.map((m) => (m.id === json.id ? json : m)));
      }
      // refresh selected tournament participants so points display updates
      try {
        await selectTournament(selected);
      } catch {
        // ignore
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update match");
    } finally {
      setMatchLoading((s) => ({ ...s, [matchId]: false }));
    }
  };

  // Determine if we can create the next round: all matches in the current max round must have results
  const canCreateNextRound = () => {
    if (!matches || matches.length === 0) return false;
    const maxRound = Math.max(...matches.map((m) => m.round));
    const current = matches.filter((m) => m.round === maxRound);
    if (current.length === 0) return false;
    // A match is complete if it has numeric scoreA and scoreB (or it's a bye with playerBId == null and scoreA present)
    return current.every((m) => {
      if (m.playerBId == null) return typeof m.scoreA === "number";
      return typeof m.scoreA === "number" && typeof m.scoreB === "number";
    });
  };

  const createNextRound = async (t: Tournament) => {
    setStartLoading(true);
    setError(null);
    try {
      const raw = getRawToken();
      if (!raw) return setError("Admin token required to create next round");

      const res = await fetch(`${baseUrl}/tornament/${t.id}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${raw}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.message || "Failed to create next round");
      } else {
        // refresh matches for the selected tournament
        await selectTournament(t);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create next round");
    } finally {
      setStartLoading(false);
    }
  };

  return (
    <section
      style={{ backgroundColor: palette.background, minHeight: "100vh" }}
      className="relative"
    >
      <div className="flex flex-col md:flex-row items-start gap-6 p-6">
        <div className="w-full md:w-1/3 bg-white rounded p-4 shadow">
          <h3 className="text-lg font-semibold mb-3">Tournaments</h3>
          {isAdmin && (
            <div className="mb-3">
              <button
                onClick={createTournament}
                disabled={createLoading}
                className={`px-3 py-1 rounded text-white ${
                  createLoading ? "bg-gray-400" : "bg-blue-700"
                }`}
              >
                {createLoading ? "Creating..." : "New Tournament"}
              </button>
            </div>
          )}
          {loading && <div>Loading...</div>}
          {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
          <ul>
            {tournaments.map((t) => (
              <li key={t.id} className="mb-2">
                <button
                  onClick={() => selectTournament(t)}
                  className="w-full text-left p-2 rounded hover:bg-gray-100"
                >
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-gray-600">
                    Participants: {t.participants ? t.participants.length : 0}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-2/3 bg-white rounded p-4 shadow">
          {!selected ? (
            <div>Select a tournament to see details</div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{selected.name}</h2>
                  <div className="text-sm text-gray-600">
                    Created: {new Date(selected.createdAt).toLocaleString()}
                  </div>
                  {selected.winnerId && (
                    <div className="text-sm text-green-700 mt-1">
                      Winner:{" "}
                      {selected.participants?.find(
                        (p) => p.id === selected.winnerId
                      )?.user?.name ?? "(unknown)"}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => selected && register(selected)}
                    disabled={regLoading || !notStarted(selected)}
                    className={`px-4 py-2 rounded font-semibold text-white ${
                      regLoading || !notStarted(selected)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-amber-700"
                    }`}
                  >
                    {regLoading
                      ? "Registering..."
                      : notStarted(selected)
                      ? "Register"
                      : "Tournament started"}
                  </button>
                  {isAdmin && selected && (
                    <button
                      onClick={() => startTournament(selected)}
                      disabled={startLoading || !notStarted(selected)}
                      className={`px-4 py-2 rounded font-semibold text-white ${
                        startLoading || !notStarted(selected)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-700"
                      }`}
                    >
                      {startLoading ? "Starting..." : "Start Tournament"}
                    </button>
                  )}
                  {isAdmin && selected && matches.length > 0 && (
                    <button
                      onClick={() => createNextRound(selected)}
                      disabled={startLoading || !canCreateNextRound()}
                      className={`px-4 py-2 rounded font-semibold text-white ${
                        startLoading || !canCreateNextRound()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-600"
                      }`}
                    >
                      {startLoading ? "Creating..." : "Create Next Round"}
                    </button>
                  )}
                  {isAdmin && selected && matches.length > 0 && (
                    <button
                      onClick={async () => {
                        // create close action
                        setStartLoading(true);
                        setError(null);
                        try {
                          const raw = getRawToken();
                          if (!raw)
                            return setError(
                              "Admin token required to close tournament"
                            );
                          const res = await fetch(
                            `${baseUrl}/tornament/${selected.id}/close`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${raw}`,
                              },
                            }
                          );
                          const json = await res.json();
                          if (!res.ok) {
                            setError(
                              json?.message || "Failed to close tournament"
                            );
                          } else {
                            // update UI with closed tournament (includes winner)
                            const updated = json.tournament as Tournament;
                            if (updated) {
                              setSelected(updated);
                              setTournaments((prev) =>
                                prev.map((p) =>
                                  p.id === updated.id ? updated : p
                                )
                              );
                            }
                          }
                        } catch (e) {
                          console.error(e);
                          setError("Failed to close tournament");
                        } finally {
                          setStartLoading(false);
                        }
                      }}
                      disabled={
                        startLoading ||
                        !canCreateNextRound() ||
                        !matches.every((m) =>
                          m.playerBId == null
                            ? typeof m.scoreA === "number"
                            : typeof m.scoreA === "number" &&
                              typeof m.scoreB === "number"
                        )
                      }
                      className={`px-4 py-2 rounded font-semibold text-white ${
                        startLoading || !canCreateNextRound()
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-700"
                      }`}
                    >
                      {startLoading ? "Closing..." : "Close Tournament"}
                    </button>
                  )}
                  {isAdmin && selected && (
                    <button
                      onClick={() => resetTournament(selected)}
                      disabled={resetLoading}
                      className={`px-4 py-2 rounded font-semibold text-white ${
                        resetLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600"
                      }`}
                    >
                      {resetLoading ? "Resetting..." : "Reset Tournament"}
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Participants</h3>
                <ul className="mt-2">
                  {(() => {
                    const points = computePoints(matches);
                    return (selected.participants || []).map(
                      (p: Participant) => (
                        <li key={p.id} className="py-1 border-b">
                          {p.user?.name ?? p.userId} — {points[p.id] ?? 0} pts
                        </li>
                      )
                    );
                  })()}
                  {(selected.participants || []).length === 0 && (
                    <li>No participants yet</li>
                  )}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Matches</h3>
                <ul className="mt-2">
                  {matches.length === 0 && <li>No matches listed</li>}
                  {matches.map((m) => (
                    <li key={m.id} className="py-1 border-b">
                      <div>
                        Round {m.round}: {m.playerA?.user?.name ?? m.playerAId}{" "}
                        vs {m.playerB?.user?.name ?? m.playerBId} — {m.scoreA} :{" "}
                        {m.scoreB}
                      </div>
                      {isAdmin && (
                        <div className="mt-2 flex gap-2">
                          {m.playerBId == null ? (
                            <button
                              onClick={() =>
                                setMatchResult(m.id, { result: "A" })
                              }
                              disabled={Boolean(matchLoading[m.id])}
                              className="px-2 py-1 bg-blue-600 text-white rounded disabled:opacity-0"
                            >
                              {matchLoading[m.id] ? "..." : "Give Bye / Win A"}
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  setMatchResult(m.id, { result: "A" })
                                }
                                disabled={Boolean(matchLoading[m.id])}
                                className="px-2 py-1 bg-green-600 text-white rounded disabled:opacity-0"
                              >
                                {matchLoading[m.id] ? "..." : "A wins"}
                              </button>
                              <button
                                onClick={() =>
                                  setMatchResult(m.id, { result: "B" })
                                }
                                disabled={Boolean(matchLoading[m.id])}
                                className="px-2 py-1 bg-red-600 text-white rounded disabled:opacity-0"
                              >
                                {matchLoading[m.id] ? "..." : "B wins"}
                              </button>
                              <button
                                onClick={() =>
                                  setMatchResult(m.id, { result: "draw" })
                                }
                                disabled={Boolean(matchLoading[m.id])}
                                className="px-2 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
                              >
                                {matchLoading[m.id] ? "..." : "Draw"}
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// named export to match Router imports
