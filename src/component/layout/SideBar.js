import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  const sideLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Categories",
      path: "/category",
    },
    {
      label: "Product",
      path: "/product",
    },
    {
      label: "Customer",
      path: "/customer",
    },
    {
      label: "Payment Option",
      path: "/payment-option",
    },
    {
      label: "Orders",
      path: "/orders",
    },
    {
      label: "Reviews",
      path: "/review",
    },
   
  ];
  return (
    <div>
      <nav>
        <div className="mt-4 text-center">Admin Account</div>
        <hr />
        <div>
          <ul className="list-unstyled">
            {sideLinks.map(({ label, path }) => (
              <li className="p-2 ms-2 ">
                <Link className="nav-link" to={path}>{label}</Link>
              </li>
            ))}
            <hr/>
              <li className="p-2 ms-2 ">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="p-2 ms-2 ">
                <Link className="nav-link" to="/register">Admin Register</Link>
              </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
