import { Table } from "./Table/Table";
import { Search } from "./Search/Search";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import style from "./Dashboard.module.css";

export const Dashboard = () => {
  const [apiDashboardEmail, setApiDashBoardEmail] = useState<null | SiteApi[]>(
    null
  );
  const [apiTest, setApiTest] = useState<null | Test[]>(null);
  const [fullData, setFullData] = useState<null | Test[]>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<null | Test[]>([]);
  const [isFindText, setIsFindText] = useState<null | boolean>(null);

  const resetHandler = () => {
    setSearchValue("");
  };

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3100/sites").then((api) => {
      setApiDashBoardEmail(
        api.data.map((e: SiteApi) => {
          const { url, ...rest } = e;
          const newUrl = url.replace(/^https?:\/\/(www\.)?/, "");
          return { ...rest, url: newUrl };
        })
      );
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3100/tests").then((api) => {
      setApiTest(api.data);
    });
  }, []);
  useEffect(() => {
    apiTest !== null &&
      apiDashboardEmail !== null &&
      setFullData(
        apiTest.map((e) => {
          if (e.siteId === apiDashboardEmail[0].id) {
            return { ...e, url: apiDashboardEmail[0].url };
          } else if (e.siteId === apiDashboardEmail[1].id) {
            return { ...e, url: apiDashboardEmail[1].url };
          } else {
            return { ...e, url: apiDashboardEmail[2].url };
          }
        })
      );
  }, [apiTest, apiDashboardEmail]);

  useEffect(() => {
    if (searchValue === "") {
      setFilteredData(fullData);
      setIsFindText(null);
    } else {
      const filtered = fullData?.filter((obj) =>
        obj.name.includes(searchValue)
      );
      if (filtered?.length === 0) {
        setIsFindText(false);
      } else {
        filtered && setFilteredData(filtered);
        setIsFindText(true);
      }
    }
  }, [fullData, searchValue]);

  return (
    <div className={style.root}>
      <Search
        countTests={fullData?.length}
        handleSearch={searchChange}
        searchValue={searchValue}
      />
      {(isFindText === null || isFindText) && (
        <Table filteredData={filteredData} setFilteredData={setFilteredData} />
      )}
      {isFindText === false && (
        <div className={style.notFoundWrapper}>
          <div className={style.description}>
            Your search did not match any results.
          </div>
          <div>
            <button className={style.resetBtn} onClick={resetHandler}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

//types

export interface SiteApi {
  id: number;
  url: string;
}
export interface Test {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: number;
  url?: string;
}
enum Status {
  DRAFT = "DRAFT",
  ONLINE = "ONLINE",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}
enum Type {
  CLASSIC = "CLASSIC",
  SERVER_SIDE = "SERVER_SIDE",
  MVT = "MVT",
}
