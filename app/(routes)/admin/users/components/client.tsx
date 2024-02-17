"use client";

import { User } from "@prisma/client";
import CardUser from "./card-user";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading } from "@/components/ui/heading";

interface UserClientProps {
  users: User[];
  orderLengths: number[];
  subscriptionOrderLengths: number[];
}

const UserClient: React.FC<UserClientProps> = ({
  users,
  orderLengths,
  subscriptionOrderLengths,
}) => {
  const [search, setSearch] = useState("");

  const searchKeys = [
    "email",
    "name",
    "surname",
    "phone",
    "addresse",
    "tva",
    "raisonSocial",
  ];
  const displayKeys = [
    "email",
    "nom",
    "prenom",
    "téléphone",
    "addresse",
    "tva",
    "Raison Social",
  ];
  const [selectValue, setSelectValue] = useState(searchKeys[1]);

  const filteredUsers = users.filter((user) => {
    const value = String((user as any)[selectValue]);
    return value.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className="m-4">
        <Heading
          title={`Clients (${filteredUsers.length})`}
          description="Liste des clients"
        />
        <div className="grid grid-cols-1 gap-4 mt-4 justify-content-center md:grid-cols-6">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Recherche"
          />

          <Select
            defaultValue={selectValue}
            onValueChange={(newValue) => {
              setSelectValue(newValue);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent>
              {searchKeys.map((key, index) => (
                <SelectItem key={key} value={key}>
                  {String(displayKeys[index])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 p-6 gap-3 2xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center ">
          {filteredUsers.map((user, index) => (
            <CardUser
              key={user.id}
              className="m-4"
              user={user}
              subscriptionOrderLength={subscriptionOrderLengths[index]}
              orderLength={orderLengths[index]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserClient;
