import { Body, Button, Container, Head, Hr, Html, Img, Preview, Tailwind, Text } from "@react-email/components";

const main = {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const MainBody = ({
  children,
  previewText,
  baseUrl,
}: {
  children: React.ReactNode;
  previewText: string;
  baseUrl: string;
}) => (
  <Html>
    <Head />
    <Preview>{previewText}</Preview>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              primary: "#0f172a",
            },
          },
        },
      }}
    >
      <Body style={main} className="mx-auto my-auto bg-white px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[465px] rounded-sm border border-solid border-[#eaeaea] p-[20px]">
          <a href={baseUrl} target="_blank" rel="noreferrer">
            <Img src={`${baseUrl}/icone.png`} width="75" height="75" alt="RIOT TECH Logo" className="m-auto" />
          </a>
          {children}
          <Footer />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

const Footer = () => (
  <>
    <Text className="text-center text-base ">
      Cordialement,
      <br />
      RIOT TECH
    </Text>
    <Hr className="my-5 border-[#cccccc] " />
    <Text className="text-xs text-[#8898aa]">© RIOT TECH - Kervihan 56930 Pluméliau-Bieuzy</Text>
  </>
);

export const ButtonRedirect = ({ href, text }: { href: string; text: string }) => (
  <Button className="rounded-lg bg-green-500 px-6 py-3 text-center text-base text-primary" href={href} target="_blank">
    {text}
  </Button>
);

export default MainBody;
