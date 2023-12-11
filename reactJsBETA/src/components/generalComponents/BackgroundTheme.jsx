import { useCookies } from "react-cookie";
import constants from "../../json/constants.json";

const BackgroundTheme = () => {
  const [cookies] = useCookies();
  const bgStyle = {
    backgroundImage: `url(${cookies[constants.COOKIES.THEMECOOKIES]})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    backgroundSize: "cover",
    height: "100%",
    left: 0,
    position: "fixed",
    top: 0,
    width: "100%",
    willChange: "transform",
    zIndex: "-1",
  };
  return <div style={bgStyle}></div>;
};

export default BackgroundTheme;
