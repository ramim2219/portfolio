import SectionTitle from "./SectionTitle";

const skillsData = [
  { id: 1, name: "Laravel", icon: "fab fa-laravel" },
  { id: 2, name: "React JS", icon: "fab fa-react" },
  { id: 3, name: "PHP", icon: "fab fa-php" },
  { id: 4, name: "MySQL", icon: "fas fa-database" },
  { id: 5, name: "C++", icon: "fas fa-code" },
  { id: 6, name: "Python", icon: "fab fa-python" },
  { id: 7, name: "JavaScript", icon: "fab fa-js-square" },
  { id: 8, name: "WordPress", icon: "fab fa-wordpress" },
];

const experiencesData = [
  {
    id: 1,
    date: "Dec 2025 - Present",
    designation: "Software Developer Trainee",
    company: "Premier University , Chittagong",
  },
  {
    id: 2,
    date: "July 2024 - August 2025",
    designation: "Competitive Programming Trainer",
    company: "PUC CSE CLUB",
  },
];
const Skill = () => {
  return (
    <section id="skill" className="section experience-section bg-gray">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <SectionTitle
              heading={"Skills and  Experience"}
              subHeading={"Experience"}
              text={
                "I design and develop services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores."
              }
            />

            <div className="skill-box">
              <h3>My Skills</h3>
              <div className="row g-3">
                {skillsData.map((skill) => (
                  <div className="col-6 col-md-4 col-lg-6" key={skill.id}>
                    <div className="feature-box-02">
                      <div className="icon">
                        <i className={skill.icon} />
                      </div>
                      <h6>{skill.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-5 ms-auto pt-5 pt-lg-0">
            <div className="experience-box">
              <h3>Experience</h3>
              <ul>
                {experiencesData.map((experience) => (
                  <li key={experience.id}>
                    <h6>{experience.date}</h6>
                    <div className="eb-right">
                      <h5>{experience.designation}</h5>
                      <span>{experience.company}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="experience-user">
              <span className="eu-1">
                <img
                  src="assets/img/effect-3.svg"
                  className="svg"
                  alt="image"
                />
              </span>
              <span className="eu-2">
                <img
                  src="assets/img/effect-4.svg"
                  className="svg"
                  alt="image"
                />
              </span>
              <div className="avatar">
                <img src="assets/img/avatar.png" alt="image" />
              </div>
              <a className="px-btn px-btn-theme2" href="#contactus">
                Hire me{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Skill;
