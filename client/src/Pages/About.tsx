import { Link } from "react-router-dom";
import s from "../Styles/About.module.css";

function About() {
  return (
    <div className={s.pageContainer}>
      <div className={s.pageTitle}>About</div>
      <div className={s.pageContents}>
        <div className={s.sectionTitle}>Overview</div>
        <div className={s.sectionContent}>
          Digital album is a website where users can upload pictures and
          organize them into albums. The goal of this project was to develop
          both back-end code and front-end code. This allows for the creation of
          a user interactive website where users can easily input data and
          upload images for display.
        </div>
        <div className={s.sectionTitle}>Information</div>
        <div className={s.sectionContent}>
          <div className={s.infoSection}>
            <div className={s.infoSectionTitle}>Type:</div>
            <div className={s.infoSectionContent}>Personal project</div>
          </div>
          <div className={s.infoSection}>
            <div className={s.infoSectionTitle}>GitHub:</div>
            <div className={s.infoSectionContent}>
              <Link
                to="https://github.com/sunny-potato/digital_album"
                target="_blank"
                className={s.githubLink}
              >
                https://github.com/sunny-potato/digital_album
              </Link>
            </div>
          </div>
        </div>
        <div className={s.sectionTitle}>Background </div>
        <div className={s.sectionContent}>
          I used to focus on front-end work in my personal projects, which was
          great. However, I soon realized that only front-end development
          restricted the features I could build. I wanted to create more
          interactive features that allowed for a two-way flow of information
          between the website and the user. I found inspiration from one of my
          early projects
          <Link
            to="https://github.com/sunny-potato/keywordSearch_images"
            target="_blank"
            className={s.githubLink}
          >
            (Go to the project)
          </Link>
          The project is about displaying images received from an open API. I
          aimed to enhance this project by offering users interactive services.
        </div>
        <div className={s.sectionTitle}>Main Features </div>
        <div className={s.sectionContent}>
          <div className={s.subSectionTitle}>1. Sign up and log in </div>
          <div className={s.subSectionContent}>
            I implemented a sign-up and login feature on this website. Users can
            recover their usernames and reset passwords by completing account
            verification via email. It was good to learn how to send email from
            server using Google OAuth.
          </div>
          <div className={s.subSectionTitle}>2. File and image management </div>
          <div className={s.subSectionContent}>
            Files can be created, updated and deleted. They can be organized by
            giving them a name or sorted by various criteria. In the case of
            images, they can be uploaded and stored in files using the uploading
            button or drag-and-drop feature. Users can view the images displayed
            in an image slider along with relevant information.
          </div>
          <div className={s.subSectionTitle}>
            3. Dynamic and responsive design
          </div>
          <div className={s.subSectionContent}>
            This website can be used on different screen sizes of devices. Using
            SVG files is a method for handling images responsively.
            Additionally, using media queries enables responsive design.
          </div>
        </div>
        <div className={s.sectionTitle}>Areas for improvement </div>
        <div className={s.sectionContent}>
          <div className={s.subSectionTitle}>
            1. Reducing image retrieval time from google storage
          </div>
          <div className={s.subSectionContent}>
            It takes a considerable amount of time to retrieve images from
            google storage when the images are displayed. This delay could
            negatively impact user experience. Finding ways to shorten download
            times should be a priority.
          </div>
          <div className={s.subSectionTitle}>
            2. Organize code and files in back-end
          </div>
          <div className={s.subSectionContent}>
            I have explored various methods for organizing back-end files and
            selected what I believe is an effective approach. However, there is
            still no established system in place. I would like to learn more
            about structuring code in back-end.
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
