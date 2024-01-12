"use client";
import { AlertModal } from "@/components/modals/alert-modal-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CardUserProps {
    user: User;
    orderLength: number;
    subscriptionOrderLength: number;
}

const CardUser: React.FC<CardUserProps> = ({
    user,
    orderLength,
    subscriptionOrderLength,
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    async function handleDelete() {
        try {
            setLoading(true);
            await axios.delete(`/api/users/id-admin/${user.id}`);
            router.refresh();
            toast.success("Utilisateur supprimé");
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data) {
                toast.error(axiosError.response.data as string);
            } else {
                toast.error("Erreur");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete}
                loading={loading}
            />

            <Card>
                <CardHeader>
                    <CardTitle
                        onClick={() => router.push(`/admin/users/${user.id}`)}
                        className="cursor-pointer hover:underline"
                    >
                        {user.name} {user.surname}
                    </CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="p-2">
                        {user.isPro ? "Professionnel" : "Particulier"}
                    </p>
                    <p className="p-2">{`Nombre de commandes : ${orderLength}`}</p>
                    <p className="p-2">{`Nombre d'abonnements : ${subscriptionOrderLength}`}</p>
                </CardContent>
                <CardFooter className="flex flex-col justify-between gap-y-3 lg:flex-row lg:gap-x-2">
                    <Button
                        variant="destructive"
                        onClick={() => setOpen(true)}
                        className="hover:underline"
                    >
                        Supprimer
                    </Button>
                    <Button className="hover:underline">
                        <Link href={`/admin/users/${user.id}`}>Modifier</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
};

export default CardUser;
