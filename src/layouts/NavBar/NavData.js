import {
  Translate,
  QueuePlayNextOutlined,
  ReceiptOutlined,
  ExpandLess,
  ExpandMoreOutlined,
  PeopleAltOutlined,
  PostAddOutlined,
  FlagOutlined,
  DashboardOutlined,
  PlaylistAddCheck,
  FormatListBulleted,
  FileCopyOutlined,
  SchoolOutlinedIcon,
  SchoolOutlined,
  PieChart
} from "@material-ui/icons";

export const navData = [
  {
    icon: <PieChart />,
    title: "Dashboard",
    to: "dashboard",
    id: 2,
    isActive: false,
  },
  {
    icon: <ReceiptOutlined />,
    title: "Farmer Survey",
    to: "/app/farmer_survey",
    id: 2,
    isActive: false,
  },
  {
    icon: <FlagOutlined />,
    title: "Loan",
    to: "/app/loan",
    id: 3,
    isActive: false,
  },
  {
    icon: <PostAddOutlined />,
    title: "Purchase",
    to: "/app/purchase",
    id: 5,
    isActive: false,
  },
];
