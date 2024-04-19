import ButtonRedirectionV2 from "./_components/button-redirection";
import Reseau4GPage from "./_components/reseau-4G";

const SolutionInternetPage = () => {
  return (
    <section className="mt-10 flex flex-col items-center text-center ">
      <ButtonRedirectionV2 />
      <div className="relative space-y-10 bg-primary-foreground/95 pb-10 pt-6  ">
        <Reseau4GPage />
      </div>
    </section>
  );
};

export default SolutionInternetPage;
