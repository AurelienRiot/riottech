"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Currency from "@/components/ui/currency";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn, dateFormatter } from "@/lib/utils";
import type { Subscription } from "@prisma/client";
import { addDays, addMonths, addWeeks, addYears } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RegisterForm } from "../../(auth)/register/_components/register-form";
import checkoutSubscription from "../_action/checkout-subscription";

const baseUrl = process.env.NEXT_PUBLIC_URL;

interface SelectSubscriptionProps {
  subscriptions: Subscription[];
  sim: string | undefined;
  subId: string | undefined;
}
export const SelectSubscription: React.FC<SelectSubscriptionProps> = ({ subscriptions, sim, subId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | undefined>(
    subscriptions.find((sub) => sub.id === subId) ?? undefined,
  );
  const displayTrial = searchParams.get("trial") === "true";
  const [trialEnd, setTrialEnd] = useState<Date>(addDays(new Date(), 3));

  useEffect(() => {
    function setSub() {
      setSelectedSubscription(subscriptions.find((sub) => sub.id === subId) ?? undefined);
    }

    setSub();
  }, [subscriptions, subId]);

  const map = new Map<string, Subscription[]>();
  for (const subscription of subscriptions) {
    const groupName = subscription.name;
    if (!map.has(groupName)) {
      map.set(groupName, []);
    }
    map.get(groupName)?.push(subscription);
  }

  const groupedSubscriptions = Array.from(map.values());

  const displayRecurrence =
    selectedSubscription?.recurrence === "month"
      ? "mois"
      : selectedSubscription?.recurrence === "year"
        ? "an"
        : selectedSubscription?.recurrence === "week"
          ? "semaine"
          : "jour";

  const nextRecurrence =
    selectedSubscription?.recurrence === "month"
      ? dateFormatter(addMonths(trialEnd, 1))
      : selectedSubscription?.recurrence === "year"
        ? dateFormatter(addYears(trialEnd, 1))
        : selectedSubscription?.recurrence === "week"
          ? dateFormatter(addWeeks(trialEnd, 1))
          : dateFormatter(addDays(trialEnd, 1));

  const onCheckOut = async () => {
    setLoading(true);
    if (!selectedSubscription) {
      toast.error("Veuillez choisir un abonnement.");
      setLoading(false);
      return;
    }

    if (!sim) {
      toast.error("Veuillez renseigner le numéro de la SIM.");
      setLoading(false);
      return;
    }
    await checkoutSubscription({
      sim,
      subscriptionId: selectedSubscription.id,
      trialEnd: displayTrial ? Math.floor(trialEnd.getTime() / 1000) : undefined,
    })
      .then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }
        window.location.href = res.data;
      })
      .catch(() => toast.error("Erreur."))
      .finally(() => {
        setLoading(false);
      });
  };

  const redirectSub = (subscriptionId: string) => {
    if (!sim) {
      router.refresh();
      toast.error("Erreur. Veuillez renseigner le numéro de la SIM.");
      return;
    }
    router.push(`?sim=${encodeURIComponent(sim)}&subId=${encodeURIComponent(subscriptionId)}`, { scroll: false });
  };

  return (
    <>
      <div className="mt-4 flex flex-col justify-center gap-2 text-center">
        <h2 className="text-center text-lg">Choisissez votre abonnement : </h2>
        <Select
          key={selectedSubscription?.id}
          value={
            selectedSubscription
              ? groupedSubscriptions.find((group) => group.some((sub) => sub.id === selectedSubscription.id))?.[0].id
              : undefined
          }
          onValueChange={(value) => redirectSub(value)}
        >
          <SelectTrigger className={"w-[280px]"}>
            <SelectValue placeholder="Abonnements" />
          </SelectTrigger>
          <SelectContent position="popper">
            {groupedSubscriptions.map((obj) => (
              <SelectItem key={obj[0].id} value={obj[0].id}>
                {obj[0].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {groupedSubscriptions.map((obj, index) =>
          obj.some((sub) => sub.id === selectedSubscription?.id) ? (
            <div key={index} className="flex flex-row justify-center gap-2 text-center">
              <p className="my-auto text-center">Renouvellement: </p>
              {obj.map((sub) => (
                <Button
                  key={sub.id}
                  onClick={() => redirectSub(sub.id)}
                  data-active={sub.id === selectedSubscription?.id}
                  className="border-2 border-transparent data-[active=false]:bg-primary-foreground data-[active=false]:text-primary hover:data-[active=false]:border-border"
                >
                  {sub.recurrence === "month"
                    ? "Mensuel"
                    : sub.recurrence === "year"
                      ? "Annuel"
                      : sub.recurrence === "week"
                        ? "Hebdomadaire"
                        : "Journalier"}
                </Button>
              ))}
            </div>
          ) : null,
        )}
      </div>
      {selectedSubscription ? (
        <>
          <div className="mt-4 flex flex-col rounded-lg bg-gray-200 p-4 dark:bg-gray-900">
            <div className="mb-2  flex w-fit flex-col justify-center self-center rounded-lg bg-gray-100 p-2 text-center dark:bg-gray-800">
              <h2 className="mb-3 text-2xl font-semibold text-secondary-foreground">Votre commande</h2>
              <p className="mb-2 text-secondary-foreground/80">Sim: {sim}</p>
            </div>
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-medium text-secondary-foreground">Produit</h3>
                <Separator className="mb-1 bg-secondary-foreground" />
                <p className="text-secondary-foreground/80">Carte SIM RIOT TECH {selectedSubscription?.name} x 1</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-secondary-foreground">Prix</h3>
                <Separator className="mb-1 bg-secondary-foreground" />
                <p className="inline gap-1 text-secondary-foreground/80">
                  <Currency value={selectedSubscription.priceHT} displayLogo={false} />
                  {" et un coût d'achat de l'équipement de "}{" "}
                  <Currency value={selectedSubscription.fraisActivation} displayLogo={false} />{" "}
                </p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="font-medium text-secondary-foreground">Total:</div>
              <div className=" font-medium text-secondary-foreground">
                <Currency value={selectedSubscription.priceHT + selectedSubscription.fraisActivation} />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="font-bold text-secondary-foreground">Total récurrent:</div>
              <div className="inline gap-1 font-bold text-secondary-foreground">
                <Currency value={selectedSubscription.priceHT} displayLogo={false} className="mr-1" />
                {`  /  ${displayRecurrence}`}
              </div>
            </div>
            {displayTrial && <DatePicker date={trialEnd} onChange={setTrialEnd} />}
            <p className="mb-4 text-secondary-foreground/80">Premier renouvellement : {nextRecurrence}</p>
          </div>
          <div className="mb-6 mt-8  ">
            {!session && (
              <div className="flex justify-center ">
                <div className="space-y-12 rounded-xl px-8 pb-8 pt-12 sm:bg-white sm:shadow-xl sm:dark:bg-black">
                  <h1 className="text-2xl font-semibold">
                    Créer votre compte <br />
                    <span className="text-xs text-red-500">*Obligatoire</span>
                  </h1>

                  <RegisterForm callback={`${baseUrl}/activation-sim?sim=${sim}&subId=${selectedSubscription.id}`} />
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <Button disabled={loading || !session} onClick={onCheckOut} className="mt-4">
                {loading && <Loader2 className={"mr-2 h-4 w-4 animate-spin"} />}
                Souscrire
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

function DatePicker({ date, onChange }: { date: Date; onChange: (value: Date) => void }) {
  const [open, setOpen] = useState(false);

  function onSelectedDate(date: Date | undefined) {
    if (date) {
      onChange(date);
      setOpen(false);
    }
  }

  return (
    <div className="mb-4 flex gap-4 items-center">
      <Label className="text-secondary-foreground">Date de la premiere facturation</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-[240px] pl-3 text-left font-normal", !date && "text-muted-foreground")}
          >
            {date ? dateFormatter(date) : <span>Choisir une date</span>}

            <Icons.coloredCalendar
              className="ml-auto h-4 w-4 opacity-100 data-[state=false]:opacity-50"
              data-state={!!date}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="absolute w-auto p-0">
          <Calendar
            mode="single"
            className="p-3"
            captionLayout="buttons"
            selected={date}
            locale={fr}
            onSelect={onSelectedDate}
            modifiers={{
              disabled: (date) => date < addDays(new Date(), 2),
            }}
            // modifiers={{
            //   full: fullDays,
            //   partiallyFull: partiallyFullDays,
            //   free: freeDays,
            // }}
            // modifiersStyles={{
            //   full: fullDaysStyle,
            //   partiallyFull: partiallyFullDaysStyle,
            //   free: freeDaysStyle,
            // }}
            // onDayClick={handleDayClick}
            // footer={GetFooterMessage(isDayAvailable)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
