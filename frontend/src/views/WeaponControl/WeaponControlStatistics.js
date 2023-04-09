import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
// Create styles
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

const MyDocument = () => (
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

export default function WeaponControlStatistics() {
  return (
    <div className="Main">
      <div className="PageHeader">
        <h2 className="PageTitle">Weapon Control Statistics</h2>
        <div className="PageButtonsWrapper">
          <Button variant="contained" size="small">
            Print
          </Button>
        </div>
      </div>
      <div className="PageContent">
        ReactPDF.render(<MyDocument />);
      </div>
    </div>
  );
}
