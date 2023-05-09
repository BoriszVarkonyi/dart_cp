//react + dep
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//services
import { get, createCancelToken } from "../../../services/backend.service";
import useBasicServices from "../../../services/basic.service";
import {
  translateSex,
  translateCompType,
} from "../../../services/translate.service";
//mui
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
//utils + modules
import countries from "../../../utils/countries.json";
import CountryCell from "./WCSCountryCell";
import WCSDocument from "./WCSDocument";
import PrintCell from "./WCSDCell";
import Loading from "../../../components/static/Loading/Loading";
//styles
import "./WeaponControlStatistics.css";
import "../../../styles/DocumentPrinting.css";

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

const printCountySummaryCol = [
  { field: "country", headerName: "Country", width: 200, flex: 200 },
  { field: "fencer_num", headerName: "NO.FENCER", width: 200, flex: 100 },
  { field: "issue_num", headerName: "NO.ISSUE", width: 200, flex: 100 },
  { field: "ratio", headerName: "RATIO", width: 200, flex: 100 },
];

const setPrintCountySummary = (element) => {
  return {
    id: element.nation,
    country: element.nation,
    fencer_num: element.fencer_num,
    issue_num: element.issue_num,
    ratio: element.ratio,
  };
};

const setChartData = (countyName, value) => {
  return {
    id: getLongCountryName(countyName),
    value: value,
  };
};

