import React from 'react';

import s from './course.scss';

function Course() {
  return(
    <div className={ s.background }>
      <div className={ s.container }>
        <p className={ s.title }>Какой-то курс</p>
        <div className={ s.description }></div>
        <div className={ s.subcontainer }>
          <div className={ s.learn }>
            <p className={ s.subtitle }>Учебные материалы</p>
          </div>
          <div className={ s.tests }>
            <p className={ s.subtitle }>Тестовые задания</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;