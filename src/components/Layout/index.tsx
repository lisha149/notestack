import { useEffect, useState, type PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const isSidebarDefaultOpen = () => {
  return window.innerWidth >= 768; //Tablet and larger
};

export default function Layout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(isSidebarDefaultOpen());

  const handleResize = () => {
    setSidebarOpen(isSidebarDefaultOpen());
  };

  // on "resizing" the browser re-calculate if sidebar needs to be collapsed or expanded
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={sidebarOpen} handleClick={handleResize} />

      {/* Main content with navbar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar setIsSidebarOpen={setSidebarOpen} isSidebarOpen={sidebarOpen} />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
