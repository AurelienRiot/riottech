import { SkeletonAdressForm } from "@/components/adress-form";
import Spinner from "@/components/animations/spinner";
import { Button } from "@/components/ui/button";
import ButtonBackward from "@/components/ui/button-backward";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";

const SettingsLoading = () => {
  return (
    <div className="flex-col p-8 pt-6">
      <div className="flex-1 mb-8 space-y-4 ">
        <div>
          <div className="flex flex-col items-center justify-between gap-4 mb-4 md:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">
              {" "}
              <Skeleton className="w-40 h-6 rounded-full" />{" "}
            </h2>
            <Button variant="outline" className="ml-3" disabled={true}>
              {" "}
              Changer de mot de passe{" "}
            </Button>
            <Button
              disabled={true}
              variant="destructive"
              size="sm"
              className="ml-3"
            >
              Supprimer le compte <Trash className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <Separator />
          <p>
            <Skeleton className="w-40 h-6 rounded-full" />{" "}
          </p>
          <div className="flex mt-6 ">
            <Button
              disabled={true}
              className={
                "selected bg-green-500 ml-3 hover:bg-green-500 text-black"
              }
            >
              Particulier
            </Button>

            <Button
              disabled={true}
              className={
                " bg-gray-500 ml-3 hover:bg-green-200  hover:text-black"
              }
            >
              Professionnel
            </Button>
          </div>
          <div className="w-full space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-2">
                <div>Nom</div>

                <Input disabled={true} type="text" placeholder={"Nom"} />
              </div>
              <div className="space-y-2">
                <div>Prénom</div>

                <Input disabled={true} type="text" placeholder={"Prénom"} />
              </div>
              <div className="space-y-2">
                <div>Numeros de téléphone</div>

                <Input
                  disabled={true}
                  type="number"
                  placeholder={"06 00 00 00"}
                />
              </div>
              <SkeletonAdressForm />
            </div>
            <Button disabled={true} className="ml-auto " type="submit">
              <Spinner size={20} />
            </Button>
          </div>
          <ButtonBackward className="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default SettingsLoading;
