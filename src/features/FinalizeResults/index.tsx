import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SiteApi, Test } from "../Dashboard";
import axios from "axios";
import style from "./FinalizeResults.module.css";
import backImg from "../../assets/button/back.svg";

export const FinalizeResults = () => {
  const { id } = useParams();
  const [apiDashboardEmail, setApiDashBoardEmail] = useState<null | SiteApi[]>(
    null
  );
  const [apiTest, setApiTest] = useState<null | Test[]>(null);
  const [fullData, setFullData] = useState<null | Test[]>(null);
  const [contentData, setContentData] = useState<null | Test[]>(null);
  const navigate = useNavigate();

  const backPaigeHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    axios.get("http://localhost:3100/sites").then((api) => {
      setApiDashBoardEmail(api.data);
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
    fullData && id && setContentData(fullData.filter((e) => e.id === +id));
  }, [fullData]);

  return (
    <div className={style.root}>
      <div>
        <h2>{contentData?.[0].status === "DRAFT" ? "Finalize" : "Results"}</h2>
        <div>Name: {contentData?.[0].name}</div>
        <div>Status: {contentData?.[0].status}</div>
        <div>Type: {contentData?.[0].type}</div>
        <div>Url: {contentData?.[0].url}</div>
      </div>
      <div>
        <button onClick={backPaigeHandler} className={style.btn}>
          <img src={backImg} alt="" />
          Back
        </button>
      </div>
    </div>
  );
};
