// import Lottie from "react-lottie-player";
// import animationData from "../assets/error404_animation.json";

export const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4">
      <div style={{ width: 480, maxWidth: "100%" }}>
        {/* <Lottie play loop animationData={animationData} /> */}
      </div>
      <h1 className="mt-4 text-2xl font-bold">404 — Page not found</h1>
      <p className="text-center mt-2">The page you requested does not exist.</p>
    </div>
  );
};
