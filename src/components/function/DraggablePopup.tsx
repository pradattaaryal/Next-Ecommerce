import { ReactNode, RefObject, useRef } from 'react';
import Draggable from 'react-draggable';

interface PopupProps {
  
  onClose: () => void;
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ onClose, children }) => {
  const draggableRef = useRef<HTMLDivElement>(null); // Ensure it's only HTMLDivElement

  

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <Draggable  nodeRef={draggableRef as RefObject<HTMLElement>} handle=".draggable-handle" bounds="parent">
        <div
          ref={draggableRef}
          className="bg-white w-[871px] relative rounded-lg shadow-lg p-8 draggable-handle cursor-move"
          role="document"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-2xl text-black hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            ✖
          </button>

          {/* Popup Content */}
          {children}
        </div>
      </Draggable>
    </div>
  );
};

export default Popup;