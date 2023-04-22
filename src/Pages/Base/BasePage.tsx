import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Base/Header/Header";
import BaseBackground from "../../Components/Base/BaseBackground";
import classes from "./BasePage.module.css";

interface BasePageProps {
  children?: ReactNode;
}

const BasePage: React.FC<BasePageProps> = (props: BasePageProps) => {
  return (
    <div className={classes.main}>
      <div className={classes.content}>
        <BaseBackground />
        <Header />
        <Outlet />
      </div>
      <div className={classes.section}></div>
    </div>
  );
};

export default BasePage;
