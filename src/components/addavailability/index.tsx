

const Available = ({ isOpen, onClose, onSave }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
        <h2 className="text-lg font-bold mb-4">Add Availability</h2>
        <input
          type="datetime-local"
          id="startTime"
          className="border rounded w-full p-2 mb-3"
        />
        <input
          type="datetime-local"
          id="endTime"
          className="border rounded w-full p-2 mb-3"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const start = (
                document.getElementById("startTime") as HTMLInputElement
              ).value;
              const end = (
                document.getElementById("endTime") as HTMLInputElement
              ).value;
              onSave({ start, end });
            }}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Available;