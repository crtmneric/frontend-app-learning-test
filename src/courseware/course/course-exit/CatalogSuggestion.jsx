import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import {
  FormattedMessage, injectIntl, intlShape,
} from '@edx/frontend-platform/i18n';
import { Hyperlink } from '@edx/paragon';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useModel } from '../../../generic/model-store';

import messages from './messages';
import { logClick } from './utils';

function CatalogSuggestion({ intl, variant }) {
  const { courseId } = useSelector(state => state.courseware);
  const { org } = useModel('courseHomeMeta', courseId);
  const { administrator } = getAuthenticatedUser();
  const url = `https://courses.pupilica.com/user/certificate/${courseId}`;

  const downloadCertificateLink = (
    <Hyperlink
      style={{ textDecoration: 'underline' }}
      destination={url}
      className="text-reset"
      onClick={() => logClick(org, courseId, administrator, 'catalog_search', { variant })}
    >
      Sertifikanı
    </Hyperlink>
  );

  return (
    <div className="row w-100 mx-0 my-2 justify-content-center" data-testid="catalog-suggestion">
      <div className="col col-md-8 p-4 bg-info-100 text-center">
        <i data-rating="1" class="smile-icon-star" aria-hidden="true" style={{ width: '20px' }} ></i>&nbsp;
        <FormattedMessage
          id="courseExit.catalogSearchSuggestion"
          defaultMessage="{downloadCertificateLink} görmeye ne dersin? :)"
          values={{ downloadCertificateLink }}
          description="Sertifika"
        />
      </div>
    </div>
  );
}

CatalogSuggestion.propTypes = {
  intl: intlShape.isRequired,
  variant: PropTypes.string.isRequired,
};

export default injectIntl(CatalogSuggestion);
