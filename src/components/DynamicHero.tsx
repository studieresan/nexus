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

export default function DynamicHero({
  insertRef,
  bgImg,
  bottomElement,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  handleClickPrimary,
  handleClickSecondary,
  align,
}: DynamicHeroProps): JSX.Element {
  return (
    <div ref={insertRef} className="container col-xxl-8 px-4 py-3 py-lg-5">
      <div className="row flex-lg-row-reverse align-items-center g-5">
        <div className={`col-12 col-sm-12 col-lg-6 order-2 ${align === "left" ? "order-lg-2" : "order-lg-1"}`} >
          <img
            src={bgImg}
            className="d-block rounded mx-lg-auto img-fluid"
            width="100%"
            height="auto"
            loading="eager"
          />
        </div>
        <div className={`col-lg-6 text-center text-lg-start ${ align === "left" ? "order-lg-1" : "order-lg-2" }`} >
          <h1 className="display-5 fw-bold lh-1 mb-3 ">{title}</h1>
          <p className="lead">{description}</p>
          <div className="gap-2 d-flex justify-content-center justify-content-lg-start">
            {primaryButtonText && handleClickPrimary && (
              <Button variant = "primary" size="lg" className="px-4 studs-bg" onClick={() => handleClickPrimary()}>
                {primaryButtonText}
              </Button>
            )}
            {secondaryButtonText && handleClickSecondary && (
              <Button variant = "outline-secondary" size="lg" className="px-4" onClick={() => handleClickSecondary()}>
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
  );
}
