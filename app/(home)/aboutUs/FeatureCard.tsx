/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./WhyWeHere.module.css";
import { FeatureCardProps } from "./types";

export const FeatureCard: React.FC<FeatureCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
}) => {
  return (
    <div className={styles.featureCard}>
      <img
        loading="lazy"
        src={imageSrc}
        alt={imageAlt}
        className={styles.featureImage}
      />
      <div className={styles.featureContent}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
};
