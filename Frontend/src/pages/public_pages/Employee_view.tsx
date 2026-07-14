import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  Download,
  ArrowBack as ArrowBackIcon,
  Article as ArticleIcon,
} from "@mui/icons-material";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import api from "../../constants/Api";

import DownloadIcon from "@mui/icons-material/Download";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";

const Views_employee = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const navigate = useNavigate();

  const cardRef = useRef<HTMLDivElement>(null);
  const downloadBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(`${api.user.view}${id}`, {
        withCredentials: true,
      });

      setEmployee(response.data.user);
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <Typography>Loading...</Typography>;
  }

  const downloadCard = async () => {
    setIsGeneratingPdf(true);

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!cardRef.current) {
      setIsGeneratingPdf(false);
      return;
    }

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const cardPdf = new jsPDF("p", "mm", "a4");

      const pageWidth = cardPdf.internal.pageSize.getWidth();
      const pageHeight = cardPdf.internal.pageSize.getHeight();

      const margin = 10;

      const imgWidth = pageWidth - margin * 2;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      cardPdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);

      const cardPdfBytes = cardPdf.output("arraybuffer");

      // Fetch Resume PDF
      const resumeResponse = await fetch(
        `/uploads/cv/${employee.cv}`,
      );

      if (!resumeResponse.ok) {
        throw new Error("Resume PDF not found.");
      }

      const resumeBytes = await resumeResponse.arrayBuffer();

      // Merge PDFs
      const mergedPdf = await PDFDocument.create();

      const cardDocument = await PDFDocument.load(cardPdfBytes);
      const resumeDocument = await PDFDocument.load(resumeBytes);

      const cardPages = await mergedPdf.copyPages(
        cardDocument,
        cardDocument.getPageIndices(),
      );

      cardPages.forEach((page) => mergedPdf.addPage(page));

      const resumePages = await mergedPdf.copyPages(
        resumeDocument,
        resumeDocument.getPageIndices(),
      );

      resumePages.forEach((page) => mergedPdf.addPage(page));

      const mergedBytes = await mergedPdf.save();

      // Download merged PDF
      const blob = new Blob([mergedBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${employee.firstName}_${employee.lastName}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        p: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          direction="row"
        >
          <Stack spacing={3} sx={{ mb: 2, mt: 2 }} direction={"row"}>
            <IconButton
              onClick={() => navigate("/employee-list")}
              sx={{ color: "#1E3A8A" }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h4" fontWeight="bold" ml="3" color="#1E3A8A">
              {employee.firstName} {employee.lastName}
            </Typography>
          </Stack>

          <Stack sx={{ m: 3 }}>
            <IconButton>
              <DownloadIcon onClick={downloadCard} />
            </IconButton>
          </Stack>
        </Stack>

        <Divider />

        <Grid
          ref={cardRef}
          container
          sx={{
            p: 3,
          }}
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Grid
                size={{ xs: 12 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar
                  src={`/uploads/photos/${employee.photo}`}
                  sx={{
                    width: 170,
                    height: 170,
                    border: "5px solid #1E3A8A",
                  }}
                />
              </Grid>
            </Stack>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 9,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              {employee.firstName} {employee.lastName}
            </Typography>

            <Typography color="text.secondary" mb={2}>
              {employee.technology} Developer
            </Typography>

            <Divider
              sx={{
                my: 4,
              }}
            />
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  First Name
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.firstName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Last Name
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.lastName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Email Address
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.email}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Technology
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.technology.toUpperCase() || "N/A"}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" color="#1E3A8A" mb={3}>
              Professional Information
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Experience
                </Typography>

                <Typography variant="h6" fontWeight={600}>
                  {employee.experience} Years
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Primary Technology
                </Typography>

                <Typography sx={{ fontWeight: "bold", fontSize: "" }}>
                  {employee.technology}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Skills
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {employee.skill?.length > 0 ? (
                    employee.skill.map((skill: string, index: number) => (
                      <Chip
                        key={index}
                        label={skill}
                        color="primary"
                        variant="outlined"
                      />
                    ))
                  ) : (
                    <Typography color="text.secondary">
                      No skills available
                    </Typography>
                  )}
                </Stack>
              </Grid>
            </Grid>

            <Grid>
              <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Resume
                </Typography>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    spacing={2}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <ArticleIcon color="error" />

                      <Typography>{employee.cv}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                      {!isGeneratingPdf && (
                        <Button
                          variant="outlined"
                          onClick={() =>
                            window.open(
                              `/uploads/cv/${employee.cv}`,
                              "_blank",
                            )
                          }
                        >
                          View
                        </Button>
                      )}

                      <Button
                        ref={downloadBtnRef}
                        variant="contained"
                        startIcon={<Download />}
                        onClick={() =>
                          window.open(
                            `/uploads/cv/${employee.cv}`,
                            "_blank",
                          )
                        }
                      >
                        Download
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Views_employee;
