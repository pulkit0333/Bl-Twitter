type Props = {
  text: string;
  action: () => void;
};

const ButtonPrimary = ({ text, action }: Props) => {
  return (
    <button
      onClick={action}
      className="rounded w-full px-5 py-2.5 overflow-hidden group bg-orange_(web)-500 relative hover:bg-gradient-to-r hover:from-orange_(web)-500 hover:to-orange_(web)-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange_(web)-400 transition-all ease-out duration-300"
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative">{text}</span>
    </button>
  );
};

export default ButtonPrimary;
