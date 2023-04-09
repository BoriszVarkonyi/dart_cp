import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./WeaponControlStatistics.css";

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DataGrid } from "@mui/x-data-grid";

export default function WeaponControlStatistics() {

  // Statistics document styling
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  // Statistics document declaration
  const WCStatisticsDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Weapon Control Statistics</h2>
        <div className="PageButtonsWrapper">
          {/* Download Data */}
          <PDFDownloadLink document={<WCStatisticsDocument />} fileName="_compname_weapon_control_statistics">
            <Button variant="contained" size="small">
              DOWNLOAD PDF
            </Button>
          </PDFDownloadLink>
        </div>
      </div>
      <div className="ColumnPage">
        <p className="PageSectionTitle">SUMMARY</p>
        <div className="PageSection">
          <div className="StatGrid">
            <div className="StatGridCell1"></div>
            <div className="StatGridCell2"><p>GENERAL</p></div>
            <div className="StatGridCell3"><p>HIGHS & LOWS</p></div>
            <div className="StatGridCell4"><p>ISSUES</p></div>
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
            <div className="StatGridCell8"><p>FENCERS</p></div>
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
            <div className="StatGridCell12"><p>COUNTRY</p></div>
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
          <p>datagrid ---- columns: country, number of issue ---- sorted by: no. issue most to least</p>
        </div>
        <p className="PageSectionTitle">ISSUE TYPES BY FREQUENCY</p>
        <div className="PageSection">
          <p>datagrid ---- columns: issue name, frequency ---- sorted by: frequency most to least, dont show where freq = 0</p>
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
                <p>datagrid ---- columns: issue name, frequency ---- sorted by: frequency most to least, dont show where freq = 0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
