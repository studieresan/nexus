import { Button, Nav, Navbar } from "react-bootstrap";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import LanguageDropDown from "../LanguageDropdown/index.jsx";
import studsLogo from "@/assets/images/logo2024h.png";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { HandleInstructionsContext } from "@/context";
import { AppData } from "@/models/AppData";
import Contact from "@/components/Contact.jsx";
import { ContactElement } from "@/models/Contact.js";
import { AiOutlineHome } from "react-icons/ai";
import { useWindowWidth } from "@/hooks/useWindowWidth.js";

interface HeaderProps {
  appData: AppData;
  setAppData: (appData: AppData) => void;
}

const loginOrOut = (
  loggedIn: boolean,
  t: any,
  navigateTo: any,
  logout: any
) => {
  if (loggedIn) {
    return (
      <Button className="studs-navbar" onClick={() => logout()}>
        <div className="d-flex gap-1">
          {t("logout")}
          <div className="d-flex align-items-center">
            <BiLogOut size={20} />
          </div>
        </div>
      </Button>
    );
  } else {
    return (
      <Button
        className="studs-navbar"
        onClick={() => navigateTo("/auth/login")}
      >
        <div className="d-flex gap-1">
          {t("login")}
          <div className="d-flex align-items-center">
            <BiLogIn size={20} />
          </div>
        </div>
      </Button>
    );
  }
};

export default function Header({
  appData,
  setAppData,
}: HeaderProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigateTo = useNavigate();
  const handleInstructions = useContext(HandleInstructionsContext);
  const windowWidth = useWindowWidth();
  const logoDivWidth = "100%";

  // Add this state to manage the collapsed state of the navbar
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  const handleNavItemClick = (path: string) => {
    navigateTo(path);
    setNavbarCollapsed(true); // Collapse the navbar after clicking on an item
  };
  async function logout() {
    await handleInstructions("logoutUser");
  }

  function userProfile() {
    const user = (appData.users || []).find(
      (user) => user.id === appData.userDetails?.id
    );
    if (!user) {
      return null;
    }
    const element: ContactElement = {
      id: user.id,
      picture: user.info.picture,
      name: `${user.firstName} ${user.lastName}`,
      // phone: e.info.phone,
      email: user.info.email,
      role: t(user.info.role),
      navbar: true,
      lg: true,
    };

    return (
      <div className="p-2">
        <Contact element={element} />
      </div>
    );
  }

  return (
    <Navbar
      style={{
        background:
          "linear-gradient(to top, #390099, rgba(0,0,0,0.9) 10px, #F5E7E0 10px, #F5E7E0)",
        padding: "10px 0px 20px 0px",
      }}
      variant="light"
      className="px-3"
      expand="md"
    >
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setNavbarCollapsed(!navbarCollapsed)} // Toggle the collapsed state when the button is clicked
      />
      <Navbar.Collapse id="basic-navbar-nav" in={!navbarCollapsed}>
        <div className="row w-100">
          {/* Left side items */}
          <div className="col-5 d-flex justify-content-start">
            <Nav className="align-items-center gap-2">
              <Button
                className="studs-navbar"
                onClick={() => handleNavItemClick("/about")}
              >
                {t("about.name")}
              </Button>
              <Button
                className="studs-navbar"
                onClick={() => handleNavItemClick("/events")}
              >
                {t("events.name")}
              </Button>
              <Button
                className="studs-navbar"
                onClick={() => handleNavItemClick("/groups")}
              >
                {t("groups.name")}
              </Button>
              <Button
                className="studs-navbar"
                onClick={() => handleNavItemClick("/contact")}
              >
                {t("contact.name")}
              </Button>
            </Nav>
          </div>

          {/* Center logo */}
          <div className="col-2 d-flex justify-content-center">
            <Button
              style={{
                margin: "0px",
                padding: "0px",
              }}
              className="studs-navbar"
              onClick={() => handleNavItemClick("/")}
            >
              <img
                alt="Logo"
                src={studsLogo}
                width="150px"
                height="100%"
                className="d-none d-lg-inline-block align-top"
              />
              <AiOutlineHome size={30} className="d-inline-block d-lg-none" />
            </Button>
          </div>

          {/* Right side items */}
          <div className="col-5 d-flex justify-content-end">
            <Nav className="align-items-center gap-2">
              <LanguageDropDown />
              <Button
                className="studs-navbar"
                onClick={() => handleNavItemClick("/blog")}
              >
                {t("blog.name")}
              </Button>
              {loginOrOut(appData.loggedIn, t, navigateTo, logout)}
              {userProfile()}
            </Nav>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
