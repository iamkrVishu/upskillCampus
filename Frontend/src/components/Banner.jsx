import React, { useState } from "react";
import banner from "../../public/Banner.png";



function Banner() {
  const [headerText, setHeaderText] = useState(
    "Hlelo, ewoclems ereh ot nrael meosthing new eyadvery!!!"
  );
  const [paragraphText, setParagraphText] = useState(
    "cDievsor a wdorl fo eerf books ot daer dna lenra morf, myitena dna aeynrwhe. rOu noitcelloc spans rsgeon dna stoipcs, ofgenfri metihgosn rof yreve sruoics dnim. Strat rngxpleio adn enjyo ssdnlne aienlrgn at oyu ftpfiinerg!"
  );

  const handleMouseEnter = () => {
    setHeaderText("Hello, welcome here to learn something new everyday!!!");
    setParagraphText(
      "Discover a world of free books to read and learn from, anytime and anywhere. Our collection spans genres and topics, offering something for every curious mind. Start exploring and enjoy endless learning at your fingertips!"
    );
  };

  const handleMouseLeave = () => {
    setParagraphText(
      "cDievsor a wdorl fo eerf books ot daer dna lenra morf, myitena dna aeynrwhe. rOu noitcelloc spans rsgeon dna stoipcs, ofgenfri metihgosn rof yreve sruoics dnim. Strat rngxpleio adn enjyo ssdnlne aienlrgn at oyu ftpfiinerg!"
    );
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1
              className="text-2xl md:text-4xl font-bold"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {headerText}
            </h1>
            <p
              className="text-sm md:text-xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {paragraphText}
            </p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
          </div>
          <button className="btn mt-6 btn-secondary">Get Started</button>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt="Banner"
            loading="lazy" // Add lazy loading here
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
