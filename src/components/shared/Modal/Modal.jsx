import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import style from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  useEffect(() => {

    const closeModalEsc = ({code}) => {
      if (code === 'Escape') {
        close();
      }
    }
    document.addEventListener('keydown', closeModalEsc);

    return () => document.removeEventListener('keydown', closeModalEsc);
  }, [close]);



  const closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      close();
    }
  };

  return createPortal(
    <div className={style.Overlay} onClick={closeModal}>
      <div className={style.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

// class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeModal);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal = ({ target, currentTarget, code }) => {
//     if (target === currentTarget || code === 'Escape') {
//       this.props.close();
//     }
//   };

//   render() {
//     const { children } = this.props;
//     const { closeModal } = this;

//     return createPortal(
//       <div className={style.Overlay} onClick={closeModal}>
//         <div className={style.Modal}>{children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};
