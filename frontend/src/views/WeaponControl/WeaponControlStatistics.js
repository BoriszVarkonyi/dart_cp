import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from "@react-pdf/renderer";

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
              DOWNLOAD
            </Button>
          </PDFDownloadLink>
        </div>
      </div>
      <div className="PageContent">
      </div>
    </div>
  );
}
