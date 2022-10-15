import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button, Spinner, TextInput } from "flowbite-react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { PrimaryButton } from "../components/buttons";
import { AddContactDialog } from "../components/dialog/AddContactDialog";
import { ContactList, ContactListItem } from "../components/lists";
import { Axios } from "../services";

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isError, data, error } = useQuery(
    ["contacts"],
    async () => {
      const res = await Axios.get("/contacts");
      console.log(res);

      return res.data;
    },
    {
      onSuccess: () => setLoading(false),
      onError: (err: AxiosError) => console.log(err.response?.data),
    }
  );

  useEffect(() => {
    if (isError) {
      console.log(error.response?.data);
    }
  }, [isError, error]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold my-6">Contacts</h1>
      </div>
      <div className="flex flex-row pb-2">
        <div className="grow" />
        <Button onClick={() => setIsDialogOpen(true)}>New</Button>
      </div>
      <div className="my-4">
        {isLoading ? (
          <Spinner />
        ) : (
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
