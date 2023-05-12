import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

import useIndexOfLastVisibleChild from './useIndexOfLastVisibleChild';

export default function Tabs({ children, className, ...attrs }) {
  const [
    indexOfLastVisibleChild,
    containerElementRef,
    invisibleStyle,
    overflowElementRef,
  ] = useIndexOfLastVisibleChild();

  const tabChildren = useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    // All tabs will be rendered. Those that would overflow are set to invisible.
    const wrappedChildren = childrenArray.map((child, index) => React.cloneElement(child, {
      style: index > indexOfLastVisibleChild ? invisibleStyle : null,
    }));
    // Insert the overflow menu at the cut off index (even if it will be hidden
    // it so it can be part of measurements)
    return wrappedChildren;
  }, [children, indexOfLastVisibleChild]);

  return (
    <nav
      {...attrs}
      className={classNames('nav flex-nowrap', className)}
      ref={containerElementRef}
    >
      {tabChildren}
    </nav>
  );
}

Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Tabs.defaultProps = {
  children: null,
  className: undefined,
};
