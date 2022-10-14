import type { NextPage } from "next";
import { ContactList, ContactListItem } from "../components/lists";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex grow-0">
        <h1 className="text-4xl font-bold my-6">Contacts</h1>
      </div>
      <div className="flex overflow-auto my-4">
        <ContactList>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          ].map((_, index) => {
            return (
              <ContactListItem
                key={index}
                name="Ng Jun Kang"
                email="email.com"
              />
            );
          })}
        </ContactList>
      </div>
    </div>
  );
};

export default Home;
