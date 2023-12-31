import React, { useEffect } from "react";
import WCPrintHeader from "./WCSDHeader";
import PrintTable from "../../../components/static/PrintTable/PrintTable";
import { Pie } from "@nivo/pie";


//Code for the print document

export default function WCPrint(props) {
  const pageProps = props.pageProps;
  const headerProps = props.headerProps;

  return (
    <div className="PrintableDocument">
      {/* START OF PAGE 1 */}
      <div className="DocumentPage">
        <WCPrintHeader {...headerProps} />
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
            <p>{pageProps.stats ? pageProps.stats["total_fencers"] : 0}</p>
            <p>{pageProps.stats ? pageProps.stats["total_nation"] : 0}</p>
            <p>{pageProps.stats ? pageProps.stats["total_issues"] : 0}</p>
            <p>{pageProps.stats ? pageProps.stats["total_ratio"] : 0}</p>
          </div>
          <div className="Light">
            <p>- see more on pages: 1, 3</p>
            <p>- see more on pages: 1, 3</p>
            <p>- see more on pages: 1, 2, 3</p>
            <p>- see more on pages: 1, 2, 3</p>
          </div>
        </div>
        <div className="DocumentDivider">-</div>
        <div className="DocumentSection DocumentColumnLayout TwoColumns">
          <div>
            <p>ACCOUNTED ISSUE TYPES:</p>
          </div>
          <div className="Small">
            <p>
              {pageProps.allIssues ? pageProps.allIssues : ""}
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
            <p>
              {pageProps.stats ? pageProps.stats["most_issue"]["type"] : ""}s
            </p>
            <p>
              {pageProps.stats ? pageProps.stats["least_issue"]["type"] : ""}s
            </p>
          </div>
          <div className="Center Bold">
            <p className="Light">NUMBER OF</p>
            <p>
              {pageProps.stats ? pageProps.stats["most_issue"]["value"] : ""}
            </p>
            <p>
              {pageProps.stats ? pageProps.stats["least_issue"]["value"] : ""}
            </p>
          </div>
        </div>
        <p className="DocumentSectionSubtitle">
          COUNTRIES WITH MOST AND LEAST ISSUES
        </p>
        <div className="DocumentSection DocumentColumnLayout ThreeColumns">
          <div>
            <p className="Hidden">-</p>
            <p>MOST ISSUES:</p>
            <p>LEAST ISSUES:</p>
          </div>
          <div className="Center">
            <p className="Light">COUNTRY</p>
            <p>
              {pageProps.stats
                ? pageProps.getLongCName(
                  pageProps.stats["n_r"][[pageProps.getMostFunc("issue_num")]]
                    .nation
                )
                : ""}
            </p>
            <p>
              {pageProps.stats
                ? pageProps.getLongCName(
                  pageProps.stats["n_r"][
                    [pageProps.getLeastFunc("issue_num")]
                  ].nation
                )
                : ""}
            </p>
          </div>
          <div className="Center Bold">
            <p className="Light">NUMBER OF</p>
            <p>
              {pageProps.stats
                ? pageProps.stats["n_r"][pageProps.getMostFunc("issue_num")]
                  .issue_num
                : 0}
            </p>
            <p>
              {pageProps.stats
                ? pageProps.stats["n_r"][pageProps.getLeastFunc("issue_num")]
                  .issue_num
                : 0}
            </p>
          </div>
        </div>
        <p className="DocumentSectionSubtitle">
          COUNTRIES WITH WORST AND BEST RATIOS*
        </p>
        <div className="DocumentSection DocumentColumnLayout ThreeColumns">
          <p className="DocumentFootnote">
            *Number of issues divided by number of fencers in each country
          </p>
          <div>
            <p className="Hidden">-</p>
            <p>WORST RATIO:</p>
            <p>BEST RATIO:</p>
          </div>
          <div className="Center">
            <p className="Light">COUNTRY</p>
            <p>
              {" "}
              {pageProps.stats
                ? pageProps.getLongCName(
                  pageProps.stats["n_r"][[pageProps.getMostFunc("ratio")]]
                    .nation
                )
                : ""}
            </p>
            <p>
              {pageProps.stats
                ? pageProps.getLongCName(
                  pageProps.stats["n_r"][[pageProps.getLeastFunc("ratio")]]
                    .nation
                )
                : ""}
            </p>
          </div>
          <div className="Center Bold">
            <p className="Light">RATIO</p>
            <p>
              {pageProps.stats
                ? pageProps.stats["n_r"][pageProps.getMostFunc("ratio")]
                  .issue_num
                : 0}
            </p>
            <p>
              {pageProps.stats
                ? pageProps.stats["n_r"][pageProps.getLeastFunc("ratio")]
                  .issue_num
                : 0}
            </p>
          </div>
        </div>
        <div className="DocumentDivider">-</div>
        <div className="DocumentSection DocumentColumnLayout Growable WithChart">
          <p className="DocumentSectionSubtitle">
            NUMBER OF FENCERS BY COUNTRY
            <span>- see more on page: 3</span>
          </p>
          <div className="DocumentChartWrapper">
            <Pie
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              width={680}
              height={180}
              animate={false}
              data={pageProps.noFencerChart ? pageProps.noFencerChart : []}
              innerRadius={0.7}
              padAngle={3}
              cornerRadius={3}
              arcLinkLabel={d => `${d.id}: ${d.value}`}
              enableArcLabels={false}
              activeOuterRadiusOffset={8}
              colors={{ scheme: 'greys' }}
              borderWidth={2}
              borderColor={{ from: 'color', modifiers: [['darker', '0.2']] }}
              arcLinkLabelsTextColor="#000000"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor="#000000"
              arcLabelsTextColor="#000000"
              isInteractive={false}
              legends={[]}
            />
          </div>
        </div>
      </div>
      {/* END OF PAGE 1 */}
      {/* START OF PAGE 2 */}
      <div className="DocumentPage">
        <WCPrintHeader {...headerProps} />
        <div className="DocumentSectionTitle">ABSTRACT</div>
        <div className="DocumentSection DocumentColumnLayout Growable WithChart">
          <p className="DocumentSectionSubtitle">
            RATIOS BY COUNTRY
            <span>- see more on page: 3</span>
          </p>
          <div className="DocumentChartWrapper">
            <Pie
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              width={680}
              height={330}
              animate={false}
              data={pageProps.ratiosChart ? pageProps.ratiosChart : []}
              innerRadius={0.7}
              padAngle={3}
              cornerRadius={3}
              arcLinkLabel={d => `${d.id}: ${d.value}`}
              enableArcLabels={false}
              activeOuterRadiusOffset={8}
              colors={{ scheme: 'greys' }}
              borderWidth={2}
              borderColor={{ from: 'color', modifiers: [['darker', '0.2']] }}
              arcLinkLabelsTextColor="#000000"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor="#000000"
              arcLabelsTextColor="#000000"
              isInteractive={false}
              legends={[]}
            />
          </div>
        </div>
        <div className="DocumentDivider">-</div>
        <div className="DocumentSection DocumentColumnLayout Growable WithChart">
          <p className="DocumentSectionSubtitle">
            NUMBER OF ISSUES BY COUNTRY
            <span>- see more on page: 3</span>
          </p>
          <div className="DocumentChartWrapper">
            <Pie
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              width={680}
              height={330}
              animate={false}
              data={pageProps.noIssuesChart ? pageProps.noIssuesChart : []}
              innerRadius={0.7}
              padAngle={3}
              arcLinkLabel={d => `${d.id}: ${d.value}`}
              enableArcLabels={false}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: 'greys' }}
              borderWidth={2}
              borderColor={{ from: 'color', modifiers: [['darker', '0.2']] }}
              arcLinkLabelsTextColor="#000000"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor="#000000"
              arcLabelsTextColor="#000000"
              isInteractive={false}
              legends={[]}
            />
          </div>
        </div>
      </div>
      {/* END OF PAGE 2 */}
      {/* START OF PAGE 3 */}
      <div className="DocumentPage">
        <WCPrintHeader {...headerProps} />
        <div className="DocumentSectionTitle">COUNTRIES SUMMARY</div>
        <div className="DocumentSection DocumentColumnLayout TwoColumns">
          <div>
            <p>NUMBER OF FENCERS:</p>
            <p>NUMBER OF ISSUES:</p>
            <p>RATIO:</p>
          </div>
          <div>
            <p>{pageProps.stats ? pageProps.stats["total_fencers"] : 0}</p>
            <p>{pageProps.stats ? pageProps.stats["total_issues"] : 0}</p>
            <p>{pageProps.stats ? pageProps.stats["total_ratio"] : 0}</p>
          </div>
        </div>
        <div className="DocumentSection Growable FullPage">
          {pageProps ? (
            <PrintTable
              row={pageProps.countySummaryTable.row}
              col={pageProps.countySummaryTable.col}
              sorting={{ field: "issue_num" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {/* END OF PAGE 3 */}
      {/* START OF PAGE 4 */}
      <div className="DocumentPage">
        <WCPrintHeader {...headerProps} />
        <div className="DocumentSectionTitle">ISSUES SUMMARY</div>
        <div className="DocumentSection DocumentColumnLayout TwoColumns">
          <div>
            <p>NUMBER OF ISSUES:</p>
          </div>
          <div>
            <p>{pageProps.stats ? pageProps.stats["total_issues"] : 0}</p>
          </div>
        </div>
        <div className="DocumentSection Growable FullPage">
          {pageProps ? (
            <PrintTable
              row={pageProps.issueWithSumsTable.row}
              col={pageProps.issueWithSumsTable.col}
              sorting={{ field: "freq" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {/* END OF PAGE 4 */}
      {/* START OF PAGE 5 */}
      {pageProps ? pageProps.printCells : ""}
    </div>
  );
};

