"use client";

// import React from "react";
import VR from "../../../public/images/icons/VR_Icon.png";
import header_image from "../../../public/images/hedar_Img.png";
import Map from "../../../public/images/Map_IMG.png";
import Popup from "../../components/Modals/saveItineraryModal";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import VR360Image from "../../components/Modals/vrModal";
import axios from "axios";
import Swal from "sweetalert2";
import MapComponent from "../../components/googleMapItineraryAll";

export default function ItineraryPage_02() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState("");
  const [itineraryData, setItineraryData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [location, setLocations] = useState([]);

  const user = JSON.parse(localStorage.getItem('UserData') || '{}');

  useEffect(() => {

    let locations = [];

    const fetchAllLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/locations', {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        if (response.status === 200) {
          locations = response.data.locations;
        }
      } catch (error) {
        const { response } = error;
        console.log(response.data);
      }
    };

    const savedData = localStorage.getItem("itinerary");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      setLocations(parsedData)

      // Fetch all locations first
      fetchAllLocations().then(() => {
        const transformedData = parsedData.map((item) => ({
          locations: item.sub_places.map((place, index) => {
            // Find the matching location from the database
            const matchedLocation = locations?.find(
              (dbLocation) => dbLocation.name.toLowerCase() === place.name.toLowerCase()
            );


            // Return the complete object by merging predicted data with database data
            return {
              id: index + 1,
              name: place.name,
              description: matchedLocation?.description || `Lat: ${place.latitude}, Lon: ${place.longitude}`,
              latitude: matchedLocation?.latitude || place.latitude,
              longitude: matchedLocation?.longitude || place.longitude,
              location_image: matchedLocation?.location_image || "Default_Image_URL", // Use a default if not found
              budget: `Approx Rs ${item.cost}`,
              type: matchedLocation?.type || "Unknown",
              location_id: matchedLocation?.id || "Unknown",
            };
          }),
          totalBudget: item.cost,
        }));


        setItineraryData(transformedData);
      });

    }
  }, []);


  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleImageModal = (imageURL: string) => {
    setSelectedImageURL(imageURL);
    setOpenModal(true);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("itinerary");
    setItineraryData([]);
    Swal.fire({
      title: "Data Cleared",
      text: "Itinerary data cleared!",
      icon: "success"
    });
  };

  const handleSaveItinerary = async (item) => {
    setItemData(item);
    openPopup();
  }


  const Alert = () => {
    return (
      <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div className="ms-3 text-sm font-medium">
          A simple success alert with an <a href="#" className="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
        </div>
        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-3" aria-label="Close">
          <span className="sr-only">Dismiss</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>
    );
  }


  const handleShowAlert = () => {
    setShowAlert(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
      >
        {/* Sidebar content */}
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[60%] md:w-[40%] flex flex-col text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Itinerary Created Successfully!
            </h2>
            <p className="text-gray-500 mt-2">
              Your itinerary has been successfully created and saved.
            </p>

            <div className="mt-4">
              <span
                className="text-green-600 font-bold"
                onClick={() => setShowAlert(false)}
              >
                Close
              </span>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto mt-6 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="pt-24"></div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Itinerary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {itineraryData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 flex flex-col relative"
            >
              <MapComponent locations={location[index].sub_places} />
              <div className="mb-4">
                {item.locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <label className="flex items-center text-gray-700 space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-green-300"
                      >
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                      <span>
                        {loc.name}{" "}
                        <span className="text-sm">({loc.description})</span>
                      </span>
                    </label>
                    <span className="text-gray-500">
                      <Image
                        onClick={() => {
                          handleImageModal(loc.location_image);
                        }}
                        src={VR}
                        alt="Location Icon"
                        className="w-5 h-5 cursor-pointer"
                      />
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center sm:items-start mt-4">
                <p className="text-gray-700 font-semibold text-center sm:text-left">
                  Total Budget
                </p>
                <p className="text-xl font-bold text-green-600 text-center sm:text-left">
                  RS {item.totalBudget}
                </p>
              </div>
              <div className="relative mt-4 sm:mt-6 flex justify-end w-full">
                <button onClick={() => { handleSaveItinerary(item) }} className="bg-green-500 text-white py-2 px-4 w-40 rounded-md hover:bg-green-600 transition">
                  SAVE
                </button>
              </div>
            </div>
          ))}
        </div>
        {openModal && (
          <VR360Image
            imageURL={selectedImageURL}
            onClose={() => setOpenModal(false)}
          />
        )}
      </main>


      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={clearLocalStorage}
          className="bg-red-500 text-white px-6 py-2 rounded shadow-md hover:bg-red-600 transition"
        >
          Clear Data
        </button>
      </div>
      {isPopupOpen && (
        <Popup
          onClose={closePopup}
          onItemData={itemData}
          onSuccess={handleShowAlert}
        />
      )}

    </div>
  );
}
