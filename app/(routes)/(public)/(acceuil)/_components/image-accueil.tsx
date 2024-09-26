import ImageFerme from "@/public/dairy_cows.webp";
import Image from "next/image";

const ImageAccueil = () => {
  // const { scrollYProgress } = useScroll();
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5], {
  //   ease: easeInOut,
  // });

  // const Video = () => {
  //   return (
  //     <video
  //       controls={false}
  //       autoPlay
  //       loop
  //       muted
  //       playsInline
  //       className="absolute top-0 left-0 object-cover object-center w-full h-full"
  //       title="video background"
  //     >
  //       <source src="./videos/film_guimbert.webm" type="video/webm" />
  //     </video>
  //   );
  // };
  return (
    <div
      // style={{ scale: scale }}
      className="fixed left-0 top-0 -z-10 h-full w-full"
    >
      <Image
        priority
        src={ImageFerme}
        placeholder={placeholder}
        alt="image background"
        sizes="100vw"
        className="absolute left-0 top-0 h-full w-full object-cover object-center"
      />
      <div className="absolute left-0 top-0 h-full w-full bg-black/50" />
    </div>
  );
};

export default ImageAccueil;

const placeholder =
  "data:image/webp;base64,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";
