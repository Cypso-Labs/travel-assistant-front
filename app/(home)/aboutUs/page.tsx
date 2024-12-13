/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./WhyWeHere.module.css";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/92c37aa774c8fb43420c0c0775ee6502e45bebde495e365b3059565e9aeaae59?placeholderIfAbsent=true&apiKey=2bffdf0374bd4d8684a4bf944b4d21b9",
    imageAlt: "Personalized Trip Planning Icon",
    title: "Personalized Trip Planning",
    description:
      "Based on your preferences and travel style, we create a customized itinerary just for you. From must-see attractions to off-the-beaten-path gems, we ensure your trip is filled with experiences that match your interests.",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7458dd945ce71b400c366399a086be323c6756dfeb9d00780546931b35431784?placeholderIfAbsent=true&apiKey=2bffdf0374bd4d8684a4bf944b4d21b9",
    imageAlt: "AI-Powered Landmark Identification Icon",
    title: "AI-Powered Landmark Identification",
    description:
      "Use our AI feature to learn about the landmarks around you. Whether you're visiting a historical site or wandering through nature, our AI system provides real-time information about the places you encounter, enhancing your understanding and experience.",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/67f3ca5dbccee151bbe62dd9be115149fc12e89c2b7ecef9a15ad2004fdb0bc1?placeholderIfAbsent=true&apiKey=2bffdf0374bd4d8684a4bf944b4d21b9",
    imageAlt: "Local Recipes Icon",
    title: "Local Recipes",
    description:
      "Discover the authentic flavors of Sri Lanka through our curated collection of recipes. From spicy curries to sweet delicacies, each dish is crafted to bring the island's vibrant culinary heritage to your table. Explore step-by-step guides and cultural insights to create unforgettable meals inspired by Sri Lanka's rich traditions",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/97bfe944dc589eb69e21f9b78ac5043772f4de090e3a451043d54acf1f234b9f?placeholderIfAbsent=true&apiKey=2bffdf0374bd4d8684a4bf944b4d21b9",
    imageAlt: "Nearby Event Finder Icon",
    title: "Note for Nearby Event Finder",
    description:
      "Stay connected to the pulse of your surroundings with our Nearby Event Finder. Discover cultural festivals, local celebrations, and exciting activities happening close to you. Whether you're seeking entertainment, community gatherings, or unique experiences, our tool makes it easy to find events that match your interests and location.",
  },
];

 const aboutUs: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Why We re Here</h1>
      <p className={styles.introduction}>
        Welcome to your ultimate travel companion for discovering the wonders of
        Sri Lanka! Our mission is to make your journey smooth, exciting, and
        culturally enriching by providing all the tools you need to plan an
        unforgettable trip. Whether you re a first-time visitor or a seasoned
        traveler, our app ensures that your experience is personalized, fun, and
        informative. We understand that planning a trip can be overwhelming, so
        we ve created an intuitive travel assistant that simplifies the process
        and offers tailored recommendations to enhance your journey. From
        budgeting tips to discovering local flavors, immersive VR experiences,
        and AI-guided landmark identification, our app takes care of the
        details, leaving you with more time to enjoy what matters most—your
        adventure! Our Key Features Include:
      </p>

      <div className={styles.featuresContainer}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <p className={styles.conclusion}>
        Our app is available on both mobile and web platforms, so you can plan
        your trip anytime, anywhere. We are committed to helping you explore Sri
        Lanka in a way that is seamless, enjoyable, and culturally enriching.
        Whether you re planning a short getaway or an extended vacation, we re
        here to make sure your travel experience is one to remember.
      </p>

      <p className={styles.callToAction}>
        Start your <span className={styles.highlight}>journey</span> with us
        today and <span className={styles.highlight}>experience</span> the best
        of Sri Lanka with <span className={styles.highlight}>ease</span>,{" "}
        <span className={styles.highlight}>fun</span>, and{" "}
        <span className={styles.highlight}>knowledge</span>!
        <img
          src="/images/db74cd10-036e-4643-9fc6-90f41fff34ff.png"
          alt="Decorative Illustration"
          className={styles.inlineImage}
        />
      </p>
    </div>
  );
};
export default aboutUs;
