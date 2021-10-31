import React from 'react';
import coverImage from '../../assets/cover/cover-image.jpg';
function About() {
  return (
    <section className="my-5">
      <h1 id="about">Who am I?</h1>
      <img src={coverImage} className="my-2" style={{ width: "100%" }} alt="cover" />
      <div className="my-2">
        <p>
          This application is designed to enable users to communicate inside a forum regarding books that they are interested in.
        </p>
      </div>
    </section>
  );
}

export default About;
