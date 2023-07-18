import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { LearningHeader as Header } from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import FooterLogo from "./assets/img/footer-logo.png";
import FooterButtons from "./assets/img/footer-buttons.png";


const replaceHrefFooter = () => {
  useEffect(() => {
    const links = document.querySelectorAll('footer a');
    const cf = document.getElementsByClassName('container-fluid');
    cf.innerHtml = `
    <div style="background:rgb(26, 20, 44);">
      <div style="display: flex; justify-content: space-between;">
          <div><img src="https://test.pupilica.com/images/footer-logo.png" alt="Pupilica Footer" /></div>
          <div>
              <ul>
                  <li><a href="https://test.pupilica.com/about-us">Hakkımızda</a></li>
                  <li><a href="https://test.pupilica.com/educations">Eğitimler</a></li>
                  <li><a href="https://test.pupilica.com/instructors">Eğitmenler</a></li>
              </ul>
          </div>
          <div>
              <ul>
                  <li><a href="https://test.pupilica.com/conditions">Kullanıcı S&ouml;zleşmesi</a></li>
                  <li><a href="https://test.pupilica.com/faqs">Sık&ccedil;a Sorulan Sorular</a></li>
                  <li><a href="https://softtech.com.tr/web-sitesi-gizlilik-politikasi/" target="_blank">Gizlilik
                          S&ouml;zleşmesi</a></li>
                  <li><a href="https://softtech.com.tr/wp-content/uploads/2018/07/KVK-Ba%C5%9Fvuru-Formu.pdf"
                          target="_blank">KVKK Başvuru Formu</a></li>
                  <li><a href="https://test.pupilica.com/contact">Bize Ulaşın</a></li>
              </ul>
          </div>
          <div><img src="https://test.pupilica.com/images/footer-buttons.png" alt="Pupilica" /></div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex;">
              <p>a</p>
              <p>b</p>
          </div>
          <div>
              <div>Tüm Hakları Saklıdır Pupilica 2023</div>
          </div>
      </div>
    </div>
    `

    links.forEach((link) => {
      link.setAttribute('href', 'https://test.pupilica.com');
    });

  }, []);

  return null; // Return null as we don't need to render anything
};

const FooterWrapper = () => {
  replaceHrefFooter(); // Call the replaceHref function to modify the href attributes

  return (
    <Footer />
  );
};
export default FooterWrapper;
