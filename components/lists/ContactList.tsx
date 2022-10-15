import { PropsWithChildren } from "react";

const ContactList = ({ children }: PropsWithChildren) => {
  return (
    <ul className="min-w-xl max-w-xl divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </ul>
  );
};

export { ContactList };
