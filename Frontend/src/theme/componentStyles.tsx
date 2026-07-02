export const CardHoverStyles = {
  transition: "all 0.3s ease",
  cursor: "pointer",

  "&:hover": {
    bgcolor: "#1e3baf",
    transform: "scale(1.05)",
    boxShadow: 6,
    "& .card-title": {
      color: "white",
    },
    "& .card-value": {
      color: "white",
    },
    "& .card-icon": {
      transform: "scale(1.2)",
    },
  },
};
export const ChartsHoverStyles = {
  transition: "all 0.3s ease",

  "&:hover": {
    transform: "translateY(-6px)",
        boxShadow: "0px 12px 24px rgba(0,0,0,0.15)",

  },
};
