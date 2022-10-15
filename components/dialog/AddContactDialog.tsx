import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Label, Modal, Radio, TextInput } from "flowbite-react";
import { useState } from "react";
import { Axios } from "../../services";
import { PrimaryButton } from "../buttons";
import { Contact } from "../types";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  editMode?: boolean;
  contact?: Contact;
};

const AddContactDialog = ({ onClose, isOpen, editMode, contact }: Props) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState(
    editMode && contact?.name ? contact?.name : ""
  );
  const [email, setEmail] = useState(
    editMode && contact?.email ? contact?.email : ""
  );
  const [phone, setPhone] = useState(
    editMode && contact?.phone ? contact?.phone : ""
  );
  const [gender, setGender] = useState<"Male" | "Female" | undefined>(
    editMode && contact?.gender ? contact?.gender : undefined
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addContactMutation = useMutation(
    async ({ email, name, gender, phone }: Contact) => {
      // delete contact
      const res = await Axios.post("/contacts", { email, gender, name, phone });
      return res.data;
    },
    {
      onSuccess: async () => {
        // refetch contacts
        queryClient.invalidateQueries(["contacts"]);
        await queryClient.refetchQueries(["contacts"]);
        setIsSubmitting(false);
      },
    }
  );

  const editContactMutation = useMutation(
    async ({ email, name, gender, phone }: Contact) => {
      // delete contact
      const res = await Axios.put(`/contacts/${contact?.id}`, {
        email,
        gender,
        name,
        phone,
      });
      return res.data;
    },
    {
      onSuccess: async () => {
        // refetch contacts
        queryClient.invalidateQueries(["contacts"]);
        await queryClient.refetchQueries(["contacts"]);
        setIsSubmitting(false);
        onClose();
      },
    }
  );

  const handleRadioChange = (e: any) => {
    if (e.target.value === "Male") {
      setGender(e.target.value);
    } else if (e.target.value === "Female") {
      setGender(e.target.value);
    } else {
      setGender(undefined);
    }
  };

  const handleAddContact = () => {
    if (!name || !email) return;
    setIsSubmitting(true);
    setEmail("");
    setName("");
    setPhone("");
    setGender(undefined);
    addContactMutation.mutate({
      email,
      name,
      gender: gender ? gender : undefined,
      phone: phone ? phone : undefined,
    });
  };

  const handleEditContact = () => {
    if (!name || !email) return;
    setIsSubmitting(true);
    editContactMutation.mutate({
      email,
      name,
      gender: gender ? gender : undefined,
      phone: phone ? phone : undefined,
    });
  };

  return (
    <Modal show={isOpen} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <form>
          <div className="space-y-4 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {editMode ? "Edit Contact" : "Add Contact"}
            </h3>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="name" value="Name*" />
              </div>
              <TextInput
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="email" value="Email*" />
              </div>
              <TextInput
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required={true}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="gender" value="Gender" />
              </div>
              <fieldset className="flex flex-col gap-4" id="gender">
                <div className="flex items-center gap-2">
                  <Radio
                    id="na"
                    name="gender"
                    value="na"
                    checked={!gender}
                    onChange={handleRadioChange}
                  />
                  <Label htmlFor="na">N/A</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="male"
                    name="gender"
                    value="Male"
                    checked={gender == "Male"}
                    onChange={handleRadioChange}
                  />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="female"
                    name="gender"
                    value="Female"
                    checked={gender == "Female"}
                    onChange={handleRadioChange}
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
              </fieldset>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Phone" />
              </div>
              <TextInput
                id="phone"
                placeholder="98765432"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="w-full">
              <PrimaryButton
                isLoading={isSubmitting}
                type="submit"
                onClick={editMode ? handleEditContact : handleAddContact}
              >
                {editMode ? "Edit contact" : "Add contact"}
              </PrimaryButton>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export { AddContactDialog };
