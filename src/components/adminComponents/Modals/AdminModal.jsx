import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

export default function AdminModal({ logo, children }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{display: 'inline'}}>
      <Button onClick={handleOpen}>{ logo }</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
        { children }
        </div>
      </Modal>
    </div>
  );
}



