import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <main className="overflow-x-hidden w-screen h-screen">
      <Header />
      <div className="mx-[5%] my-[3%]">
        <Outlet />
      </div>

      <Footer />
    </main>
  );
}

export default AppLayout;
