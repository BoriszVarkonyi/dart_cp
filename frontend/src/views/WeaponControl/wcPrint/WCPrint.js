import React from "react";
import WCPrintHeader from "./WCPrintHeader";

export default function WCPrint(props) {
  const pageProps = props.pageProps
  const headerProps = props.headerProps
  return (
    <div className="PrintableDocument">
      <div className="DocumentPage">
        <WCPrintHeader  {...headerProps} />
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
            <p> {pageProps.stats ? pageProps.stats["total_nation"] : 0}</p>
            <p> {pageProps.stats ? pageProps.stats["total_issues"] : 0}</p>
            <p> {pageProps.stats ? pageProps.stats["total_ratio"] : 0}</p>
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
            <p>{pageProps.stats ? pageProps.stats["most_issue"]["type"] : ""}s</p>
              <p>{pageProps.stats ? pageProps.stats["least_issue"]["type"] : ""}s</p>
          </div>
          <div className="Center Bold">
            <p className="Light">NUMBER OF</p>
            <p>{pageProps.stats ? pageProps.stats["most_issue"]["value"] : ""}</p>
              <p>{pageProps.stats ? pageProps.stats["least_issue"]["value"] : ""}</p>
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
              {pageProps.stats ? pageProps.getLongCName(pageProps.stats["n_r"][[pageProps.getMostFunc("issue_num")]].nation) : ""}
            </p>
            <p>
              {pageProps.stats  ?  pageProps.getLongCName(pageProps.stats["n_r"][[pageProps.getLeastFunc("issue_num")]].nation) : ""}
            </p>
          </div>
          <div className="Center Bold">
            <p className="Light">NUMBER OF</p>
            <p>
              {pageProps.stats
                  ? pageProps.stats["n_r"][pageProps.getMostFunc("issue_num")].issue_num
                  : 0}
            </p>
            <p>
            {pageProps.stats
                  ? pageProps.stats["n_r"][pageProps.getLeastFunc("issue_num")].issue_num
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
            <p>  {pageProps.stats ? pageProps.getLongCName(pageProps.stats["n_r"][[pageProps.getMostFunc("ratio")]].nation) : ""}</p>
              <p>{pageProps.stats ? pageProps.getLongCName(pageProps.stats["n_r"][[pageProps.getLeastFunc("ratio")]].nation) : ""}</p>
          </div>
          <div className="Center Bold">
            <p className="Light">RATIO</p>
            <p>
            {pageProps.stats
                  ? pageProps.stats["n_r"][pageProps.getMostFunc("ratio")].issue_num
                  : 0}
              </p>
              <p>
              {pageProps.stats
                  ? pageProps.stats["n_r"][pageProps.getLeastFunc("ratio")].issue_num
                  : 0}
              </p>
          </div>
        </div>
        <div className="DocumentDivider">-</div>
        <div className="DocumentSection DocumentColumnLayout Growable WithChart">
          <p className="DocumentSectionSubtitle">
            NUMBER OF FENCERS BY COUNTRY
          </p>
          <div className="DocumentChartWrapper"></div>
        </div>
      </div>
      <div className="DocumentPage">
        <WCPrintHeader {...headerProps} />
        <div className="DocumentSectionTitle">NUMBER OF ISSUES BY COUNTRY</div>
        <div className="DocumentSection Growable">{/* datagrid */}</div>
      </div>
      <div className="DocumentPage">
        <WCPrintHeader {...headerProps} />
        <div className="DocumentSectionTitle">NUMBER OF ISSUES BY COUNTRY</div>
        <div className="DocumentSection Growable">]idejönnek a country cellek :c]</div>
      </div>
    </div>
  );
}
