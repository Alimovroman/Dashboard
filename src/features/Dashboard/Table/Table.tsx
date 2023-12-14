import * as React from "react";
import style from "./Table.module.css";
import { Test } from "..";
import { FC } from "react";

type Props = {
  fullData: null | Test[];
};

export const Table: FC<Props> = ({ fullData }) => {
  return (
    <div className={style.root}>
      <div className={style.header}>
        <div className={style.name}>Name</div>
        <div className={style.type}>Type</div>
        <div className={style.status}>Status</div>
        <div className={style.site}>Site</div>
      </div>
      {fullData?.map((e, i) => (
        <div key={i} className={style.dashboardItem}>
          <div className={style.name}>{e.name}</div>
          <div className={style.type}>{e.type}</div>
          <div className={style.status}>{e.status}</div>
          <div className={style.site}>{e.url}</div>
          <div className={style.btn}>
            <button>{e.status === "DRAFT" ? "Finalize" : "Results"}</button>
          </div>
        </div>
      ))}
    </div>
  );
};