export default function WeaponControlStatistics() {
  const { compId, tournamentId } = useParams();
  const [statistics, setStatistics] = useState();
  const [issueByC, setIssueByC] = useState([]);
  const [issuesWithSums, setIssuesWithSums] = useState([]);
  const [countryCells, setCountryCells] = useState([]);
  const [printCells, setprintCells] = useState([]);
  const [printCSummaryRows, setPrintCSummaryRows] = useState([]);
  const [listedIssues, setListedIssues] = useState();
  const [currentComp, setCurrentComp] = useState();
  const [currentTour, setCurrentTour] = useState();
  const [noFencerChart, setNofencerChart] = useState();
  const [noIssuesChart, setNoIssuesChart] = useState();
  const [ratiosChart, setRatiosChart] = useState();
  const navigate = useNavigate();
  const { setLoadingState } = useBasicServices();

  async function getData() {
    const data = await get(`stats/${compId}`);
    const byIssues = await get(`stats/byIssues/${compId}`);
    const issueByNat = await get(`stats/byNationByIssues/${compId}`);
    const byNation = await get(`/stats/byNation/${compId}`);
    const comp = await get(`competitions/${compId}`);
    const tour = await get(`tournaments/${tournamentId}`);

    setCurrentComp(comp);
    setCurrentTour(tour);
    setStatistics(data);

    const byNations = byNation.map((e) =>
      setIssueByCRow(e.fencer_nation, e.issues)
    );
    setIssueByC(byNations);

    let iessueListText = "";
    for (let i = 0; i < byIssues.length; i++) {
      iessueListText += byIssues[i].issue_human_readable_name + ", ";
    }
    iessueListText = iessueListText.slice(0, -2);
    setListedIssues(iessueListText);

    const filteredByIssueArray = byIssues.filter((e) => e.issues != 0);

    const byIssueArray = filteredByIssueArray.map((e) => {
      return setIssueWithValuesRow(e.issue_human_readable_name, e.issues);
    });
    setIssuesWithSums(byIssueArray);

    let printArrayProps = [];

    const compArray = issueByNat.map((e) => {
      const filteredIssues = e.issues.filter((i) => i.value != 0);
      const issues = filteredIssues.map((i) =>
        setIssueWithValuesRow(i.issue_human_readable_name, i.value)
      );

      const index = data["n_r"].findIndex((c) => c.nation == e.fencer_nation);

      const props = {
        longName: getLongCountryName(e.fencer_nation),
        fencerNum: data["n_r"][index].fencer_num,
        issueNum: data["n_r"][index].issue_num,
        ratio: data["n_r"][index].ratio,
        col: colIssueWithValues,
        row: issues,
      };

      printArrayProps.push({ printProps: props, key: e.fencer_nation });
      return <CountryCell props={props} key={e.fencer_nation} />;
    });

    const sortedPrintArray = printArrayProps.sort((a, b) => {
      return b.printProps.issueNum - a.printProps.issueNum;
    });

    setprintCells(sortedPrintArray);

    const sortedCompArray = compArray.sort((a, b) => {
      return b.props.props.issueNum - a.props.props.issueNum;
    });

    setCountryCells(sortedCompArray);

    let nOFencerChartData = [];
    let nOIssuesChartData = [];
    let ratiosChartData = [];
    if (data != "Not a valid competition or no weapon control record added") {
      const printCountrySum = data["n_r"].map((e) => {
        nOFencerChartData.push(setChartData(e.nation, e.fencer_num));
        nOIssuesChartData.push(setChartData(e.nation, e.issue_num));
        ratiosChartData.push(setChartData(e.nation, e.ratio));
        return setPrintCountySummary(e);
      });
      setPrintCSummaryRows(printCountrySum);
    }
    setNofencerChart(nOFencerChartData);
    setNoIssuesChart(nOIssuesChartData);
    setRatiosChart(ratiosChartData);
  }

  function getMost(prop) {
    return statistics["n_r"].indexOf(
      statistics["n_r"].reduce((prev, current) => {
        return prev[prop] > current[prop] ? prev : current;
      })
    );
  }

  function getLeast(prop) {
    return statistics["n_r"].indexOf(
      statistics["n_r"].reduce((prev, current) => {
        return prev[prop] < current[prop] ? prev : current;
      })
    );
  }

  const printHeaderProps = {
    compTitle: currentComp ? currentComp.title_long : "",
    tourTitle: currentTour ? currentTour.title_long : "",
    sex: currentComp ? translateSex(currentComp.sex) : "",
    compType: currentComp ? translateCompType(currentComp.type) : "",
    ageGroup: currentComp ? currentComp.age_group : "",
    hostCountry: currentComp
      ? getLongCountryName(currentComp.host_country)
      : "",
    year: currentComp ? currentComp.start_date.substring(0, 4) : "",
  };

  const printProps = {
    stats: statistics,
    allIssues: listedIssues,
    printCells: printCells.map((e) => (
      <PrintCell
        props={e.printProps}
        key={e.key}
        printHeader={printHeaderProps}
      />
    )),
    issueWithSumsTable: { row: issuesWithSums, col: colIssueWithValues },
    countySummaryTable: { row: printCSummaryRows, col: printCountySummaryCol },
    noFencerChart: noFencerChart,
    noIssuesChart: noIssuesChart,
    ratiosChart: ratiosChart,
    getMostFunc: getMost,
    getLeastFunc: getLeast,
    getLongCName: getLongCountryName,
  };

  useEffect(() => {
    setLoadingState(true);
    getData();
  }, []);

  return (
    <>
      {statistics == undefined ? <Loading/> :    statistics ==
        "Not a valid competition or no weapon control record added" ? (
        <main>
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
          <div>
            <p>There is no weapon control statistic yet...</p>
          </div>
        </main>
      ) : (
        <>
          <main>
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
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => window.print()}
                >
                  PRINT Statistics
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
                              {statistics
                                ? statistics["most_issue"]["type"]
                                : 0}
                            </p>
                            <p>
                              {statistics
                                ? statistics["most_issue"]["value"]
                                : 0}
                              s i.
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
                              {statistics
                                ? statistics["least_issue"]["type"]
                                : 0}
                            </p>
                            <p>
                              {statistics
                                ? statistics["least_issue"]["value"]
                                : 0}
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
                                ? getLongCountryName(
                                    statistics["n_r"][getMost("issue_num")]
                                      .nation
                                  )
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
                                  ? statistics["n_r"][getMost("issue_num")]
                                      .ratio
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
                                ? getLongCountryName(
                                    statistics["n_r"][getLeast("issue_num")]
                                      .nation
                                  )
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
                                  ? statistics["n_r"][getLeast("issue_num")]
                                      .ratio
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
                                ? getLongCountryName(
                                    statistics["n_r"][getMost("ratio")].nation
                                  )
                                : ""}
                            </p>
                            <div>
                              <p>
                                {statistics
                                  ? statistics["n_r"][getMost("ratio")]
                                      .fencer_num
                                  : 0}
                                f.
                              </p>
                              <p>
                                {statistics
                                  ? statistics["n_r"][getMost("ratio")]
                                      .issue_num
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
                                ? getLongCountryName(
                                    statistics["n_r"][getLeast("ratio")].nation
                                  )
                                : ""}
                            </p>
                            <div>
                              <p>
                                {statistics
                                  ? statistics["n_r"][getLeast("ratio")]
                                      .fencer_num
                                  : 0}
                                f.
                              </p>
                              <p>
                                {statistics
                                  ? statistics["n_r"][getLeast("ratio")]
                                      .issue_num
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
              <p className="PageSectionTitle">
                NUMBER OF ISSUE TYPES BY COUNTRY
              </p>
              <div className="PageSection">
                <div className="CountryGrid">{countryCells}</div>
              </div>
            </div>
          </main>
          <WCSDocument pageProps={printProps} headerProps={printHeaderProps} />
        </>
      )}
    
    </>
  );
}
