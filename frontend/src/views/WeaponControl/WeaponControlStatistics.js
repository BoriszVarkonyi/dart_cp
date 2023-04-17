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
  const [statistics, setStatistics] = useState();
  const [issueByC, setIssueByC] = useState([]);
  const [issuesWithSums, setIssuesWithSums] = useState([]);
  const [countryCells, setCountryCells] = useState([]);
  const [currentComp, setCurrentComp] = useState();
  const [currentTour, setCurrentTour] = useState()
  const [listedIssues, setListedIssues] = useState()
  const navigate = useNavigate();
  const { compId, tournamentId } = useParams();
  const { setLoadingState } = useBasicServices();

  async function getData() {
    const data = await get(`stats/${compId}`);
    const byIssues = await get(`stats/byIssues/${compId}`);
    const issueByNat = await get(`stats/byNationByIssues/${compId}`);
    const byNation = await get(`/stats/byNation/${compId}`);
    const comp = await get(`competitions/${compId}`);
    const tour = await get(`tournaments/${tournamentId}`)
    let tempArray = [];
    setCurrentComp(comp);
    setCurrentTour(tour)
    setStatistics(data);

    tempArray = [];
    Object.keys(byNation).forEach(function (key, index) {
      tempArray.push(setIssueByCRow(key, byNation[key]));
    });
    setIssueByC(tempArray);

    let iessueListText = ""
    tempArray = [];
    Object.keys(byIssues).forEach(function (key, index) {
      if (byIssues[key] != 0) {
        iessueListText += key + ", "
        tempArray.push(setIssueWithValuesRow(key, byIssues[key]));
      }
    });
    iessueListText = iessueListText.slice(0, -2)
    setListedIssues(iessueListText)
    setIssuesWithSums(tempArray);

    const compArray = [];
    Object.keys(issueByNat).forEach(function (key, index) {
      const tempArray = [];
      Object.keys(issueByNat[key]).forEach(function (natKey, index) {
        if (issueByNat[key][natKey] != 0) {
          tempArray.push(
            setIssueWithValuesRow(natKey, issueByNat[key][natKey])
          );
        }
      });
      const props = {
        longName: getLongCountryName(key),
        fencerNum: data["n_r"][key].fencer_num,
        issueNum: data["n_r"][key].issue_num,
        ratio: data["n_r"][key].ratio,
        col: colIssueWithValues,
        row: tempArray,
      };
      compArray.push(<CountryCell props={props} key={key + index} />);
    });
    const sortedCompArray = [...compArray].sort(
      (a, b) => b.props.props.issueNum - a.props.props.issueNum
    );
    setCountryCells(sortedCompArray);
    setLoadingState(false)
  }

  function getMost(prop) {
    return Object.keys(statistics["n_r"]).reduce(function (a, b) {
      return (statistics["n_r"][a][prop] == undefined
        ? 0
        : statistics["n_r"][a][prop]) >
        (statistics["n_r"][b][prop] == undefined
          ? 0
          : statistics["n_r"][b][prop])
        ? a
        : b;
    });
  }

  function getLeast(prop) {
    return Object.keys(statistics["n_r"]).reduce(function (a, b) {
      return (statistics["n_r"][a][prop] == undefined
        ? 0
        : statistics["n_r"][a][prop]) <
        (statistics["n_r"][b][prop] == undefined
          ? 0
          : statistics["n_r"][b][prop])
        ? a
        : b;
    });
  }

  useEffect(() => {
    setLoadingState(true)
    getData();
  }, []);

  return (
    <>
      <div className="Main">
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
      </div>
      <div className="PrintableDocument">
        <div className="DocumentPage">
          <div className="DocumentHeader DocumentColumnLayout">
            <div className="DocumentHeaderLeft">
              <div>
                <p className="DocumentHeaderTitle">WEAPON CONTROL</p>
                <p className="DocumentHeaderTitleExtension">STATISTICS</p>
                <p className="DocumentHeaderSubtitle">
                  Generated by: <span>DARTGANAN</span>
                </p>
              </div>
            </div>
            <div className="DocumentHeaderMiddle">
              <b>{currentComp ? currentComp.title_long : ""}</b>
              <p>{currentTour ? currentTour.title_long : ""}</p>
            </div>
            <div className="DocumentHeaderRight">
              <p>{currentComp ? translateSex(currentComp.sex) : ""}</p>
              <p>{currentComp ? translateCompType(currentComp.type) : ""}</p>
              <p>{currentComp ? currentComp.age_group : ""}</p>
              <p>
                {currentComp
                  ? getLongCountryName(currentComp.host_country)
                  : ""}
              </p>
              <p>{currentComp ? currentComp.start_date.substring(0, 4) : ""}</p>
            </div>
          </div>
          <div className="DocumentSectionTitle">ABSTRACT</div>
          <div className="DocumentSection DocumentColumnLayout Standard">
            <p className="DocumentFootnote">
              *Total number of issues divided by total number of fencers
            </p>
            <div>
              <p>NUMBER OF FENCERS:</p>
              <p>NUMBER OF COUNTRIES:</p>
              <p>NUMBER OF ISSUES:</p>
              <p>AVARAGE RATIO*:</p>
            </div>
            <div>
              <p>{statistics ? statistics["total_fencers"] : 0}</p>
              <p> {statistics ? statistics["total_nation"] : 0}</p>
              <p> {statistics ? statistics["total_issues"] : 0}</p>
              <p> {statistics ? statistics["total_ratio"] : 0}</p>
            </div>
            <div className="Light">
              <p>- see more on pages: 1, 2</p>
              <p>- see more on pages: 1, 2</p>
              <p>- see more on pages: 1, 2</p>
              <p>- see more on pages: 1, 2</p>
            </div>
          </div>
          <div className="DocumentDivider">-</div>
          <div className="DocumentSection DocumentColumnLayout TwoColumns">
            <div>
              <p>ACCOUNTED ISSUE TYPES:</p>
            </div>
            <div className="Small">
              <p>
                {listedIssues ? listedIssues : ""}
                {/*FIE mark on blade, Arm gap and weight, Arm length, Blade length, Grip length, Form and depth of the guard, Guard oxydation/ deformation, Excentricity of the blade, Blade flexibility, Curve on the blade, Foucault current device, Point and arm size, Length/ condition of body/ mask wire, Resistance of body/ mask wire, Mask: FIE mark, Mask: condition and insulation, Mask: resistance (sabre/foil, Metallic jacket condition, Metallic jacket resistance, Sabre/ glove overlay condition, Sabre glove overlay resistance, Glove condition, Foil chest protector, Socks, Incorrect name printing, Incorrect national logo, Commercial, Other items*/}
              </p>
            </div>
          </div>
          <div className="DocumentDivider">-</div>
          <p className="DocumentSectionSubtitle">ISSUE TYPE BY FREQUENCY</p>
          <div className="DocumentSection DocumentColumnLayout ThreeColumns">
            <div>
              <p className="Hidden">-</p>
              <p>MOST COMMON:</p>
              <p>LEAST COMMON:</p>
            </div>
            <div className="Center">
              <p className="Light">TYPE</p>
              <p>{statistics ? statistics["most_issue"]["type"] : ""}s</p>
              <p>{statistics ? statistics["least_issue"]["type"] : ""}s</p>
            </div>
            <div className="Center Bold">
              <p className="Light">NUMBER OF</p>
              <p>{statistics ? statistics["most_issue"]["value"] : ""}</p>
              <p>{statistics ? statistics["least_issue"]["value"] : ""}</p>
            </div>
          </div>
          <p className="DocumentSectionSubtitle">
            COUNTRIES WITH MOST AND LEAST ISSUES
          </p>
          <div className="DocumentSection DocumentColumnLayout ThreeColumns">
            <p className="DocumentFootnote">
              *Number of issues divided by number of fencers in each country
            </p>
            <div>
              <p className="Hidden">-</p>
              <p>MOST ISSUES:</p>
              <p>LEAST ISSUES:</p>
            </div>
            <div className="Center">
              <p className="Light">COUNTRY</p>
              <p>
                {statistics ? getLongCountryName(getMost("issue_num")) : ""}
              </p>
              <p>
                {statistics ? getLongCountryName(getLeast("issue_num")) : ""}
              </p>
            </div>
            <div className="Center Bold">
              <p className="Light">NUMBER OF</p>
              <p>
                {statistics
                  ? statistics["n_r"][getMost("issue_num")].issue_num
                  : 0}
              </p>
              <p>
                {statistics
                  ? statistics["n_r"][getLeast("issue_num")].issue_num
                  : 0}
              </p>
            </div>
          </div>
          <p className="DocumentSectionSubtitle">
            COUNTRIES WITH WORST AND BEST RATIOS*
          </p>
          <div className="DocumentSection DocumentColumnLayout ThreeColumns">
            <div>
              <p className="Hidden">-</p>
              <p>WORST RATIO:</p>
              <p>BEST RATIO:</p>
            </div>
            <div className="Center">
              <p className="Light">COUNTRY</p>
              <p>{statistics ? getLongCountryName(getMost("ratio")) : ""}</p>
              <p>{statistics ? getLongCountryName(getLeast("ratio")) : ""}</p>
            </div>
            <div className="Center Bold">
              <p className="Light">RATIO</p>
              <p>
                {statistics ? statistics["n_r"][getLeast("ratio")].ratio : 0}
              </p>
              <p>
                {statistics ? statistics["n_r"][getMost("ratio")].ratio : 0}
              </p>
            </div>
          </div>
          <div className="DocumentDivider">-</div>
          <div className="DocumentSection DocumentColumnLayout Growable WithChart">
            <p className="DocumentSectionSubtitle">
              NUMBER OF FENCERS BY COUNTRY
            </p>
            <div className="DocumentChartWrapper">
            </div>
          </div>
        </div>
        <div className="DocumentPage">
          <div className="DocumentHeader DocumentColumnLayout">
            <div className="DocumentHeaderLeft">
              <div>
                <p className="DocumentHeaderTitle">WEAPON CONTROL</p>
                <p className="DocumentHeaderTitleExtension">STATISTICS</p>
                <p className="DocumentHeaderSubtitle">
                  Generated by: <span>DARTGANAN</span>
                </p>
              </div>
            </div>
            <div className="DocumentHeaderMiddle">
              <b>{currentComp ? currentComp.title_long : ""}</b>
              <p>{currentTour ? currentTour.title_long : ""}</p>
            </div>
            <div className="DocumentHeaderRight">
              <p>{currentComp ? translateSex(currentComp.sex) : ""}</p>
              <p>{currentComp ? translateCompType(currentComp.type) : ""}</p>
              <p>{currentComp ? currentComp.age_group : ""}</p>
              <p>
                {currentComp
                  ? getLongCountryName(currentComp.host_country)
                  : ""}
              </p>
              <p>{currentComp ? currentComp.start_date.substring(0, 4) : ""}</p>
            </div>
          </div>
          <div className="DocumentSectionTitle">
            NUMBER OF ISSUES BY COUNTRY
          </div>
          <div className="DocumentSection Growable">{/* datagrid */}</div>
        </div>
        <div className="DocumentPage">
          <div className="DocumentHeader DocumentColumnLayout">
            <div className="DocumentHeaderLeft">
              <div>
                <p className="DocumentHeaderTitle">WEAPON CONTROL</p>
                <p className="DocumentHeaderTitleExtension">STATISTICS</p>
                <p className="DocumentHeaderSubtitle">
                  Generated by: <span>DARTGANAN</span>
                </p>
              </div>
            </div>
            <div className="DocumentHeaderMiddle">
              <b>{currentComp ? currentComp.title_long : ""}</b>
              <p>{currentTour ? currentTour.title_long : ""}</p>
            </div>
            <div className="DocumentHeaderRight">
              <p>{currentComp ? translateSex(currentComp.sex) : ""}</p>
              <p>{currentComp ? translateCompType(currentComp.type) : ""}</p>
              <p>{currentComp ? currentComp.age_group : ""}</p>
              <p>
                {currentComp
                  ? getLongCountryName(currentComp.host_country)
                  : ""}
              </p>
              <p>{currentComp ? currentComp.start_date.substring(0, 4) : ""}</p>
            </div>
          </div>
          <div className="DocumentSectionTitle">
            NUMBER OF ISSUES BY COUNTRY
          </div>
          <div className="DocumentSection Growable">{countryCells}</div>
        </div>
      </div>
    </>
  );
}
