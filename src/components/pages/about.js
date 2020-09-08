import React from 'react';
import aboutMeImg from '../../../static/assets/images/about-me/about-me.jpg';

export default function() {
  return (
    <div className='about-me-wrapper'>
      <div 
        className='left-column'
        style={{
          backgroundImage: `url(${aboutMeImg})`,
          backgroundSize: 'cover',
          backgroundPosition: '80%',
        }}
       ></div>
      <div className='right-column'>
        <div className='about-me-info'>
          <h1>About Me</h1>
          <p>I am a Software Support Analyst with previous development experience looking to advance my career in development.</p>
          <p>Previously I worked in finance for about 8 years. 5 with a credit union and 3 with an investment firm.  I did enjoy it, but found it a little boring.  I have always loved technology and the thought of being able to take ideas and create them drove me to change careers.</p>
          <p>I love the challenges that come from the tech industry.  It feels more like playing a game, consistently solving puzzles.  On top of that, the industry is always changing with new technologies.  Being someone who loves learning, I welcome the challenge of learning new things.</p>
          <p>I am passionate about my work as well as life.  I enjoy adventure and being active.  I love hiking, camping, traveling, exercise, and playing sports.  Even though I accept I am not very good, I also enjoy photography and drawing.  Even though I cannot sing, I enjoy listening to music and hope to find time to learn to play the piano and guitar someday.</p>
        </div>
      </div>
    </div>
  )
}