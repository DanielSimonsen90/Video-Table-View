import { Video } from "vtv-models";

export type ModalContext = (modal: ModalProps) => () => void;

export type ModalProviderProps = {
  children: React.ReactNode;
}

export type ModalProps = {
  video: Video
}

export type ModalPropsData = Pick<Video, 'name'> & {
  video: any;
}