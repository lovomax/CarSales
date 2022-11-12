import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Login from "pages/Login";
import Cars from "pages/Showcase";
import CarDetails from "pages/CarDetails";
import CarSell from "pages/CarSell";

function Router() {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  useEffect(() => {
    const renderTitle = {
      "": "Login / PinPoint",
      cars: "Cars / PinPoint",
      car: "Details / PinPoint",
      "car-sell": "Sell / PinPoint",
    };

    document.title = renderTitle[path];
  }, [path]);
  return (
    <Routes>
      {localStorage.getItem("data") ? (
        <Route path="/car-sell" element={<CarSell />} />
      ) : (
        <>
          <Route path="/car-sell" element={<Navigate to="/" />} />
          <Route path="/" element={<Login />} />
        </>
      )}

      <Route path="/cars" element={<Cars />} />
      <Route path="/car/:id" element={<CarDetails />} />
    </Routes>
  );
}

export default Router;
