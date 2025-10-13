import club_img from "../assets/chess_club.svg";
// import club_img_1 from "../assets/club_imgs_1.jpg";
// import club_img_2 from "../assets/club_imgs_2.jpg";
// import club_img_3 from "../assets/club_imgs_3.jpg";
// import club_img_4 from "../assets/club_imgs_4.jpg";
// import club_img_5 from "../assets/club_imgs_5.jpg";
// import club_img_6 from "../assets/club_imgs_6.jpg";

export default function Carousel() {
	return (
		<section className="h-full w-full bg-transparent flex justify-center items-center">
			<img src={club_img} className="h-full w-3/5 rounded-4xl shadow-2xl" alt="" />
		</section>
	);
}
