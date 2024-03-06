import { ThreeCircles } from "react-loader-spinner";
import "./Loaders.css"

export const loadingSpinners = (
  <ThreeCircles
    visible={true}
    height="50"
    width="50"
    color="#4fa94d"
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperclassName=""
  />
);

export const loadingCard = (
  <div className="card">
    <div className="loader-stripes">
      <span className="loader-stripe" style={{ width: "104px" }}></span>
      <span
        className="loader-stripe"
        style={{ width: "139px", transform: "translate(0, 30px)" }}
      ></span>
      <span
        className="loader-stripe"
        style={{ width: "93px", transform: "translate(180px, 15px)" }}
      ></span>
      <span
        className="loader-stripe"
        style={{ width: "93px", transform: "translate(0, 30px)" }}
      ></span>
      <span
        className="loader-stripe"
        style={{ width: "70px", transform: "translate(180px, 20px)" }}
      ></span>
    </div>
    <div className="loader-stripes">
      <span className="loader-stripe" style={{ width: "104px" }}></span>
      <span
        className="loader-stripe"
        style={{ width: "139px", transform: "translate(0, 30px)" }}
      ></span>
      <span
        className="loader-stripe"
        style={{ width: "93px", transform: "translate(180px, 15px)" }}
      ></span>
      <span
        className="loader-stripe"
        style={{ width: "93px", transform: "translate(0, 30px)" }}
      ></span>
      <span
        className="loader-stripe"
        style={{ width: "70px", transform: "translate(180px, 20px)" }}
      ></span>
    </div>
  </div>
);
