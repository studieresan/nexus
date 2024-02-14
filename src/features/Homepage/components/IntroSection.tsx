import introBg from "@/assets/images/intro.png";
import logo2024 from "@/assets/images/logo2024.png";
import React, { useState, useEffect, CSSProperties, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AppData } from "@/models/AppData";
import { OverlayGroup } from "../models/OverlayGroup";
import { ImagesLoaded } from "../models/ImagesLoaded";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Contact from "@/components/Contact.jsx";
import { ContactElement } from "@/models/Contact";

const groupIcons = {
  project: AiOutlineFundProjectionScreen,
  events: RiTeamFill,
  contact: FiSend,
};

const IconWrapper = ({
  icon,
  iconSize,
}: {
  icon:
    | typeof AiOutlineFundProjectionScreen
    | typeof RiTeamFill
    | typeof FiSend;
  iconSize: number;
}) => (
  <div className="mb-1" style={{ width: "auto", height: "auto" }}>
    {React.createElement(icon, {
      size: iconSize,
      className: "text-egg rounded",
    })}
  </div>
);

const loadingSpinner = (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <Spinner
      variant="primary"
      animation="grow"
      role="status"
      style={{ width: 75, height: 75 }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

function OverlayGroupList({
  overlayGroups,
  windowWidth,
}: {
  overlayGroups: OverlayGroup[];
  windowWidth: number;
}) {
  return (
    <>
      {overlayGroups.map((group, index) => (
        <div key={index} className="col">
          <div
            className={` ${
              index == 0
                ? "me-auto"
                : index == overlayGroups.length - 1
                ? "ms-auto"
                : "mx-auto"
            }`}
            style={{ width: "90%" }}
          >
            <div
              className={`d-flex align-items-center gap-2 fw-bold fs-4`}
              style={{ whiteSpace: "nowrap" }}
            >
              <IconWrapper icon={groupIcons[group.name]} iconSize={40} />
              {group.title}
            </div>
            <div className={`mb-3 fs-5`}>{group.description}</div>
            <Button
              className="studs-bg"
              size="lg"
              onClick={() => {
                if (group.ref && group.ref.current) {
                  group.ref.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            >
              {group.button}
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
interface IntroSectionProps {
  appData: AppData;
  overlayGroups: OverlayGroup[];
  imagesLoaded: ImagesLoaded;
  handleImageLoaded: (section: string) => void;
}

export function IntroSection({
  appData,
  overlayGroups,
  imagesLoaded,
  handleImageLoaded,
}: IntroSectionProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const windowWidth = useWindowWidth();
  const bottomRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (bottomRef.current) {
  //     setTimeout(() => {
  //       if (bottomRef.current) {
  //         bottomRef.current.scrollIntoView({
  //           behavior: 'smooth',
  //           block: 'end',
  //         });
  //       }
  //     }, 500); // 500ms delay before scrolling
  //   }
  // }, [i18n.language]);

  const titleWrap = windowWidth < 992 ? "normal" : "pre-line";

  const titleStyle: CSSProperties = {
    fontWeight: 600,
    whiteSpace: titleWrap,
  };

  return (
    <div
      ref={bottomRef}
      className="row row-cols-1 g-0 bg-dark pb-5"
      style={{ position: "relative" }}
    >
      <div
        className="col-12 w-100 position-relative"
        style={{ minHeight: "200px" }}
      >
        <div
          className="image-container d-none d-lg-flex justify-content-end"
          style={{ marginRight: -100 }}
        >
          <img
            src={introBg}
            style={{
              top: 0,
              right: 0,
              width: "75%",
              height: "100%",
              objectFit: "cover",
              filter: "",
            }}
            onLoad={() => handleImageLoaded("intro")}
          />
        </div>
        <div
          className="text-container col-10  position-absolute start-50 translate-middle-x"
          style={{ top: "10%" }}
        >
          <div className="col-12">
            <div className="row row-cols-lg-1 text-center text-lg-start  d-flex justify-content-center justify-content-xxl-start">
              <div
                className="d-block d-lg-none p-2"
                style={{ fontWeight: 200 }}
              >
                <img
                  src={logo2024}
                  style={{ width: "300px" }}
                  alt="Studs 2024 Logo"
                />
              </div>
              <div
                className="d-flex fs-1 text-egg justify-content-center justify-content-lg-start"
                style={titleStyle}
              >
                {t("homepage.intro")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 bg-dark">&nbsp;</div>
      <div className="col-10 d-none d-lg-block text-egg mx-auto mt-3">
        <div className="row row-cols-3">
          {overlayGroups && (
            <OverlayGroupList
              overlayGroups={overlayGroups}
              windowWidth={windowWidth}
            />
          )}
        </div>
      </div>
      <div
        className={
          (windowWidth >= 992 ? "position-absolute" : "position-relative") +
          " p-2 rounded-3"
        }
        id="contact-sales-call-to-action"
        style={{
          backgroundColor: "rgba(0,0,0,0.0)",
          left: windowWidth >= 992 ? "1%" : "0",
          top: windowWidth >= 992 ? "35%" : "0",
          width: "500px",
          margin: windowWidth >= 992 ? "0" : "0 auto",
          marginTop: windowWidth >= 992 ? "0" : "50px",
        }}
      >
      <div className="text-egg text-center fs-2"
           style={{fontWeight: 600}}
      >
          {t("homepage.callToAction.text")}
      </div>
      <div className="text-egg text-center fs-2"
           style={{fontWeight: 600}}
      >
          {t("homepage.callToAction.button")}
          <a
            href="mailto:sales@studs.se"
            className="text-egg  text-decoration-none"
            rel="noopener noreferrer"
            target="_blank"
          > sales@studs.se</a>
      </div>
      </div>
    </div>
  );
}
