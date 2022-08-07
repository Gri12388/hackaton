import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from './courses.scss';

function Courses() {

const navigate = useNavigate();
const courseId = sessionStorage.getItem('courseId');


const courses = JSON.parse(sessionStorage.getItem('courses'));

const coursesElements = courses.map((item, index) => {
  return (
    <div 
      key={ index } 
      className={ s.courseContainer }
      data-courseid={ item.id } 
      onClick={ onCourseContainer } 
    >
      <p className={ s.titleText }>{ item.title }</p>
      <p className={ s.descriptionText }>{ item.description }</p>
    </div>
  );
})

function onCourseContainer() {
  debugger
  if (courseId) navigate('/course');
  else navigate('/auth');
}


  return (
    <div className={ s.background }>
      <div className={ s.container }>
        { coursesElements }
      </div>
    </div>
  );
}

export default Courses;