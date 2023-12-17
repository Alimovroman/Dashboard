import * as React from "react";
import style from "./Search.module.css";
import searchImg from "../../../assets/search/Search.svg";
import { ChangeEvent, FC } from "react";

type Props = {
  countTests: number | undefined;
  searchValue: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Search: FC<Props> = ({
  searchValue,
  countTests,
  handleSearch,
}) => {
  return (
    <div className={style.root}>
      <img src={searchImg} alt="" className={style.searchImg} />
      <input
        value={searchValue}
        className={style.input}
        onChange={handleSearch}
        placeholder="What test are you looking for?"
      />
      <span className={style.count}>{countTests} tests</span>
    </div>
  );
};
