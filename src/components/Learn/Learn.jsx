import React from 'react';

import s from './learn.scss';

function Learn() {
  return(
    <div className={ s.background }>
      <div className={ s.container }>
        <p className={ s.title }>Какая-то тема</p>
        <div className={ s.subcontainer }>
          <div className={ s.stuff }>
            <p className={ s.subtitle }>Материалы</p>
          </div>
          <div className={ s.literature }>
            <p className={ s.subtitle }>Литература</p>
          </div>
        </div>
        <div className={ s.contentContainer }></div>
      </div>
    </div>
  );
}

export default Learn;