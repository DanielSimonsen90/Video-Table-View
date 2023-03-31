import { ModalPropsData } from '../../ModalProviderTypes';

export default function Modal({ name, video }: ModalPropsData) {
  return (
    <div className="modal-layer">
      <dialog>
        <header>
          <h1>{name}</h1>
          <span>&times;</span>
        </header>
        
        <video controls src={video}></video>
      </dialog>
    </div>
  );
}