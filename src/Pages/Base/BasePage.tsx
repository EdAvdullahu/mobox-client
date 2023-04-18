import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Base/Header/Header";
import router from "../../Router/router";
import BaseBackground from "../../Components/Base/BaseBackground";

interface BasePageProps {
  children?: ReactNode;
}

const BasePage: React.FC<BasePageProps> = (props: BasePageProps) => {
  return (
    <div>
      <BaseBackground />
      <Header />
      <Outlet />
    </div>
  );
};

export default BasePage;
