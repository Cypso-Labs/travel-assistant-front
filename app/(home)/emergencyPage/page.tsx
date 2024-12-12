"use client"; // Add this line
import React, { useState, useEffect } from "react";
import axios from "axios";


interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  location_image: string;
  description: string;
  type: string;
}

interface EmergencyContact {
  description: string;
  id: number;
  name: string;
  phone: number;
  sub_type: string; // e.g., "Clinic", "Hospital", "Pharmacy", etc.
  type: string;     // e.g., "Medical_Emergency", "Police_Services", etc.
}



export default function HelpPage() {

  const [locationOn, setLocationOn] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [emergencyContacts, setEmergencyContacts] = useState<Record<string, EmergencyContact[]>>({});
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Fetch locations from the backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/locations");
        console.log(response.data)
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();

  }, []);

  const fetchEmergencyContacts = async (locationId: number | null) => {
    if (!locationId) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/locations/${locationId}/emergency_contacts`);
      console.log(response.data.emergency_contacts)
      const contacts: EmergencyContact[] = response.data.emergency_contacts;

      // Group contacts by type (e.g., Medical_Emergency, Police_Services)
      const groupedContacts = contacts.reduce((acc: Record<string, EmergencyContact[]>, contact) => {
        if (!acc[contact.type]) acc[contact.type] = [];
        acc[contact.type].push(contact);
        return acc;
      }, {});


      console.log(groupedContacts);

      setEmergencyContacts(groupedContacts);
    } catch (error) {
      console.error("Error fetching emergency contacts:", error);
    } finally {
      setLoadingContacts(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-36">
      {/* Header Section */}
      <header className="flex justify-between items-center pb-6">
        <h1 className="text-2xl font-bold">Help When You Need It Most</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <span className="text-gray-600 text-sm">Location</span>
          <div className="relative w-full sm:w-auto">
            <select
              className="w-full sm:w-40 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 text-sm"
              value={selectedLocation}
              onChange={(e) => {
                const selectedName = e.target.value;
                const selectedLocationObject = locations.find(
                  (location) => location.name === selectedName
                );
                setSelectedLocation(selectedName);
                fetchEmergencyContacts(selectedLocationObject?.id || null);
              }}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
      {/* Display Selected Location */}
      {selectedLocation && (
        <div className="mt-4">
          <p className="text-gray-700">Selected Location: {selectedLocation}</p>
        </div>
      )}



      {/* Accordion Section */}
      <div className="mt-8 space-y-4">
        {/* Accordion 1 */}
        <details className="border rounded-md overflow-hidden shadow">
          <summary className="bg-white px-6 py-4 font-semibold cursor-pointer flex justify-between items-center">
            Medical Assistance
            <span className="text-gray-500">▼</span>
          </summary>
          {loadingContacts ? (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500">
              Loading emergency contacts...
            </div>
          ) : emergencyContacts.Medical_Emergency ? (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500 h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
              <ul className="space-y-4">
                <li>
                  <strong>Hospital Nearby You:</strong>
                  <ul className="list-disc ml-6">
                    {emergencyContacts.Medical_Emergency.filter(
                      (contact) => contact.sub_type === "Hospital"
                    ).map((contact) => (
                      <li key={contact.id}>
                        {contact.name}:{" "}
                        <a href={`tel:${contact.phone}`} className="text-blue-500">
                          {contact.phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Clinics Nearby You:</strong>
                  <ul className="list-disc ml-6">
                    {emergencyContacts.Medical_Emergency.filter(
                      (contact) => contact.sub_type === "Clinic"
                    ).map((contact) => (
                      <li key={contact.id}>
                        {contact.name}:{" "}
                        <a href={`tel:${contact.phone}`} className="text-blue-500">
                          {contact.phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Pharmacies Nearby You:</strong>
                  <ul className="list-disc ml-6">
                    {emergencyContacts.Medical_Emergency.filter(
                      (contact) => contact.sub_type === "Pharmacy"
                    ).map((contact) => (
                      <li key={contact.id}>
                        {contact.name}:{" "}
                        <a href={`tel:${contact.phone}`} className="text-blue-500">
                          {contact.phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500">
              No emergency contacts available.
            </div>
          )}
        </details>

        {/* Accordion 2 */}
        <details className="border rounded-md overflow-hidden shadow">
          <summary className="bg-white px-6 py-4 font-semibold cursor-pointer flex justify-between items-center">
            Police Services
            <span className="text-gray-500">▼</span>
          </summary>
          <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500 h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
            <ul className="space-y-4">
              <li>
                <strong>Police Station Nearby you :</strong>
                <ul className="list-disc ml-6">
                  <li>
                    Station 01 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                  <li>
                    Hospital 02 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  Clinics Nearby You:{" "}
                  <a href="tel:+94xxxxxxxx" className="text-blue-500">
                    +94xx xxx xxxx
                  </a>
                </strong>
              </li>
            </ul>
          </div>
        </details>

        {/* Accordion 3 */}
        <details className="border rounded-md overflow-hidden shadow">
          <summary className="bg-white px-6 py-4 font-semibold cursor-pointer flex justify-between items-center">
            Transport Assistance
            <span className="text-gray-500">▼</span>
          </summary>
          <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500 h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
            <ul className="space-y-4">
              <li>
                <strong>Roadside Assistance :</strong>
                <ul className="list-disc ml-6">
                  <li>
                    Mechanical Garage 01 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                  <li>
                    Mechanical Garage 02 :{" "}
                    <a href="tel:+94xxxxxxxx" className="text-blue-500">
                      +94xx xxx xxxx
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
}
