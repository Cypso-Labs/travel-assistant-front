"use client";

import React, { useEffect } from "react";
export default function AboutUs() {
  useEffect(() => {
    // Dynamically add the Google Fonts stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Rubik:wght@500;600&display=swap";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      style={{
        width: "1280px",
        height: "1500px",
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
        margin: "0 auto",
      }}
      className="main-container"
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          position: "relative",
          marginTop: "90px",
          marginRight: "300px",
          marginLeft: "750px",
          marginBottom: "0",
        }}
        className="image-container"
      >
        <div
          style={{
            width: "123.96%",
            height: "116.89%",
            backgroundPosition: "center",
            backgroundImage:
              "url(/assets/images/9eb92827-8cf9-4b65-a6fe-e5ace0afa12a.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: "-12.23%",
            left: "-3.56%",
            overflow: "hidden",
          }}
        />
        <div
          style={{
            width: "262px",
            height: "483px",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "4",
          }}
        >
          <div
            style={{
              width: "262px",
              height: "246px",
              backgroundPosition: "center",
              backgroundImage:
                "url(/assets/images/2ae90ad8a77640b1c7b3e8c83b2c31e5c36cf997.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "10px",
              position: "relative",
              zIndex: "4",
              margin: "0 0 0 0",
            }}
          />
          <div
            style={{
              width: "223px",
              height: "215px",
              backgroundPosition: "center",
              backgroundImage:
                "url(/assets/images/fffec4ff-2208-4807-a346-a30efced972e.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "10px",
              position: "relative",
              zIndex: "2",
              margin: "22px 0 0 39px",
            }}
          />
        </div>
        <div
          style={{
            width: "227px",
            height: "464px",
            position: "absolute",
            top: "39px",
            left: "278px",
            zIndex: "3",
          }}
        >
          <div
            style={{
              width: "227px",
              height: "167px",
              backgroundPosition: "center",
              backgroundImage:
                "url(/assets/images/8e1ebda3d00e4db16cd07bb88212abd646ebe630.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "10px",
              position: "relative",
              zIndex: "3",
              margin: "0 0 0 0",
            }}
          />
          <div
            style={{
              width: "226px",
              height: "276px",
              backgroundPosition: "center",
              backgroundImage:
                "url(/assets/images/2ae9471775c22030b5068b78f70b57dc981cdfb8.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "10px",
              position: "relative",
              zIndex: "1",
              margin: "21px 0 0 1px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          width: "97.81%",
          height: "83.27%",
          fontSize: "0px",
          position: "absolute",
          top: "2.53%",
          left: "0.7%",
          zIndex: "28",
        }}
      >
        <span
          style={{
            display: "block",
            height: "25px",
            fontFamily:
              "'Rubik', 'Source Code Pro', var(--default-font-family)",
            fontSize: "40px",
            fontWeight: "600",
            lineHeight: "45px",
            color: "#333333",
            position: "relative",
            textAlign: "left",
            whiteSpace: "nowrap",
            margin: "45px 0 0 0", // Added margin to create spacing
          }}
        >
          Why We’re Here
        </span>

        <div
          style={{
            width: "84px",
            height: "82px",
            backgroundPosition: "center",
            backgroundImage:
              "url(/assets/images/9e77b572-e703-4482-a311-92aabaf6a9fd.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: "510px",
            left: "65px",
            zIndex: "5",
          }}
        />
        <span
          style={{
            display: "flex",
            height: "24px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontFamily: "Rubik, var(--default-font-family)",
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "23.7px",
            color: "#000000",
            position: "absolute",
            top: "510px",
            left: "157px",
            textAlign: "left",
            whiteSpace: "nowrap",
            zIndex: "3",
          }}
        >
          Personalized Trip Planning
        </span>
        <div
          style={{
            width: "34.481px",
            height: "40.494px",
            backgroundPosition: "center",
            backgroundImage:
              "url(/assets/images/5b28b2de-2625-4350-860e-4808a18ef432.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: "529.753px",
            left: "92.481px",
            zIndex: "7",
          }}
        />
        <span
          style={{
            display: "flex",
            width: "805px",
            height: "45px",
            alignItems: "flex-start",
            fontFamily:
              "'Rubik', 'Source Code Pro', var(--default-font-family)",
            fontSize: "12px",
            fontWeight: "600",
            lineHeight: "15.084px",
            color: "#000000",
            position: "absolute",
            top: "536px",
            left: "156px",
            textAlign: "justified",
            zIndex: "8",
          }}
        >
          Based on your preferences and travel style, we create a customized
          itinerary just for you. From must-see attractions to
          off-the-beaten-path gems, we ensure your trip is filled with
          experiences that match your interests.
        </span>
        <span
          style={{
            display: "flex",
            height: "24px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontFamily: "Rubik, var(--default-font-family)",
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "23.7px",
            color: "#000000",
            position: "absolute",
            top: "645px",
            left: "249px",
            textAlign: "left",
            whiteSpace: "nowrap",
            zIndex: "10",
          }}
        >
          AI-Powered Landmark Identification:
        </span>
        <div
          style={{
            width: "87.596px",
            height: "82.683px",
            backgroundPosition: "center",
            backgroundImage:
              "url(/assets/images/0737e549-8796-4224-9730-124c48668a89.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: "647px",
            left: "156px",
            zIndex: "15",
          }}
        />
        <div
          style={{
            width: "44px",
            height: "49px",
            position: "absolute",
            top: "663px",
            left: "178px",
            overflow: "hidden",
            zIndex: "13",
          }}
        >
          <div
            style={{
              width: "36.667px",
              height: "40.833px",
              backgroundPosition: "center",
              backgroundImage:
                "url(/assets/images/3525bcc4-7976-4aad-a2b1-0ef757f1941a.png)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              position: "relative",
              zIndex: "14",
              margin: "4.083px 0 0 3.667px",
            }}
          />
        </div>
        <span
          style={{
            display: "flex",
            width: "928px",
            height: "18px",
            alignItems: "flex-start",
            fontFamily: "Source Code Pro, var(--default-font-family)",
            fontSize: "12px",
            fontWeight: "600",
            lineHeight: "15.084px",
            color: "#000000",
            position: "absolute",
            top: "675px",
            left: "249px",
            textAlign: "justified",
            whiteSpace: "nowrap",
            zIndex: "11",
          }}
        >
          Use our AI feature to learn about the landmarks around you. Whether
          you're visiting a historical site or wandering through nature, our AI
          system provides real-time information about the places you encounter,
          enhancing your understanding and experience.
        </span>
        <div
          style={{
            width: "6.71%",
            height: "6.57%",
            backgroundPosition: "center",
            backgroundImage:
              "url(/assets/images/8364abf3-31ef-4288-a39a-f21465c50ea9.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: "61.49%",
            left: "8.07%",
            zIndex: "21",
          }}
        />
        <span
          style={{
            display: "flex",
            height: "24px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontFamily: "Rubik, var(--default-font-family)",
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "23.7px",
            color: "#000000",
            position: "absolute",
            top: "774px",
            left: "188px",
            textAlign: "left",
            whiteSpace: "nowrap",
            zIndex: "19",
          }}
        >
          Local Recipes
        </span>
        <span
          style={{
            display: "flex",
            width: "897px",
            height: "45px",
            alignItems: "flex-start",
            fontFamily: "Source Code Pro, var(--default-font-family)",
            fontSize: "12px",
            fontWeight: "600",
            lineHeight: "15.084px",
            color: "#000000",
            position: "absolute",
            top: "798px",
            left: "192px",
            textAlign: "justified",
            zIndex: "20",
          }}
        >
          Discover the authentic flavors of Sri Lanka through our curated
          collection of recipes. From spicy curries to sweet delicacies, each
          dish is crafted to bring the island's vibrant culinary heritage to
          your table. Explore step-by-step guides and cultural insights to
          create unforgettable meals inspired by Sri Lanka’s rich traditions
        </span>
        <span
          style={{
            display: "flex",
            height: "24px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontFamily: "Rubik, var(--default-font-family)",
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "23.7px",
            color: "#000000",
            position: "absolute",
            top: "895px",
            left: "158px",
            textAlign: "left",
            whiteSpace: "nowrap",
            zIndex: "24",
          }}
        >
          Note for Nearby Event Finder
        </span>
        <div
          style={{
            width: "6.71%",
            height: "6.57%",
            backgroundPosition: "center",
            backgroundImage:
              "url(/assets/images/173bf8c4-6707-4167-86a5-94b7b3ec7b8c.png)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: "71.98%",
            left: "5.19%",
            zIndex: "23",
          }}
        />
        <span
          style={{
            display: "flex",
            width: "910px",
            height: "45px",
            alignItems: "flex-start",
            fontFamily: "Source Code Pro, var(--default-font-family)",
            fontSize: "12px",
            fontWeight: "600",
            lineHeight: "15.084px",
            color: "#000000",
            position: "absolute",
            top: "925px",
            left: "158px",
            textAlign: "justified",
            zIndex: "25",
          }}
        >
          Stay connected to the pulse of your surroundings with our Nearby Event
          Finder. Discover cultural festivals, local celebrations, and exciting
          activities happening close to you. Whether you’re seeking
          entertainment, community gatherings, or unique experiences, our tool
          makes it easy to find events that match your interests and location.
        </span>
        <div
          style={{
            width: "532px",
            height: "569px",
            backgroundPosition: "center",
            backgroundImage:
              "url(/assets/images/db74cd10-036e-4643-9fc6-90f41fff34ff.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: "1024px",
            left: "720px",
            overflow: "hidden",
            zIndex: "28",
          }}
        />
        <span
          style={{
            display: "flex",
            width: "1205px",
            height: "63px",
            alignItems: "flex-start",
            fontFamily: "Source Code Pro, var(--default-font-family)",
            fontSize: "17px",
            fontWeight: "500",
            lineHeight: "21.369px",
            color: "#000000",
            position: "absolute",
            top: "1053px",
            left: "24px",
            textAlign: "justified",
            zIndex: "26",
          }}
        >
          Our app is available on both mobile and web platforms, so you can plan
          your trip anytime, anywhere. We are committed to helping you explore
          Sri Lanka in a way that is seamless, enjoyable, and culturally
          enriching. Whether you're planning a short getaway or an extended
          vacation, we’re here to make sure your travel experience is one to
          remember.
        </span>
        <div
          style={{
            width: "1090px",
            height: "60px",
            fontFamily: "Source Code Pro, var(--default-font-family)",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "30.168px",
            position: "absolute",
            top: "1189px",
            left: "68px",
            textAlign: "center",
            zIndex: "27",
          }}
        >
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#000000",
              position: "relative",
              textAlign: "center",
            }}
          >
            Start your
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#63ab45",
              position: "relative",
              textAlign: "center",
            }}
          >
            journey
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#000000",
              position: "relative",
              textAlign: "center",
            }}
          >
            with us today and
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#63ab45",
              position: "relative",
              textAlign: "center",
            }}
          >
            experience
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#000000",
              position: "relative",
              textAlign: "center",
            }}
          >
            the best of Sri Lanka with
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#63ab45",
              position: "relative",
              textAlign: "center",
            }}
          >
            ease
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#000000",
              position: "relative",
              textAlign: "center",
            }}
          >
            ,
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#63ab45",
              position: "relative",
              textAlign: "center",
            }}
          >
            fun
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#000000",
              position: "relative",
              textAlign: "center",
            }}
          >
            , and
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#63ab45",
              position: "relative",
              textAlign: "center",
            }}
          >
            knowledge
          </span>
          <span
            style={{
              fontFamily: "Source Code Pro, var(--default-font-family)",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "30.168px",
              color: "#000000",
              position: "relative",
              textAlign: "center",
            }}
          >
            !
          </span>
        </div>
      </div>
      <span
        style={{
          display: "flex",
          width: "665px",
          height: "360px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          fontFamily: "Source Code Pro, var(--default-font-family)",
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "22.626px",
          color: "rgba(0, 0, 0, 0.85)",
          position: "absolute",
          top: "200px",
          left: "33px",
          textAlign: "left",
          zIndex: "1",
        }}
      >
        <br /> Welcome to your ultimate travel companion for discovering the
        wonders of Sri Lanka! Our mission is to make your journey smooth,
        exciting, and culturally enriching by providing all the tools you need
        to plan an unforgettable trip. Whether you're a first-time visitor or a
        seasoned traveler, our app ensures that your experience is personalized,
        fun, and informative.
        <br />
        We understand that planning a trip can be overwhelming, so we've created
        an intuitive travel assistant that simplifies the process and offers
        tailored recommendations to enhance your journey. From budgeting tips to
        discovering local flavors, immersive VR experiences, and AI-guided
        landmark identification, our app takes care of the details, leaving you
        with more time to enjoy what matters most—your adventure!
        <br />
        Our Key Features Include:
      </span>
    </div>
  );
}
