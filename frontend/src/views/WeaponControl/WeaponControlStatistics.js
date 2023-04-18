import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./WeaponControlStatistics.css";
import "../../DocumentPrinting.css";
import { ResponsivePieCanvas } from "@nivo/pie";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { get, createCancelToken } from "../../services/backend.service";
import { useParams } from "react-router-dom";
import countries from "../../utils/countries.json";
import CountryCell from "./CountryCell";
import WCPrint from "./wcPrint/WCPrint";
import useBasicServices from "../../services/basic.service";
import {
  translateSex,
  translateCompType,
} from "../../services/translate.service";

function getLongCountryName(value) {
  return countries["countries"].find((country) => country.short == value).long;
}

const colIssueByC = [
  { field: "country", headerName: "Country", width: 200, flex: 200 },
  { field: "issue_num", headerName: "Number of issues", width: 200, flex: 100 },
];

const setIssueByCRow = (shortName, number) => {
  return {
    id: shortName + number,
    country: getLongCountryName(shortName),
    issue_num: number,
  };
};

const colIssueWithValues = [
  { field: "issue_name", headerName: "Iusse name", width: 200, flex: 200 },
  { field: "freq", headerName: "Frequency", width: 200, flex: 100 },
];

const setIssueWithValuesRow = (issueName, value) => {
  const splittedName = issueName.split(" ");
  let code = "";
  for (let i = 0; i < splittedName.length; i++) {
    code += splittedName[i][0];
  }
  return {
    id: code + value,
    issue_name: issueName,
    freq: value,
  };
};

