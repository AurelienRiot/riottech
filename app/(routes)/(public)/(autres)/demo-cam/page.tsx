import type { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Démonstration des caméras",
    description:
      "La caméra RIOT TECH est une caméra de surveillance intelligente, résistante et adaptée pour les élevages",
  };
}

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
      <header className="container mx-auto p-4">
        <h1 className="mb-8 text-center text-4xl font-bold">Utilisation de caméra RIOT TECH en élevage</h1>
      </header>

      <section className="container mx-auto p-4">
        <article className="flex flex-wrap items-center justify-center rounded-xl border-4 border-gray-700 p-4">
          <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
            <h2 className="mb-4 text-left text-2xl font-semibold">Caractéristiques et installation</h2>
            <p className="mb-4 text-center text-lg">
              La caméra RIOT TECH est une caméra de surveillance intelligente, résistante et adaptée pour les élevages.
              Elle offre les avantages suivants :
            </p>
            <ul className="mb-4 list-inside list-disc pl-8">
              <li>Pivot à 360 degrés pour une vision panoramique</li>
              <li>Vision nocturne pour une surveillance 24h/24</li>
              <li>Haute définition pour une image claire et nette</li>
              <li>Contrôle à distance via ordinateur, smartphone ou tablette</li>
            </ul>
            <p className="mb-4 text-justify text-lg">
              Voici un exemple de caméra RIOT TECH installée dans un élevage :
            </p>
          </div>
          <div className="relative flex overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/camera_batiment.jpeg"
              alt="Exemple de caméra RIOT TECH installée dans un élevage"
              className="rounded-lg shadow-lg transition-all duration-500 hover:scale-110"
              width={512}
              height={384}
            />
          </div>
        </article>
      </section>

      <section className="container flex flex-wrap items-center justify-center gap-6">
        {videos.map((video) => (
          <div key={video.id} className="relative grid w-[480px] grid-cols-1 items-center justify-center">
            <h2 className="mt-2 flex justify-center text-center text-2xl font-semibold">{video.nom}</h2>
            <div className="h-[270px]">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.nom}
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default DemoCamPage;
