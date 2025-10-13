import {useState} from "react";
interface ProfilesType {
    username: string;
    imageUrl?: string;
}
export default function Profiles() {
    const [profiles, setProfiles] = useState<ProfilesType[]>([
        {username: "Denionline"},
        {username: "JulioSouza09"},
        {username: "leoc01"},
        {username: "DanielFonsecaa"},
        {username: "larocqueg"},
        {username: "therappha"},
        {username: "RafaelyRezende"},
    ]);
    async function GetGitUser() {
        try {
            const results = await Promise.all(
                profiles.map((user) =>
                    fetch(`https://api.github.com/users/${user.username}`).then((res) => {
                        if (!res.ok) throw new Error("res");
                        return res.json();
                    })
                )
            );
            setProfiles((prev) =>
                prev.map((p, i) => ({...p, imageUrl: results[i].avatar_url}))
            );
        } catch (err) {
            console.error("Failed to fetch github users", err);
        }
    }
    GetGitUser();
    return (
        <div>
            {profiles.map((user) => (
                <img src={user.imageUrl} alt="" />
            ))}
        </div>
    );
}