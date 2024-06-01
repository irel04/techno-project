import { Outlet } from "react-router-dom";
import OwnerHeader from "../components/OwnerHeader";

function BusinessLayout() {
  return (
    <main className="overflow-x-hidden w-screen h-screen">
      <OwnerHeader />
      <div className="mx-5 my-3">
        <Outlet />
      </div>
    </main>
  );
}

export default BusinessLayout;
