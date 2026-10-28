'use client';

import { motion } from "framer-motion";

const SectionTitle = ({ heading, subHeading, text }) => {
  return (
    <motion.div
      className="row section-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="col-lg-6">
        <h6>
          <span>{subHeading}</span>
        </h6>
        <h3>
          <span>{heading}</span>
        </h3>
        {text && <p>{text}</p>}
      </div>
    </motion.div>
  );
};
export default SectionTitle;
