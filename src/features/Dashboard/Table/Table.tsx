import * as React from "react";
import style from "./Table.module.css";
import { Test } from "..";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  fullData: null | Test[];
  setFullData: (fullData: null | Test[]) => void;
};

export const Table: FC<Props> = ({ fullData, setFullData }) => {
  const onSortHandler = (key: "name" | "site") => {
    if (key === "name") {
      const newData = fullData!.sort((a, b) => {
        return b.name < a.name ? 1 : b.name > a.name ? -1 : 0;
      });
      setFullData([...newData]);
    } else if (key === "site") {
      alert(1);
      const newData = fullData!.sort((a, b) => {
        return b.url && a.url && b.url < a.url
          ? 1
          : b.url && a.url && b.url > a.url
          ? -1
          : 0;
      });
      setFullData([...newData]);
    }
  };

  return (
    <div className={style.root}>
      <div className={style.header}>
        <div className={style.name} onClick={() => onSortHandler("name")}>
          Name
        </div>
        <div className={style.type}>Type</div>
        <div className={style.status}>Status</div>
        <div className={style.site} onClick={() => onSortHandler("site")}>
          Site
        </div>
      </div>
      {fullData?.map((e, i) => (
        <div key={i} className={style.dashboardItem}>
          <div className={style.name}>{e.name}</div>
          <div className={style.type}>{e.type}</div>
          <div className={style.status}>{e.status}</div>
          <div className={style.site}>{e.url}</div>
          <div className={style.btn}>
            <Link
              to={e.status === "DRAFT" ? `finalize/${e.id}` : `results/${e.id}`}
            >
              {e.status === "DRAFT" ? "Finalize" : "Results"}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
