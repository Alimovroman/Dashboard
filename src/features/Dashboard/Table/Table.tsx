import * as React from "react";
import style from "./Table.module.css";
import { Test } from "..";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  filteredData: null | Test[];
  setFilteredData: (fullData: null | Test[]) => void;
};

export const Table: FC<Props> = ({ filteredData, setFilteredData }) => {
  const [statusSort, setStatusSort] = useState<boolean>(true);

  const statusSortHandler = () => {
    if (statusSort) {
      onSortHandler("statusUp");
      setStatusSort(!statusSort);
    } else {
      onSortHandler("statusDown");
      setStatusSort(!statusSort);
    }
  };

  const onSortHandler = (key: "name" | "site" | "statusUp" | "statusDown") => {
    if (key === "name") {
      const newData = filteredData!.sort((a, b) => {
        return b.name < a.name ? 1 : b.name > a.name ? -1 : 0;
      });
      setFilteredData([...newData]);
    } else if (key === "site") {
      const newData = filteredData!.sort((a, b) => {
        return b.url && a.url && b.url < a.url
          ? 1
          : b.url && a.url && b.url > a.url
          ? -1
          : 0;
      });
      setFilteredData([...newData]);
    } else if (key === "statusUp") {
      const sortedData = filteredData!.sort((a, b) => {
        const statusPriority = {
          ONLINE: 1,
          PAUSED: 2,
          STOPPED: 3,
          DRAFT: 4,
        };
        return statusPriority[a.status] - statusPriority[b.status];
      });
      setFilteredData([...sortedData]);
    } else if (key === "statusDown") {
      const sortedData = filteredData!.sort((a, b) => {
        const statusPriority = {
          ONLINE: 1,
          PAUSED: 2,
          STOPPED: 3,
          DRAFT: 4,
        };
        return statusPriority[b.status] - statusPriority[a.status];
      });
      setFilteredData([...sortedData]);
    }
  };

  return (
    <div className={style.root}>
      <div className={style.header}>
        <div className={style.name} onClick={() => onSortHandler("name")}>
          Name
        </div>
        <div className={style.type}>Type</div>
        <div className={style.status} onClick={statusSortHandler}>
          Status
        </div>
        <div className={style.site} onClick={() => onSortHandler("site")}>
          Site
        </div>
      </div>
      {filteredData?.map((e, i) => (
        <div key={i} className={style.dashboardItem}>
          <div
            className={
              e.url === "delivery.company.com"
                ? style.redContainer
                : e.url === "delivery.company.com"
                ? style.purpleContainer
                : style.blueContainer
            }
          />
          <div className={style.name}>{e.name}</div>
          <div className={style.type}>{e.type}</div>
          <div
            className={
              e.status === "ONLINE"
                ? style.onlineStatus
                : e.status === "PAUSED"
                ? style.pausedStatus
                : e.status === "STOPPED"
                ? style.stoppedStatus
                : style.draftStatus
            }
          >
            {e.status}
          </div>
          <div className={style.site}>{e.url}</div>
          <div
            className={e.status === "DRAFT" ? style.draftBtn : style.resultsBtn}
          >
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
