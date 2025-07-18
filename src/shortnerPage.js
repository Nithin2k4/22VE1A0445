import React, { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { shortenURL } from "../api";
import logError from "../logging middleware/logger";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ShortenerPage = () => {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    setError("");
    setShort("");
    setCopied(false);
    if (!url) {
      setError("URL is required");
      return;
    }
    setLoading(true);
    try {
      const res = await shortenURL({ originalURL: url });
      setShort(res.shortURL);
    } catch (err) {
      setError("Shorten failed");
      await logError({
        level: "error",
        stack: "frontend",
        pkg: "ShortenerPage",
        message: err.message,
      });
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(short);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box p={3} maxWidth={500} mx="auto">
      <Typography variant="h5" mb={2}>URL Shortener</Typography>
      <TextField
        label="Enter URL"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ my: 2 }}
        disabled={loading}
      />
      <Button
        variant="contained"
        onClick={handleShorten}
        disabled={loading}
        fullWidth
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Shorten"}
      </Button>
      {short && (
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            value={short}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopy} edge="end">
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {copied && <Typography color="success.main" ml={2}>Copied!</Typography>}
        </Box>
      )}
      {error && <Typography color="error" mt={2}>{error}</Typography>}
    </Box>
  );
};

export default ShortenerPage;