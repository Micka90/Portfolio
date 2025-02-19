import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import pdf1 from '../../assets/CV-2024-DEV.pdf';
import pdf2 from '../../assets/CV-2024 DEV - Junior.pdf';

Modal.setAppElement('#root');

function CVModal({ isOpen, onClose }) {
  const [selectedPdf, setSelectedPdf] = useState(pdf1);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="CV Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <button className="cv-close-btn" onClick={onClose}>
        &times;
      </button>

      <div className="pdf-selector">
        <button onClick={() => setSelectedPdf(pdf1)}>CV Alternance</button>
        <button onClick={() => setSelectedPdf(pdf2)}>CV Junior</button>
      </div>

      <iframe src={selectedPdf} title="CV" className="pdf-viewer"></iframe>
    </Modal>
  );
}

CVModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CVModal;