export default function WeaponControlStatistics() {
  const { compId, tournamentId } = useParams();
  const [statistics, setStatistics] = useState();
  const [issueByC, setIssueByC] = useState([]);
  const [issuesWithSums, setIssuesWithSums] = useState([]);
  const [countryCells, setCountryCells] = useState([]);
  const [listedIssues, setListedIssues] = useState();
  const navigate = useNavigate();
  const { setLoadingState } = useBasicServices();

  async function getData() {
    const data = await get(`stats/${compId}`);
    const byIssues = await get(`stats/byIssues/${compId}`);
    const issueByNat = await get(`stats/byNationByIssues/${compId}`);
    const byNation = await get(`/stats/byNation/${compId}`);
    setStatistics(data);

    const byNations = byNation.map((e) =>
      setIssueByCRow(e.fencer_nation, e.issues)
    );
    setIssueByC(byNations);

    let iessueListText = "";
    const filteredByIssueArray = byIssues.filter((e) => e.issues != 0);
    const byIssueArray = filteredByIssueArray.map((e) =>
      setIssueWithValuesRow(e.issue_human_readable_name, e.issues)
    );
    setIssuesWithSums(byIssueArray);
    iessueListText = iessueListText.slice(0, -2);
    setListedIssues(iessueListText);

    //  const compArray = issueByNat.map((e)=>{
    //  });


    // const compArray =[]
    // Object.keys(issueByNat).forEach(function (key, index) {
    //   const tempArray = [];
    //   Object.keys(issueByNat[key]).forEach(function (natKey, index) {
    //     if (issueByNat[key][natKey] != 0) {
    //       tempArray.push(
    //         setIssueWithValuesRow(natKey, issueByNat[key][natKey])
    //       );
    //     }
    //   });
    //   const props = {
    //     longName: getLongCountryName(key),
    //     fencerNum: data["n_r"][key].fencer_num,
    //     issueNum: data["n_r"][key].issue_num,
    //     ratio: data["n_r"][key].ratio,
    //     col: colIssueWithValues,
    //     row: tempArray,
    //   };
    //   compArray.push(<CountryCell props={props} key={key + index} />);
    // });
    // const sortedCompArray = [...compArray].sort(
    //   (a, b) => b.props.props.issueNum - a.props.props.issueNum
    // );
    // setCountryCells(sortedCompArray);
    // setLoadingState(false)
  }

  function getMost(prop) {
      return statistics["n_r"].reduce(
      (prev, current) => {
        return prev[prop] > current[prop] ? prev : current
      });
  }

  function getLeast(prop) {
    return statistics["n_r"].reduce(
      (prev, current) => {
        return prev[prop] < current[prop] ? prev : current
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* <div className="Main">
        <div className="PageHeader">
          <h1 className="PageTitle">Weapon Control Statistics</h1>
          <div className="PageButtonsWrapper">
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate(-1)}
            >
              GO BACK
            </Button>
          </div>
        </div>
        <div className="ColumnPage">
          <p className="PageSectionTitle">SUMMARY</p>
          <div className="PageSection">
            <div className="StatGrid">
              <div className="StatGridCell1"></div>
              <div className="StatGridCell2">
                <p>GENERAL</p>
              </div>
              <div className="StatGridCell3">
                <p>HIGHS & LOWS</p>
              </div>
              <div className="StatGridCell4">
                <p>ISSUES</p>
              </div>
              <div className="StatGridCell5">
                <div className="StatCard Large">
                  <p className="StatTitle">ISSUE TOTAL</p>
                  <p className="StatData">
                    {statistics ? statistics["total_issues"] : 0}
                  </p>
                </div>
              </div>
              <div className="StatGridCell6">
                <div className="StatGridCellStack">
                  <div className="StatCard Small Red">
                    <div>
                      <p className="StatTitle">MOST COMMON</p>
                    </div>
                    <div className="StatDetails">
                      <div>
                        <p className="StatTopic">
                          {statistics ? statistics["most_issue"]["type"] : 0}
                        </p>
                        <p>
                          {statistics ? statistics["most_issue"]["value"] : 0}s
                          i.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="StatCard Small Green">
                    <div>
                      <p className="StatTitle">LEAST COMMON</p>
                    </div>
                    <div className="StatDetails">
                      <div>
                        <p className="StatTopic">
                          {statistics ? statistics["least_issue"]["type"] : 0}
                        </p>
                        <p>
                          {statistics ? statistics["least_issue"]["value"] : 0}
                          i.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="StatGridCell7"></div>
              <div className="StatGridCell8">
                <p>FENCERS</p>
              </div>
              <div className="StatGridCell9">
                <div className="StatCard Large">
                  <p className="StatTitle">FENCER TOTAL</p>
                  <p className="StatData">
                    {statistics ? statistics["total_fencers"] : 0}
                  </p>
                </div>
              </div>
              <div className="StatGridCell10">
                <div className="StatCard Large Extra">
                  <p className="StatTitle">AVARAGE RATIO</p>
                  <p className="StatData">
                    {statistics ? statistics["total_ratio"] : 0}
                  </p>
                </div>
              </div>
              <div className="StatGridCell11"></div>
              <div className="StatGridCell12">
                <p>COUNTRY</p>
              </div>
              <div className="StatGridCell13">
                <div className="StatCard Large">
                  <p className="StatTitle">COUNTRY TOTAL</p>
                  <p className="StatData">
                    {statistics ? statistics["total_nation"] : 0}
                  </p>
                </div>
              </div>
              <div className="StatGridCell14">
                <div className="StatGridCellStack">
                  <div className="StatCard Small Red">
                    <div>
                      <p className="StatTitle">MOST ISSUES</p>
                    </div>
                    <div className="StatDetails">
                      <div>
                        <p className="StatTopic">
                          {statistics
                            ? getLongCountryName(getMost("issue_num"))
                            : ""}
                        </p>
                        <div>
                          <p>
                            {statistics
                              ? statistics["n_r"][getMost("issue_num")]
                                .fencer_num
                              : 0}
                            f.
                          </p>
                          <b>
                            {statistics
                              ? statistics["n_r"][getMost("issue_num")]
                                .issue_num
                              : 0}
                            i.
                          </b>
                          <p>
                            {statistics
                              ? statistics["n_r"][getMost("issue_num")].ratio
                              : 0}
                            r
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="StatCard Small Green">
                    <div>
                      <p className="StatTitle">LEAST ISSUES</p>
                    </div>
                    <div className="StatDetails">
                      <div>
                        <p className="StatTopic">
                          {statistics
                            ? getLongCountryName(getLeast("issue_num"))
                            : ""}
                        </p>
                        <div>
                          <p>
                            {statistics
                              ? statistics["n_r"][getLeast("issue_num")]
                                .fencer_num
                              : 0}
                            f.
                          </p>
                          <b>
                            {statistics
                              ? statistics["n_r"][getLeast("issue_num")]
                                .issue_num
                              : 0}
                            i.
                          </b>
                          <p>
                            {statistics
                              ? statistics["n_r"][getLeast("issue_num")].ratio
                              : 0}
                            .1r
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="StatGridCell15">
                <div className="StatGridCellStack">
                  <div className="StatCard Small Red">
                    <div>
                      <p className="StatTitle">WORST RATIO</p>
                    </div>
                    <div className="StatDetails">
                      <div>
                        <p className="StatTopic">
                          {statistics
                            ? getLongCountryName(getMost("ratio"))
                            : ""}
                        </p>
                        <div>
                          <p>
                            {statistics
                              ? statistics["n_r"][getMost("ratio")].fencer_num
                              : 0}
                            f.
                          </p>
                          <p>
                            {statistics
                              ? statistics["n_r"][getMost("ratio")].issue_num
                              : 0}
                            i.
                          </p>
                          <b>
                            {statistics
                              ? statistics["n_r"][getMost("ratio")].ratio
                              : 0}
                            r
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="StatCard Small Green">
                    <div>
                      <p className="StatTitle">BEST RATIO</p>
                    </div>
                    <div className="StatDetails">
                      <div>
                        <p className="StatTopic">
                          {statistics
                            ? getLongCountryName(getLeast("ratio"))
                            : ""}
                        </p>
                        <div>
                          <p>
                            {statistics
                              ? statistics["n_r"][getLeast("ratio")].fencer_num
                              : 0}
                            f.
                          </p>
                          <p>
                            {statistics
                              ? statistics["n_r"][getLeast("ratio")].issue_num
                              : 0}
                            i.
                          </p>
                          <b>
                            {statistics
                              ? statistics["n_r"][getLeast("ratio")].ratio
                              : 0}
                            r
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="PageSectionTitle">NUMBER OF ISSUES BY COUNTRY</p>
          <div className="PageSection">
            <DataGrid
              className="StatsDataGrid"
              disableRowSelectionOnClick
              rows={issueByC}
              rowHeight={25}
              columns={colIssueByC}
              initialState={{
                sorting: {
                  sortModel: [{ field: "issue_num", sort: "desc" }],
                },
              }}
            />
          </div>
          <p className="PageSectionTitle">ISSUE TYPES BY FREQUENCY</p>
          <div className="PageSection">
            <DataGrid
              className="StatsDataGrid"
              disableRowSelectionOnClick
              rows={issuesWithSums}
              rowHeight={25}
              columns={colIssueWithValues}
              initialState={{
                sorting: {
                  sortModel: [{ field: "freq", sort: "desc" }],
                },
              }}
            />
          </div>
          <p className="PageSectionTitle">NUMBER OF ISSUE TYPES BY COUNTRY</p>
          <div className="PageSection">
            <div className="CountryGrid">{countryCells}</div>
          </div>
        </div>
      </div> */}
      <WCPrint/>
    </>
  );
}
