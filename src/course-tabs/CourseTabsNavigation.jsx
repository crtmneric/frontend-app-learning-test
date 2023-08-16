import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import { getConfig } from '@edx/frontend-platform';
import { useSelector } from 'react-redux';

import messages from './messages';
import Tabs from '../generic/tabs/Tabs';

function CourseTabsNavigation({
  activeTabSlug, className, tabs, intl,
}) {
  const {
    courseId,
  } = useSelector(state => state.courseHome);
  return (
    <div id="courseTabsNavigation" className={classNames('course-tabs-navigation', className)}>
      <div className="container-xl">
        <Tabs
          className="nav-underline-tabs"
          aria-label={intl.formatMessage(messages.courseMaterial)}
        >

          {tabs.map(({ url, title, slug }) => (
            slug !== "discussion" && slug !== "dates" && slug !== "progress" && slug !== "notes" &&
            <a
              key={slug}
              className={classNames('nav-item flex-shrink-0 nav-link', { active: slug === activeTabSlug })}
              href={url}
            >
              {
                slug === 'courseware' ? 'Öğrenme Yolculuğu' :
                    slug === 'dates' ? "Tarihler" :
                      slug === 'instructors' ? 'Eğitmenler' :
                        slug === 'instructor' ? 'Eğitmen' :
                          slug === 'comments' ? 'Yorumlar' :
                            slug === 'outline' ? 'Öğrenme Yolculuğu' :
                              title
              }

            </a>

          ))}
          <a
            key='comments'
            className={classNames('nav-item flex-shrink-0 nav-link', { active: 'comments' === activeTabSlug })}
            href={`/learning/course/${courseId}/comments`}
          >
            Yorumlar
          </a>
          <a
            key='course-instructors'
            className={classNames('nav-item flex-shrink-0 nav-link', { active: 'course-instructors' === activeTabSlug })}
            href={`/learning/course/${courseId}/course-instructors`}
          >
            Eğitmenler
          </a>
        </Tabs>
      </div>
    </div>
  );
}

CourseTabsNavigation.propTypes = {
  activeTabSlug: PropTypes.string,
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  intl: intlShape.isRequired,
};

CourseTabsNavigation.defaultProps = {
  activeTabSlug: undefined,
  className: null,
};

export default injectIntl(CourseTabsNavigation);
