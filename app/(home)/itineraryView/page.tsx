"use client"; // Required for Next.js apps

import React, { useEffect, useState } from "react";
import header_image from '../../../public/images/hedar_Img.png'
import delete_image from '../../../public/images/icons/delete.png'
import edit_image from '../../../public/images/icons/edit.png'
import file_image from '../../../public/images/icons/document.png'
import VR from '../../../public/images/icons/VR_Icon.png'
import Image from "next/image";
import axios from "axios";
import MapComponent from "../../components/googleMapItinerary";
import VR360Image from "../../components/Modals/vrModal";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


export default function ItineraryPage() {

  const user = JSON.parse(localStorage.getItem('UserData') || '{}');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState("");
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/itineraryCreate"); // Navigate to the itineraryCreate Page
  };


  useEffect(() => {

    let locations = [];

    const fetchAllItineraries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/itinerary/${user.user_id}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        if (response.status === 200) {
          locations = response.data.itineraries;
          console.log(response.data.itineraries);
          setItinerary(response.data.itineraries);
          setIsLoading(false);
        }
      } catch (error) {
        const { response } = error;
        console.log(response);
        if (response.status === 404) {
          setItinerary(null);
          setIsLoading(false);
        }
        if (response.status === 401 || response.status === 422) {
          Swal.fire({
            title: "Token Error",
            text: "Please login to continue.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "Go to Login",
            customClass: {
              confirmButton: "swal-login-button"
            }
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/account/sign-in");
            }
          });
        }
      }
    };

    fetchAllItineraries()

  }, []);


  const fetchLocationsForItinerary = async (item) => {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('UserData') || '{}');
    setSelectedItinerary(item);

    // If user data exists and contains user_id
    if (user && user.user_id) {
      try {
        // Send GET request with itinerary id and user id
        const response = await axios.get(
          `http://localhost:5000/api/v1/itinerary_location/${item.id}/${user.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`, // Include the token in headers
            },
          }
        );

        console.log(response);

        // Check if the response status is 200 (OK)
        if (response.status === 200) {
          setSelectedLocations(response.data.locations); // Assuming API returns an array of locations
        }
      } catch (error) {
        console.error('Error fetching locations:', error.response?.data || error.message);
      }
    } else {
      console.error('User data not found or missing user_id');
    }
  };

  const handleImageModal = (imageURL: string) => {
    setSelectedImageURL(imageURL);
    setOpenModal(true);
  };


  const handleDeleteItinerary = async (id) => {
    try {
      // Display confirmation alert using SweetAlert
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action will permanently delete the itinerary.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      // Check if the user confirmed the action
      if (result.isConfirmed) {
        // Send DELETE request to the backend
        const response = await axios.delete(`http://localhost:5000/api/v1/itineraries/${id}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

        console.log(response);

        if (response.status === 200) {
          // Display success message
          Swal.fire('Deleted!', response.data.message || 'Itinerary has been deleted.', 'success');

          // Update the state to remove the deleted itinerary
          setItinerary((prevItinerary) => prevItinerary.filter(item => item.id !== id));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      if (error.response) {
        console.error('Error deleting itinerary:', error.response.data);

        // Display error message
        Swal.fire('Error!', error.response.data.message || 'Failed to delete itinerary.', 'error');
      } else {
        console.error('Error deleting itinerary:', error.message);

        // Display error message
        Swal.fire('Error!', 'Something went wrong. Please try again later.', 'error');
      }
    }
  };


  // Handle remove itinerary
  const handleRemove = (id: number) => {
    setItinerary(itinerary.filter(item => item.id !== id));
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // const totalBudget = itinerary.reduce((acc, item) => {

  //   const numericBudget = parseInt(item.total_budget);
  //   return acc + numericBudget;
  // }, 0);

  // console.log(`Total Budget: RS ${totalBudget}`);

  const handleImageClick = () => {
    console.log("Image clicked!");
  };



  function removeMainSection(): void {
    throw new Error("Function not implemented.");
  }

  return (
    (!isLoading &&
      <div className="min-h-screen bg-gray-50 pt-6">

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 z-50`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="p-4 space-y-4">
            <a href="/" className="block hover:text-gray-300">Home</a>
            <a href="/itinerary" className="block hover:text-gray-300">Itinerary</a>
            <a href="/events" className="block hover:text-gray-300">Events</a>
            <a href="/recipes" className="block hover:text-gray-300">Recipes</a>
            <a href="/emergency" className="block hover:text-gray-300">Emergency</a>
            <a href="/about" className="block hover:text-gray-300">About Us</a>
          </nav>
        </div>
        <div className="pt-24"></div>
        {/*back button*/}
        <div className="bg-white p-6 rounded-lg shadow-lg border flex items-center justify-between py-3 mt-6 mx-auto w-full">
      <button
        className="bg-black text-white px-2 rounded hover:bg-red-600 transition duration-200"
        onClick={handleNavigate} // Add onClick to navigate to itineraryCreate
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 transform rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
      </button>
      <h2 className="text-xl font-bold">My Itinerary</h2>
    </div>


        {/* Itinerary Table Section */}
        {itinerary ? <section className="container mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-6 text-left">My Itinerary</h2>
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-[800px] w-full bg-white text-left border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-900"></th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-900">Name</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-900">Budget</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-900">Start Date</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-900">End Date</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody>
                {itinerary.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50" onClick={() => fetchLocationsForItinerary(item)}>
                    {/* Edit Action */}
                    <td>
                      <button className="text-blue-500 hover:text-blue-700">
                        <Image src={file_image} alt="Icon" className="w-6 h-6" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 ">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 ">{item.total_budget}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 ">{item.start_date}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 ">{item.end_date}</td>
                    <td className="px-6 py-4 flex items-center space-x-4">
                      {/* Remove Action */}
                      <button
                        onClick={() => handleDeleteItinerary(item.id)}
                        className="text-red-500 hover:text-red-700">
                        <Image src={delete_image} alt="Icon" className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
          :
          <p className="text-2xl font-semibold text-gray-700 text-center mt-5">No Saved Itineraries</p>
        }

        <main className="container mx-auto mt-6 pb-10 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Preview</h2>

          {/* Card Section */}
          {selectedItinerary ? <div className="bg-white shadow-md rounded-lg p-6 w-full">

            {/* Map Section */}
            <MapComponent locations={selectedLocations} />

            {/* Location and Budget Section */}
            <div className="flex flex-col lg:flex-row justify-between mb-4">
              {/* Locations List */}
              <div className="mb-6 lg:w-2/3">
                {selectedLocations.map((loc) => (
                  <div
                    key={loc.id}
                    className="flex items-center justify-between mb-3 px-2 py-1 bg-gray-50 rounded hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-2">
                      {/* Label */}
                      <label className="flex items-center text-gray-700 space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-green-400"
                        >
                          <circle cx="12" cy="12" r="8" />
                        </svg>
                        <span>
                          {loc.name}{" "}
                          <span className="text-sm text-gray-500">({loc.description})</span>
                        </span>
                      </label>

                      {/* VR Button */}
                      <button
                        onClick={handleImageClick}
                        className="text-gray-500 hover:text-gray-700 flex items-center"
                      >
                        <Image
                          onClick={() => {
                            handleImageModal(loc.location_image);
                          }}
                          src={VR}
                          alt="VR Icon"
                          className="w-5 h-5 cursor-pointer"
                        />
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
              {/* Budget Section */}
              <div className="flex flex-col items-center sm:items-start lg:w-1/3 mt-4 lg:mt-0 pt-4">
                <p className="text-gray-700 font-semibold text-center sm:text-left">
                  Total Budget
                </p>
                <p className="text-xl font-bold text-green-600 text-center sm:text-left">
                  RS {selectedItinerary.total_budget}
                </p>
              </div>
            </div>
          </div>
            :
            <p className="text-2xl font-semibold text-gray-500 text-center">Select An Itinerary to preview</p>
          }
        </main>
      </div>)
  );
}
