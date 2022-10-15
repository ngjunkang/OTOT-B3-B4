import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Axios } from "../../services";
import { DeleteIconButton, EditIconButton } from "../buttons";
import { Contact } from "../types";

type Props = {};

type ContactListItemProps = Contact & Props;

const ContactListItem = ({
  name,
  email,
  phone,
  gender,
  id,
}: ContactListItemProps) => {
  console.log(phone);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const deleteContactMutation = useMutation(
    () => {
      // delete contact
      return Axios.delete(`/contacts/${id}`);
    },
    {
      onSuccess: async () => {
        // refetch contacts
        queryClient.invalidateQueries(["contacts"]);
        await queryClient.refetchQueries(["contacts"]);
        setIsDeleting(false);
      },
    }
  );
  const handleDeleteContact = () => {
    setIsDeleting(true);
    deleteContactMutation.mutate();
  };

  const PhoneComponent = () => {
    return phone ? (
      <p className="text-sm text-white-500 truncate dark:text-white-400">
        {phone}
      </p>
    ) : (
      <></>
    );
  };
  const GenderComponent = () => {
    return gender ? (
      <p className="text-sm text-white-500 truncate dark:text-white-400">
        {gender}
      </p>
    ) : (
      <></>
    );
  };
  const NameComponent = () => {
    return (
      <p className="text-sm font-medium text-white-900 truncate dark:text-white">
        {name}
      </p>
    );
  };
  const EmailComponent = () => {
    return (
      <p className="text-sm text-white-500 truncate dark:text-white-400">
        {email}
      </p>
    );
  };
  return (
    <li className="py-3 sm:py-4 mx-3">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0 space-y-2">
          <NameComponent />
          <div>
            <EmailComponent />
            <PhoneComponent />
            <GenderComponent />
          </div>
        </div>
        <EditIconButton />
        <DeleteIconButton
          onClick={handleDeleteContact}
          isLoading={isDeleting}
        />
      </div>
    </li>
  );
};

export { ContactListItem };
