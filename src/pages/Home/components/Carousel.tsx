import club_img from '../assets/chess_club.svg';
// import club_img_1 from "../assets/club_imgs_1.jpg";
// import club_img_2 from "../assets/club_imgs_2.jpg";
// import club_img_3 from "../assets/club_imgs_3.jpg";
// import club_img_4 from "../assets/club_imgs_4.jpg";
// import club_img_5 from "../assets/club_imgs_5.jpg";
// import club_img_6 from "../assets/club_imgs_6.jpg";

export default function Carousel() {
	return (
		<section className="mx-auto max-w-4xl p-4 bg-transparent flex justify-center items-center my-10">
			<img
				src={club_img}
				className="w-full aspect-auto rounded-xl shadow-2xl"
				alt=""
			/>
		</section>
	);
}
