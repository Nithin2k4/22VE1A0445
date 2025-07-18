import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const urlMap = JSON.parse(localStorage.getItem("urlMap") || "{}");
    const clickMap = JSON.parse(localStorage.getItem("clickMap") || "{}" );
    const data = Object.entries(urlMap).map(([shortcode, info]) => ({
      shortcode,
      ...info,
      clicks: clickMap[shortcode]?.clicks || [],
    }));
    setStats(data);
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Shortened URL Statistics</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shortened URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Expires At</TableCell>
              <TableCell>Total Clicks</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((row) => (
              <TableRow key={row.shortcode}>
                <TableCell>
                  <a href={`/${row.shortcode}`}>{window.location.origin}/{row.shortcode}</a>
                </TableCell>
                <TableCell>{row.url}</TableCell>
                <TableCell>{row.createdAt ? new Date(row.createdAt).toLocaleString() : "-"}</TableCell>
                <TableCell>{row.expiry ? new Date(row.expiry).toLocaleString() : "-"}</TableCell>
                <TableCell>{row.clicks.length}</TableCell>
                <TableCell>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Click Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {row.clicks.length === 0 ? (
                        <Typography>No clicks yet</Typography>
                      ) : (
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Timestamp</TableCell>
                              <TableCell>Source</TableCell>
                              <TableCell>Location</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.clicks.map((click, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{click.source || "-"}</TableCell>
                                <TableCell>{click.location || "-"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StatsPage;
