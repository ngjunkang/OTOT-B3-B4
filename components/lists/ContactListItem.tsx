import { DeleteIconButton, EditIconButton } from "../buttons";

type Contact = {
  name: string;
  email: string;
  phone?: string;
  gender?: string;
};

type Props = {};

type ContactListItemProps = Contact & Props;

const ContactListItem = ({
  name,
  email,
  phone,
  gender,
}: ContactListItemProps) => {
  const PhoneComponent = () => {
    return phone ? (
      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
        {phone}
      </p>
    ) : (
      <></>
    );
  };
  const GenderComponent = () => {
    return gender ? (
      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
        {gender}
      </p>
    ) : (
      <></>
    );
  };
  const NameComponent = () => {
    return (
      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
        {name}
      </p>
    );
  };
  const EmailComponent = () => {
    return (
      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
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
        <DeleteIconButton />
      </div>
    </li>
  );
};

export { ContactListItem };
