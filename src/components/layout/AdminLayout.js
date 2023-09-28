import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AdminLayout({ children, title }) {
  return (
    <div>
      <div className="admin-layout d-flex">
        <div className="left w-25 bg-dark text-light">
          <Sidebar />
        </div>
        <div className="right w-75">
          <Header />
          <h2 className="px-3 pt-3">{title}</h2>
          <hr />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
