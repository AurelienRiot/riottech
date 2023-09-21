"use client";
import Image from "next/image";

const DemoCamPage = () => {
  const videos = [
    {
      nom: "Démonstration en journée",
      id: "mgduLpUfF3g",
    },
    {
      nom: "Démonstration en vision nocturne ",
      id: "fBI4HWMMBeQ",
    },
    {
      nom: "Enregistrement et post-visionage via tout les appareils",
      id: "ZWJbWpPkwRY",
    },
    {
      nom: "Visionnable et actionnable à partir de tous vos appareils",
      id: "5M-5uht8s58",
    },
  ];

  return (
    <>
      <header className="container p-4 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center">
          Utilisation de caméra RIOT TECH en élevage
        </h1>
      </header>

      <section className="container p-4 mx-auto">
        <article className="flex flex-wrap items-center justify-center p-4 border-4 border-gray-700 rounded-xl">
          <div className="flex flex-col items-center justify-center w-full p-6 lg:w-1/2">
            <h2 className="mb-4 text-2xl font-semibold text-left">
              Caractéristiques et installation
            </h2>
            <p className="mb-4 text-lg text-center">
              La caméra RIOT TECH est une caméra de surveillance intelligente
              conçue pour les élevages. Elle offre les avantages suivants :
            </p>
            <ul className="pl-8 mb-4 list-disc list-inside">
              <li>Pivot à 360 degrés pour une vision panoramique</li>
              <li>Vision nocturne pour une surveillance 24h/24</li>
              <li>Haute définition pour une image claire et nette</li>
              <li>
                Contrôle à distance via ordinateur, smartphone ou tablette
              </li>
            </ul>
            <p className="mb-4 text-lg text-justify">
              Voici un exemple de caméra RIOT TECH installée dans un élevage :
            </p>
          </div>
          <div className="relative flex overflow-hidden">
            <Image
              src="/camera_batiment.jpeg"
              alt="Exemple de caméra RIOT TECH installée dans un élevage"
              className="transition-all rounded-lg shadow-lg hover:scale-105"
              width={512}
              height={384}
            />
          </div>
        </article>
      </section>

      <section className="container flex flex-wrap items-center justify-center gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative grid items-center justify-center grid-cols-1 w-[480px]"
          >
            <h2 className="flex justify-center mt-2 text-2xl font-semibold text-center">
              {video.nom}
            </h2>
            <div className="h-[270px]">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.nom}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default DemoCamPage;
