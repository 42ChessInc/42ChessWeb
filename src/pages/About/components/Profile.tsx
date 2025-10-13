import danImg from "../../../assets/profilePictures/danielfonsecaa.jpeg"
import ximImg from "../../../assets/profilePictures/denionline.jpeg"
import julioImg from "../../../assets/profilePictures/juliosouza.jpeg"
import gabrielImg from "../../../assets/profilePictures/gabriellarocque.jpeg"
import leoImg from "../../../assets/profilePictures/leoc01.jpeg"
import japaImg from "../../../assets/profilePictures/rafaelyrezende.jpeg"
import rapphaImg from "../../../assets/profilePictures/therappha.jpeg"

interface ProfilesType {
    username: string;
    imageUrl?: string;
    description?: string;
    linkedIn?: string;
}
export default function Profiles() {
    /* const [profiles, setProfiles] = useState<ProfilesType[]>([
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
    GetGitUser(); */
    const profiles: ProfilesType[] = [
        {

            username: "Daniel Fonseca",
            imageUrl: danImg,
            description: "Web Developer",
            linkedIn: "https://www.linkedin.com/in/danieldfonseca/",
        },
        {

            username: "Daniel Ximenes",
            imageUrl: ximImg,
            description: "Web Developer",
            linkedIn: "https://www.linkedin.com/in/denionline/",
        },
        {

            username: "Julio Souza",
            imageUrl: julioImg,
            description: "Web Developer",
            linkedIn: "https://www.linkedin.com/in/juliosouzadev/",
        },
        {

            username: "Leonardo Campetti",
            imageUrl: leoImg,
            description: "Web Developer",
            linkedIn: "https://www.linkedin.com/in/leocampetti/",
        },
        {

            username: "Rafael Rezende",
            imageUrl: japaImg,
            description: "Chess Engine",
            linkedIn: "https://www.linkedin.com/in/rafaellyrezende/",
        },
        {

            username: "Gabriel La Rocque",
            imageUrl: gabrielImg,
            description: "Chess Engine",
            linkedIn: "https://www.linkedin.com/in/gabriel-aguiar/",
        },
        {

            username: "Rafael Castro",
            imageUrl: rapphaImg,
            description: "Chess Engine",
            linkedIn: "https://www.linkedin.com/in/therappha/",
        },
    ]
    return (
        <div className="flex flex-col items-center flex-wrap mt-10 mx-auto w-full">
            <h2 className="text-2xl font-bold text-center">Developers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
                {profiles.map((profile) => (
                    <ProfileCard profile={profile} />
                ))}
            </div>

        </div>
    );
}

const ProfileCard = ({ profile }: { profile: ProfilesType }) => {
    const {username, imageUrl, description, linkedIn} = profile;
    return (
        <div className="flex items-start hover:shadow-[0px_7px_29px_5px_rgba(100,_100,_111,_0.14)] p-5 transition-shadow">
            <a className="flex items-start" href={linkedIn} target="_blank">
                <img className="rounded-[50%] w-[50px] h-[50px] mr-3" src={imageUrl}></img>
                <div>
                    <h3 className="font-bold mb-0 text-lg text-gray-900">{username}</h3>
                    <p className="text-gray-600">{description}</p>
                </div>
            </a>
        </div>
    )
}