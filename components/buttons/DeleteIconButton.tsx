import { DeleteIcon } from "../icons";

const DeleteIconButton = () => {
  return (
    <button
      type="button"
      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
    >
      <DeleteIcon />
      <span className="sr-only">Delete contact</span>
    </button>
  );
};

export { DeleteIconButton };
