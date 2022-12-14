import { Spinner } from "flowbite-react";

import { DeleteIcon } from "../icons";
import { BaseProps } from "./types";

const DeleteIconButton = ({ isLoading, ...others }: BaseProps) => {
  return (
    <button
      type="button"
      className="text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
      {...others}
    >
      {isLoading ? <Spinner /> : <DeleteIcon />}
      <span className="sr-only">Delete contact</span>
    </button>
  );
};

export { DeleteIconButton };
