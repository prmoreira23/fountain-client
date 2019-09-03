import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import SnackbarContentWrapper from '../snackbar-content-wrapper';

export default function SnackBar(props) {
  const { message, variant, open, handleClose } = props;

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    </div>
  );
}
