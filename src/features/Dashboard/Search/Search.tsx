import * as React from "react";
import style from "./Search.module.css";
import searchImg from "../../../assets/search/Search.svg";
import { FC } from "react";

type Props = {
  countTests: number | undefined;
};

export const Search: FC<Props> = ({ countTests }) => {
  return (
    <div className={style.root}>
      <img src={searchImg} alt="" className={style.searchImg} />
      <input
        className={style.input}
        placeholder="What test are you looking for?"
      />
      <span className={style.count}>{countTests} tests</span>
    </div>
  );
};
