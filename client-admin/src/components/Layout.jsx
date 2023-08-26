import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <div className="flex bg-gray-200 h-screen">
        <Sidebar />
        <div className="w-full flex flex-col min-h-screen overflow-y-hidden">
          <Header />
          <div className="w-full overflow-x-hidden h-screen border-t flex flex-col">
            <main className="w-full flex-grow p-6">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
