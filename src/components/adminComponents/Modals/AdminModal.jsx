import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

export default function AdminModal({ logo, children }) {
  const [openBlock, setOpenBlock] = React.useState(false);
  const handleOpen = () => setOpenBlock(true);
  const handleClose = () => setOpenBlock(false);

  return (
    <div style={{display: 'inline'}}>
      <Button onClick={handleOpen}>{ logo }</Button>
      <Modal
        open={openBlock}
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



