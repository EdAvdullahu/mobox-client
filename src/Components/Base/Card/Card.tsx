import classes from "./Card.module.css";
import React, { ReactNode } from "react";

interface CardProp {
  children?: ReactNode;
}

const Card: React.FC<CardProp> = (props: CardProp) => {
  return <div className={classes.card}>{props.children}</div>;
};
export default Card;
