import Container from "@/components/ui/container";
import GetSubscriptions from "@/server-actions/get-subscriptions";
import Client from "./components/client";

export const metadata = {
    title: "Riot Tech - Activation SIM",
    description: "Activation d'une carte SIM RIOT TECH",
};

const activationSIMPage = async (context: any) => {
    const subscriptions = await GetSubscriptions();
    console.log(context);
    // const groupedSubscriptionsObj = subscriptions.reduce<
    //     Record<string, Subscription[]>
    // >((acc, product) => {
    //     if (!acc[product.name]) {
    //         acc[product.name] = [];
    //     }
    //     acc[product.name].push(product);
    //     return acc;
    // }, {});
    //
    // const groupedSubscriptions = Object.values(groupedSubscriptionsObj);

    return (
        <Container className="bg-background pt-10">
            <div className="flex flex-col items-center justify-center p-2 text-primary sm:p-10">
                <Client subscriptions={subscriptions} />
            </div>
        </Container>
    );
};

export default activationSIMPage;
