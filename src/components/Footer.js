import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Row, Well, Jumbotron} from 'react-bootstrap';

function Footer() {
  return(
    <footer>
      <div className='text-center'>
        <h6>
          <a href='https://twitter.com/d13g0rr' target='_blank'>
            @d13g0rr
          </a>
          &nbsp;|&nbsp;
          <a href='https://github.com/d1egoRR' target='_blank'>
            Github
          </a>
          &nbsp;|&nbsp;
          <a href='https://www.linkedin.com/in/diego-riquelme/' target='_blank'>
            Linkedin
          </a>
          &nbsp;|&nbsp;
          <Link to='/contact' >Contacto</Link>
        </h6>
      </div>
    </footer>
  );
}

export default Footer;