import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {

  const [itinerary, setItinerary] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  const ItineraryData = JSON.parse(localStorage.getItem('itineraryData'));
  const user = JSON.parse(localStorage.getItem('UserData'));

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onItinerarySave = async () => {

    const data = {
      "name": itinerary,
      "total_budget": ItineraryData.budget,
      "start_date": ItineraryData.startDate,
      "end_date": ItineraryData.endDate,
      "user_id": user.user_id
    }

    try {

      console.log(data);

      console.log(user.access_token)

      const response = await axios.post('http://localhost:5000/api/v1/itineraries', data, {
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
        }
      });

      if (response.status === 200) {
        console.log(response.data)
      }
    } catch (error) {
      const { response } = error;
      console.log(response.data)
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-[95%] sm:[90%] md:w-[60%] lg:w-[45%] flex flex-col"
      >
        <p className="text-lg mb-4">
          Please enter a name before saving to identify your{" "}
          <span className="text-black font-bold">Itinerary</span>.
        </p>
        <input
          type="text"
          onChange={(e) => { (setItinerary(e.target.value)) }}
          placeholder="Enter itinerary name here"
          className="border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="w-full flex justify-end items-center">
          <button
            className="w-36 bg-[#63AB45] text-white font-semibold py-2 rounded hover:bg-green-700 transition-all"
            onClick={onItinerarySave}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
