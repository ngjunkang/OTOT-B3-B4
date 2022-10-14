import { PropsWithChildren } from "react";

const ContactList = ({ children }: PropsWithChildren) => {
  return (
    <ul className="flex flex-col min-w-md max-w-md divide-y divide-gray-200 dark:divide-gray-700 overflow-auto">
      {children}
    </ul>
  );
};

export { ContactList };
