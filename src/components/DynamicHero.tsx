import { useWindowWidth } from "@/hooks/useWindowWidth";
import { getButtonSize, getDescriptionSize } from "@/utils/fontSizing";
import { Button } from "react-bootstrap";

interface DynamicHeroProps {
  insertRef: React.RefObject<HTMLDivElement>;
  bgImg: string;
  bottomElement?: React.ReactNode;
  title: string;
  description: JSX.Element | string | null;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  handleClickPrimary?: () => void;
  handleClickSecondary?: () => void;
  align?: 'left' | 'right';
}

export default function DynamicHero({ insertRef, bgImg, bottomElement, title, description, primaryButtonText, secondaryButtonText, handleClickPrimary, handleClickSecondary, align, }: DynamicHeroProps): JSX.Element {
  const windowWidth = useWindowWidth();
  
  return (
      <div ref={insertRef} className="row flex-lg-row-reverse d-flex justify-content-center align-items-center g-3 py-0 py-lg-3">
        <div className="col-11 col-xxl-8 d-flex mx-auto">
          <div className="row row-cols-2 d-flex justify-content-center align-items-center py-0 py-lg-4">
            <div className={`col-11 col-lg-6 d-flex order-2 px-4 ${align === "left" ? "order-lg-1" : "order-lg-2"}`} >
              <img src={bgImg} className="d-block rounded mx-lg-auto img-fluid" width="100%" height="auto" loading="eager" />
            </div>
            <div className={`col-12 col-sm-11 col-lg-6 text-center text-lg-start px-1 px-sm-4  pb-5 pb-lg-0 ${ align === "left" ? "order-lg-2" : "order-lg-1" }`} >
              <div className="display-5 fw-bold lh-1 mb-3">{title}</div>
              <div className={`lead ${getDescriptionSize(windowWidth)} mb-3`}>{description}</div>
              <div className="gap-2 d-flex justify-content-center justify-content-lg-start">
                {primaryButtonText && handleClickPrimary && (
                  <Button variant = "primary" size={getButtonSize(windowWidth)} className="px-4 studs-bg" onClick={() => handleClickPrimary()}>
                    {primaryButtonText}
                  </Button>
                )}
                {secondaryButtonText && handleClickSecondary && (
                  <Button variant = "outline-secondary" size={getButtonSize(windowWidth)} className="px-4" onClick={() => handleClickSecondary()}>
                    {secondaryButtonText}
                  </Button>
                )}
              </div>
              <div className="d-flex justify-content-center justify-content-lg-start">
                {bottomElement && bottomElement}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
