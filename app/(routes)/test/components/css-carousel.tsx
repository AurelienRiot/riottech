"use client";
import Image from "next/image";

const CSSCarousel = () => {
  const carouselItems = [
    { src: "/camera_ferme.jpeg", alt: "" },
    { src: "/icone_diagnostic.jpeg", alt: "" },
    { src: "/icone_rapide.jpeg", alt: "" },
  ];

  return (
    <>
      <div className="carousel justify-self-center carousel-center w-[200px] h-[150px] p-4 space-x-4 bg-black rounded-lg hide-scrollbar">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="carousel-item w-[120px] h-[120px] relative cursor-pointer "
          >
            <Image
              alt={item.alt}
              onClick={(e) => {
                e.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
              fill
              sizes="20%"
              src={item.src}
              className="rounded-lg object-contain box-content border border-gray-700 w-full h-full"
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .carousel {
          display: inline-flex;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scroll-padding: 1px;
        }

        .carousel-vertical {
          display: flex;
          flex-direction: column;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
        }

        .carousel-item {
          box-sizing: content-box;
          display: flex;
          flex: none;
          scroll-snap-align: start;
        }

        .carousel-center .carousel-item {
          scroll-snap-align: center;
        }

        .carousel-end .carousel-item {
          scroll-snap-align: end;
        }
      `}</style>
    </>
  );
};

export default CSSCarousel;
