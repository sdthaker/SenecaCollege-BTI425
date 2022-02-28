import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import '../btn.css';

export default function Paginate({
  cardsPerPage,
  totalCards,
  paginate,
  handleClearData,
}) {
  const [active, setActive] = useState('0');
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e, number) => {
    paginate(number);
    setActive(e.target.id);
  };

  return (
    <>
      {pageNumbers.length > 0 ? (
        <nav>
          <ul className='pagination'>
            {pageNumbers.map((number, index) => (
              <span key={index}>
                <button
                  id={number}
                  onClick={(e) => handleClick(e, number)}
                  value={number}
                  className={
                    active == number ? 'page-link active' : 'page-link'
                  }
                  style={{
                    border: 'solid 2px black',
                    borderRadius: '5px',
                    marginLeft: '2px',
                  }}
                >
                  {number}
                </button>
                {/* &nbsp; */}
              </span>
              // <br/>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
