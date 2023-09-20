import ButtonBackward from "@/components/ui/button-backward";

const NotFound = () => {
  return ( 
    <div className="grid h-screen px-4 bg-primary-foreground place-content-center">
  <div className="text-center">
    <h1 className="font-black text-gray-200 text-9xl dark:text-gray-700">404</h1>

    <p
      className="text-2xl font-bold tracking-tight text-primary"
    >
      Erreur
    </p>

    <p className="mt-4 mb-4 text-gray-500 dark:text-gray-400">
      Page introuvable.
    </p>

    <ButtonBackward />
  </div>
</div>
   );
}
 
export default NotFound;