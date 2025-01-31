import Modal from 'react-modal';
import PropTypes from 'prop-types';
import pdf from '../../assets/CV-2024-DEV.pdf';

Modal.setAppElement('#root');

function CVModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="CV Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <iframe src={pdf} title="CV" className="pdf-viewer"></iframe>
    </Modal>
  );
}

CVModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CVModal;
