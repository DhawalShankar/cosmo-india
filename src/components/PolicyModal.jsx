const PolicyModal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default PolicyModal;
