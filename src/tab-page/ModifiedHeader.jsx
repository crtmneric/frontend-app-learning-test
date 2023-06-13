import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { LearningHeader as Header } from '@edx/frontend-component-header';

const replaceHref = () => {
  useEffect(() => {
    const links = document.querySelectorAll('header a');

    links.forEach((link) => {
      link.setAttribute('href', 'https://test.pupilica.com');
    });
  }, []);

  return null; // Return null as we don't need to render anything
};

const HeaderWrapper = ({ courseOrg, courseNumber, courseTitle, showUserDropdown }) => {
  replaceHref(); // Call the replaceHref function to modify the href attributes

  return (
    <Header
      courseOrg={courseOrg}
      courseNumber={courseNumber}
      courseTitle={courseTitle}
      showUserDropdown={showUserDropdown}
    />
  );
};
export default HeaderWrapper;
