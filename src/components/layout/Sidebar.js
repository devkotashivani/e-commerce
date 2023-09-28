import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const sideLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Category",
      path: "/category",
    },
    {
      label: "Product",
      path: "/product",
    },
    {
      label: "Payment Opt",
      path: "/payment-options",
    },
    {
      label: "Orders",
      path: "/orders",
    },
    {
      label: "Customers",
      path: "/customers",
    },
    {
      label: "Reviews",
      path: "/reviews",
    },
  ];
  return (
    <div>
      <nav>
        <div className="mt-4 text-center">Admin Account</div>
        <hr />
        <div className="">
          <ul className="list-unstyled">
            {sideLinks.map(({ label, path }, i) => (
              <li className="ms-2 p-2" key={i}>
                <Link className="nav-link" to={path}>
                  {label}
                </Link>
              </li>
            ))}
            <hr />
            <li className="ms-2 p-2">
              <Link className="nav-link" to={"/profile"}>
                Profile
              </Link>
            </li>
            <li className="ms-2 p-2">
              <Link className="nav-link" to={"/register"}>
                Admin Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
