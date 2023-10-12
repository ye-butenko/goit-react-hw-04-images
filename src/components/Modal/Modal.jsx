import React from 'react';
import { StyledOverlay, StyledModal } from './Modal.styled';

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { closeModal, tags, modalImg } = this.props;

    return (
      <StyledOverlay onClick={closeModal}>
        <StyledModal>
          <img src={modalImg} alt={tags} />
        </StyledModal>
      </StyledOverlay>
    );
  }
}
