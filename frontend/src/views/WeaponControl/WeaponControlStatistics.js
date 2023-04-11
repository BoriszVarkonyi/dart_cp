import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./WeaponControlStatistics.css";
import { DataGrid } from "@mui/x-data-grid";
import { ResponsivePieCanvas } from "@nivo/pie";
import { useNavigate } from "react-router-dom";

export default function WeaponControlStatistics() {
  const navigate = useNavigate();

  const MyResponsivePieCanvas = ({ data /* see data tab */ }) => (
    <ResponsivePieCanvas
      data={[
        {
          id: "scala",
          label: "scala",
          value: 201,
          color: "hsl(355, 70%, 50%)",
        },
        {
          id: "php",
          label: "php",
          value: 392,
          color: "hsl(77, 70%, 50%)",
        },
        {
          id: "ruby",
          label: "ruby",
          value: 523,
          color: "hsl(68, 70%, 50%)",
        },
        {
          id: "java",
          label: "java",
          value: 492,
          color: "hsl(100, 70%, 50%)",
        },
        {
          id: "css",
          label: "css",
          value: 365,
          color: "hsl(91, 70%, 50%)",
        },
        {
          id: "javascript",
          label: "javascript",
          value: 186,
          color: "hsl(37, 70%, 50%)",
        },
        {
          id: "stylus",
          label: "stylus",
          value: 409,
          color: "hsl(156, 70%, 50%)",
        },
        {
          id: "erlang",
          label: "erlang",
          value: 144,
          color: "hsl(64, 70%, 50%)",
        },
        {
          id: "c",
          label: "c",
          value: 207,
          color: "hsl(172, 70%, 50%)",
        },
        {
          id: "go",
          label: "go",
          value: 103,
          color: "hsl(215, 70%, 50%)",
        },
        {
          id: "hack",
          label: "hack",
          value: 546,
          color: "hsl(116, 70%, 50%)",
        },
        {
          id: "lisp",
          label: "lisp",
          value: 345,
          color: "hsl(193, 70%, 50%)",
        },
        {
          id: "rust",
          label: "rust",
          value: 454,
          color: "hsl(169, 70%, 50%)",
        },
        {
          id: "python",
          label: "python",
          value: 201,
          color: "hsl(293, 70%, 50%)",
        },
        {
          id: "make",
          label: "make",
          value: 247,
          color: "hsl(191, 70%, 50%)",
        },
        {
          id: "haskell",
          label: "haskell",
          value: 504,
          color: "hsl(219, 70%, 50%)",
        },
        {
          id: "elixir",
          label: "elixir",
          value: 56,
          color: "hsl(187, 70%, 50%)",
        },
        {
          id: "sass",
          label: "sass",
          value: 76,
          color: "hsl(339, 70%, 50%)",
        },
      ]}
      margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "paired" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="#333333"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 140,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 60,
          itemHeight: 14,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 14,
          symbolShape: "circle",
        },
      ]}
    />
  );

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Weapon Control Statistics</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" size="small" onClick={() => navigate(-1)}>
            GO BACK
          </Button>
          <Button variant="contained" size="small">
            DOWNLOAD PDF
          </Button>
        </div>
      </div>
      <div className="ColumnPage">
        temporary, just testing
        <MyResponsivePieCanvas />
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
                <p className="StatData">80</p>
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
                      <p className="StatTopic">Missing screw</p>
                      <p>18 i.</p>
                    </div>
                  </div>
                </div>

                <div className="StatCard Small Green">
                  <div>
                    <p className="StatTitle">LEAST COMMON</p>
                  </div>
                  <div className="StatDetails">
                    <div>
                      <p className="StatTopic">Missing FIE mark</p>
                      <p>0 i.</p>
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
                <p className="StatData">75</p>
              </div>
            </div>
            <div className="StatGridCell10">
              <div className="StatCard Large Extra">
                <p className="StatTitle">AVARAGE RATIO</p>
                <p className="StatData">1.3</p>
              </div>
            </div>
            <div className="StatGridCell11"></div>
            <div className="StatGridCell12">
              <p>COUNTRY</p>
            </div>
            <div className="StatGridCell13">
              <div className="StatCard Large">
                <p className="StatTitle">COUNTRY TOTAL</p>
                <p className="StatData">12</p>
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
                      <p className="StatTopic">Romania</p>
                      <div>
                        <p>18 f.</p>
                        <b>36 i.</b>
                        <p>2r</p>
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
                      <p className="StatTopic">Japan</p>
                      <div>
                        <p>15 f.</p>
                        <b>1 i.</b>
                        <p>0.1r</p>
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
                      <p className="StatTopic">Poland</p>
                      <div>
                        <p>2 f.</p>
                        <p>4 i.</p>
                        <b>2r</b>
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
                      <p className="StatTopic">Hungary</p>
                      <div>
                        <p>20 f.</p>
                        <p>26 i.</p>
                        <b>1.3r</b>
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
          <p>
            datagrid ---- columns: country, number of issue ---- sorted by: no.
            issue most to least
          </p>
        </div>
        <p className="PageSectionTitle">ISSUE TYPES BY FREQUENCY</p>
        <div className="PageSection">
          <p>
            datagrid ---- columns: issue name, frequency ---- sorted by:
            frequency most to least, dont show where freq = 0
          </p>
        </div>
        <p className="PageSectionTitle">NUMBER OF ISSUE TYPES BY COUNTRY</p>
        <div className="PageSection">
          <div className="CountryGrid">
            <div className="CountryCell">
              <p className="CountryName">Country Name</p>
              <div className="CountryData">
                <p>20 fencers</p>
                <b>26 issues</b>
                <p>1.3 ratio</p>
              </div>
              <div className="CountryContent">
                <p>
                  datagrid ---- columns: issue name, frequency ---- sorted by:
                  frequency most to least, dont show where freq = 0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
