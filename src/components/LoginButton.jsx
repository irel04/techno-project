import { MdAccountCircle } from "react-icons/md";
function LoginButton() {
  return (
    <button className="bg-secondary py-1 px-5 text-text-color font-semibold rounded flex items-center gap-2">
      Account
      <MdAccountCircle className="text-primary text-xl" />
    </button>
  );
}

export default LoginButton;
