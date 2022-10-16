import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "flowbite-react";
import type { NextPage } from "next";
import { useState } from "react";

import { AddContactDialog } from "../components/dialog/AddContactDialog";
import { ContactList, ContactListItem } from "../components/lists";
import { Axios } from "../services";

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data } = useQuery(
    ["contacts"],
    async () => {
      const res = await Axios.get("/contacts");
      return res.data;
    },
    {
      onSuccess: () => setLoading(false),
    }
  );

  return (
    <div className="flex flex-col h-screen p-6 space-y-3">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold">Contacts</h1>
      </div>
      <div className="flex flex-row pb-2">
        <div className="grow" />
        <Button onClick={() => setIsDialogOpen(true)}>New</Button>
      </div>
      <div className="my-4 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : data.data.length > 0 ? (
          <ContactList>
            {data.data.map((contact: any, index: number) => {
              return (
                <ContactListItem
                  key={index}
                  id={contact._id}
                  name={contact.name}
                  email={contact.email}
                  phone={contact.phone}
                  gender={contact.gender}
                />
              );
            })}
          </ContactList>
        ) : (
          <div className="flex items-center justify-center">
            <p>No contacts found</p>
          </div>
        )}
      </div>
      <AddContactDialog
        onClose={() => setIsDialogOpen(false)}
        isOpen={isDialogOpen}
      />
    </div>
  );
};

export default Home;
