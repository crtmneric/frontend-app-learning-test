import React, { useEffect } from 'react';

const replaceHref = () => {
    useEffect(() => {
      const links = document.querySelectorAll('header a');
  
      links.forEach((link) => {
        link.setAttribute('href', 'https://google.com');
      });
    }, []);
  };