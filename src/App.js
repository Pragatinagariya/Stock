import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import Header from './components/Header';
import StockTable from './components/StockTable';
import { Container } from '@mui/material';
import dayjs from 'dayjs';

const App = () => {
  const [interval, setInterval] = useState('DAILY');
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('/data/ADANIPORTS.csv');
        const csvData = response.data;
        const parsedData = Papa.parse(csvData, { header: true }).data;

        const headers = parsedData.length > 0 ? Object.keys(parsedData[0]) : [];

        const tableColumns = headers.map(header => ({
          field: header.replace(/\s+/g, '').toLowerCase(),
          headerName: header,
          width: 150,
        }));

        const formattedData = parsedData.map((row, index) => ({
          id: index + 1,
          date: row.Date,
          symbol: row.Symbol,
          series: row.Series,
          prevClose: parseFloat(row['Prev Close']),
          open: parseFloat(row.Open),
          high: parseFloat(row.High),
          low: parseFloat(row.Low),
          last: parseFloat(row.Last),
          close: parseFloat(row.Close),
          vwap: parseFloat(row.VWAP),
          volume: parseInt(row.Volume),
          turnover: parseFloat(row.Turnover),
          trades: parseInt(row.Trades) || '', // Handle empty strings
          deliverableVolume: parseInt(row['Deliverable Volume']),
          percentDeliverble: parseFloat(row['%Deliverble']),
        }));

        setRows(formattedData);
        setColumns(tableColumns);
        setFilteredRows(formattedData); // Set filtered data initially to all data
      } catch (error) {
        console.error('Error fetching stock data: ', error);
      }
    };

    fetchStockData();
  }, [interval]);

  useEffect(() => {
    const filterDataByDate = () => {
      const filteredData = rows.filter(row => {
        const rowDate = dayjs(row.date);
        const isAfterStartDate = startDate ? rowDate.isAfter(startDate, 'day') || rowDate.isSame(startDate, 'day') : true;
        const isBeforeEndDate = endDate ? rowDate.isBefore(endDate, 'day') || rowDate.isSame(endDate, 'day') : true;
        return isAfterStartDate && isBeforeEndDate;
      });
      setFilteredRows(filteredData);
    };

    filterDataByDate();
  }, [startDate, endDate, rows]);

  return (
    <Container>
      <Header 
        interval={interval} 
        setInterval={setInterval} 
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <StockTable rows={filteredRows} columns={columns} />
    </Container>
  );
};

export default App;
