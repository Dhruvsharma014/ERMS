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
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

import api from "../../constants/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userValidation } from "../../validations/userValidation";
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

const Add_employee = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const [cv, setCv] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    experience: 0,
    technology: "",
    photo: null,
    cv: null,
    skill: [],
  });

  const addSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    if (skills.includes(value)) {
      return;
    }

    setSkills((prev) => [...prev, value]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((item) => item !== skill));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    console.log(file);

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

  const handleSubmit = async () => {
    const result = userValidation.safeParse(formData);
    console.log(result);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
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
      const response = await axios.post(api.user.create, payload, {
        withCredentials: true,
      });
      if (response.status > 199 && response.status < 299) {
        toast.success("Employee Created..", {
          autoClose: 1000,
        });
        navigate("/employee-operation");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status :", error.response?.status);
        console.log("Data :", error.response?.data);
        console.log("Message :", error.response?.data.message);
        toast.error(
          error?.response?.data?.message || "error creating employee",
          {
            autoClose: 1000,
          },
        );
      }
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
            Add Employee
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
              <>
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
                {errors.photo && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {errors.photo[0]}
                  </Typography>
                )}
              </>
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
              label="First Name"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  firstName: e.target.value,
                });
                setErrors((prev) => ({ ...prev, firstName: undefined }));
              }}
              error={!!errors.firstName}
              helperText={errors.firstName?.[0]}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              value={formData.lastName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  lastName: e.target.value,
                });
                setErrors((prev) => ({ ...prev, lastName: undefined }));
              }}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.[0]}
            />
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              value={formData.email}
              label="Email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={!!errors.email}
              helperText={errors.email?.[0]}
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
              onChange={(e) => {
                setFormData({ ...formData, technology: e.target.value });
                setErrors((prev) => ({ ...prev, technology: undefined }));
              }}
              label="Technology"
              error={!!errors.technology}
              helperText={errors.technology?.[0]}
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
              <>
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
                    error={!!errors.cv}
                    helperText={errors.cv?.[0]}
                  />
                </Button>
                {errors.cv && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {errors.cv[0]}
                  </Typography>
                )}
              </>
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
              Create Employee
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default Add_employee;
