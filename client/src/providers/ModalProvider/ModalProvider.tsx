import { useMemo, useState } from "react";
import { useCallbackOnce } from "danholibraryrjs";

import { ModalProps, ModalPropsData, ModalProviderProps } from "./ModalProviderTypes";
import { ModalContext } from "./ModalProviderConstants";
import Modal from "./components/Modal";

export default function ModalProvider({ children }: ModalProviderProps) {
  const [videoData, setVideoData] = useState<ModalPropsData | null>(null);
  const modal = useMemo(() => videoData ? <Modal {...videoData} /> : null, [videoData]);

  const setModal = useCallbackOnce((props: ModalProps) => async () => {
    const { video: { path, name } } = props;
    const video = await import(path);
    setVideoData({ video, name });
  })

  return (
    <ModalContext.Provider value={setModal}>
      {modal}
      {children}
    </ModalContext.Provider>
  );
}