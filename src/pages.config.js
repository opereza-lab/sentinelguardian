import Layout from "./Layout.jsx";
import Compass from "./pages/Compass.jsx";
import DeveloperPanel from "./pages/DeveloperPanel.jsx";
import EmergencyProfile from "./pages/EmergencyProfile.jsx";
import Fire from "./pages/Fire.jsx";
import FirstAid from "./pages/FirstAid.jsx";
import Food from "./pages/Food.jsx";
import GoBackpack from "./pages/GoBackpack.jsx";
import Home from "./pages/Home.jsx";
import OfflineMaps from "./pages/OfflineMaps.jsx";
import RescueDashboard from "./pages/RescueDashboard.jsx";
import Shelters from "./pages/Shelters.jsx";
import SurvivalKnots from "./pages/SurvivalKnots.jsx";
import Threats from "./pages/Threats.jsx";
import Water from "./pages/Water.jsx";

export const pagesConfig = {
  mainPage: "Home",
  Layout,
  Pages: {
    Home,
    Threats,
    Shelters,
    Water,
    Food,
    FirstAid,
    SurvivalKnots,
    GoBackpack,
    Compass,
    Fire,
    OfflineMaps,
    EmergencyProfile,
    RescueDashboard,
    DeveloperPanel,
  },
};
