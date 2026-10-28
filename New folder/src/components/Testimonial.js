import { Swiper, SwiperSlide } from "swiper/react";
import { sliderProps } from "../sliderProps";
import SectionTitle from "./SectionTitle";
const testimonialData = [
  {
    id: 1,
    avatar: "assets/img/client.jpeg",
    name: "Mohammed Iftekar Alam.",
    designation: "CEO",
    company: "IFJONA",
    comment:
      "Great progress on the IFJONA e-commerce marketplace. The work delivered so far meets my expectations and shows strong development skills.",
  },
];
const Testimonial = () => {
  return (
    <section className="section testimonial-section">
      <div className="container">
        <SectionTitle
          heading={"Client's Kind Word"}
          subHeading={"Testimonial"}
        />
        <Swiper {...sliderProps.testimonial} className="lightbox-gallery">
          {testimonialData.map((testimonial) => (
            <SwiperSlide className="feature-box-03" key={testimonial.id}>
              <div className="feature-img">
                <img src={testimonial.avatar} alt="image" />
              </div>
              <div className="feature-content">
                <div className="icons">
                  <i className="fas fa-quote-left" />
                </div>
                <p>{testimonial.comment}</p>
                <h6>{testimonial.name}</h6>
                <span>
                  {testimonial.designation} at {testimonial.company}
                </span>
              </div>
            </SwiperSlide>
          ))}
          <div className="owl-dots"></div>
        </Swiper>
      </div>
    </section>
  );
};
export default Testimonial;
