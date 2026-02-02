type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full max-w-3xl
          rounded-2xl
          bg-white
          p-6
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="
            absolute right-4 top-4
            text-xl font-bold
            text-slate-500
            hover:text-orange-500
          "
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
