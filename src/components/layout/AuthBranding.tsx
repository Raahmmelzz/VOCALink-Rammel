import hero1 from "../../assets/images/hero-1.jpg";
import hero2 from "../../assets/images/hero-2.jpg";
import hero3 from "../../assets/images/hero-3.jpg";
import hero4 from "../../assets/images/hero-4.jpg";

// 1. Define the interface for your props
interface AuthBrandingProps {
  description: string;
}

// 2. Pass the props to the function and use the interface
export default function AuthBranding({ description }: AuthBrandingProps) {
  return (
    <>
      <div className="polaroids">
        <img className="polaroid p1" src={hero1} alt="hero 1" />
        <img className="polaroid p2" src={hero2} alt="hero 2" />
        <img className="polaroid p3" src={hero3} alt="hero 3" />
        <img className="polaroid p4" src={hero4} alt="hero 4" />
      </div>

      <div className="left-center">
        <div className="branding">
          <div className="logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" fill="white" />
              <circle
                cx="12"
                cy="12"
                r="7"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                opacity="0.5"
              />
            </svg>
          </div>
          <h1 className="brand-title">VocaLink</h1>
          {/* 3. Use the dynamic description here */}
          <p className="brand-desc">{description}</p>
        </div>
      </div>
    </>
  );
}