import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { BACKEND_URL } from "../../config/config";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import api from "../../constants/Api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Edit_employee = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [cv, setCv] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    experience: 0,
    technology: "",
    photo: null,
    cv: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${api.user.view}${id}`, {
        withCredentials: true,
      });

      setFormData({
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        experience: response.data.user.experience,
        technology: response.data.user.technology,
        photo: response.data.user.photo,
        cv: response.data.user.cv,
      });
      setSkills(response.data.user.skill || []);

      setPhoto(
        `${BACKEND_URL}/uploads/photos/${response.data.user.photo}`,
      );
      setCv(`${BACKEND_URL}/uploads/cv/${response.data.user.cv}`);
    };
    fetchData();
  }, [id]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setPhoto(URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  const handleCv = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Preview URL
    setCv(URL.createObjectURL(file));

    // Save actual file
    setFormData((prev) => ({
      ...prev,
      cv: file,
    }));
  };

  const addSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    if (skills.includes(value)) return;

    setSkills((prev) => [...prev, value]);

    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((item) => item !== skill));
  };

  const handleSubmit = async () => {
    const payload = new FormData();

    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("email", formData.email);
    payload.append("experience", formData.experience);
    payload.append("technology", formData.technology);
    payload.append("skill", JSON.stringify(skills));
    payload.append("photo", formData.photo);
    payload.append("cv", formData.cv);

    try {
      const response = await axios.patch(`${api.user.edit}${id}`, payload, {
        withCredentials: true,
      });
      if (response.status > 199 && response.status < 299) {
        toast.success("Employee Updated..", {
          autoClose: 1000,
        });
        navigate("/employee-operation");
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2",
        minHeight: "100vh",

        p: 3,
      }}
    >
      <Paper
        elevation={20}
        sx={{
          width: "100%",
          maxWidth: 750,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Stack spacing={3} direction="row">
          <IconButton
            onClick={() => navigate("/employee-operation")}
            sx={{ color: "#1E3A8A" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" fontWeight="bold" ml="3" color="#1E3A8A">
            Edit Employee
          </Typography>
        </Stack>

        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} sx={{ m: 3 }} alignItems="center">
            <Avatar
              src={photo}
              sx={{
                width: 120,
                height: 120,
                border: "4px solid #1E3A8A",
              }}
            />

            {photo === null ? (
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  textTransform: "none",
                  bgcolor: "#1E3A8A",
                  width: "150px",
                }}
              >
                Upload Photo
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                />
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setPhoto(null)}
                sx={{
                  textTransform: "none",
                  bgcolor: "#8a1e1e",
                  width: "150px",
                }}
              >
                Remove
              </Button>
            )}
          </Stack>
        </Grid>

        <Grid container spacing={3}>

          {/* First & Last Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              value={formData.firstName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstName: e.target.value,
                })
              }
              label="First Name"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              value={formData.lastName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastName: e.target.value,
                })
              }
              label="Last Name"
            />
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              label="Email"
            />
          </Grid>

          {/* Experience & Technology */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              value={formData.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: Number(e.target.value),
                })
              }
              label="Experience"
              placeholder="e.g. 2 Years"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              value={formData.technology}
              onChange={(e) =>
                setFormData({ ...formData, technology: e.target.value })
              }
              label="Technology"
            />
          </Grid>
          
          <Grid size={{ xs: 12, md:6 }}>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                label="Skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />

              <Button
                variant="contained"
                onClick={addSkill}
                sx={{
                  minWidth: 56,
                  width: 56,
                  height: 56,
                  bgcolor: "#1E3A8A",
                  fontSize: "22px",
                }}
              >
                +
              </Button>
            </Stack>
          </Grid>

           <Grid size={{ xs: 12 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => removeSkill(skill)}
                 color="primary"
                        variant="outlined"
                />
              ))}
            </Stack>
          </Grid>

          {/* Upload CV */}

          <Grid size={{ xs: 12 }}>
            {cv === null ? (
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ height: 55 }}
              >
                Upload CV (PDF)
                <VisuallyHiddenInput
                  type="file"
                  accept=".pdf"
                  onChange={handleCv}
                />
              </Button>
            ) : (
              <Stack direction={"row"}>
                <Button
                  variant="contained"
                  onClick={() => setCv(null)}
                  sx={{
                    flexGrow: 1,
                    textTransform: "none",
                    bgcolor: "#8a1e1e",
                    width: "150px",
                  }}
                >
                  Remove CV
                </Button>
                <Button
                  sx={{ flexGrow: 1 }}
                  onClick={() => window.open(cv, "_blank")}
                >
                  Preview CV
                </Button>
              </Stack>
            )}{" "}
          </Grid>

          {/* Submit */}
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmit}
              sx={{
                mt: 2,
                py: 1.5,
                bgcolor: "#1E3A8A",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Edit Employee
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default Edit_employee;
