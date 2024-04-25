import ButtonRedirectionV2 from "./_components/button-redirection";

const SolutionInternetPage = (context: {
  searchParams: { btn: string | undefined };
}) => {
  const btn = context.searchParams.btn;
  const initialButton = btn ? decodeURIComponent(btn) : undefined;
  return (
    <section className="my-10 flex flex-col items-center text-center ">
      <ButtonRedirectionV2 initialButton={initialButton} />
    </section>
  );
};

export default SolutionInternetPage;
