import HomeIcon from "@mui/icons-material/Home";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import ScienceTwoToneIcon from "@mui/icons-material/ScienceTwoTone";
import MedicationTwoToneIcon from "@mui/icons-material/MedicationTwoTone";
import MedicalInformationTwoToneIcon from "@mui/icons-material/MedicalInformationTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

export const SideBarMenu = [
  {
    name: "Find Doctor",
    path: "/search-doctor",
    icon: <SearchTwoToneIcon />,
  },
  {
    name: "Online Consultancy",
    path: "/Online-consultancy",
    icon: <MedicalInformationTwoToneIcon />,
  },
  {
    name: "Lab Test",
    path: "/lab-test",
    icon: <ScienceTwoToneIcon />,
  },
  {
    name: "Read health articles",
    path: "/read-health-article",
    icon: <ArticleTwoToneIcon />,
  },
  {
    name: "Read about medicines",
    path: "/read-about-medicine",
    icon: <MedicationTwoToneIcon />,
  },
  {
    name: "Data security",
    path: "/about-data-security",
    icon: null,
  },
  {
    name: "Help",
    path: "/help",
    icon: null,
  },
  {
    name: "Contact Us",
    path: "/contact",
    icon: null,
  },
];
