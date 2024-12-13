"use client"; // Add this line
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "flowbite-react";


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
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [emergencyContacts, setEmergencyContacts] = useState<Record<string, EmergencyContact[]>>({});
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Cache to store emergency contacts for locations
  const contactCache = new Map<number, Record<string, EmergencyContact[]>>();

  // Fetch locations from the backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/locations");
        console.log(response.data);
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const fetchEmergencyContacts = async (locationId: number | null) => {
    if (!locationId) return;

    // Check cache
    if (contactCache.has(locationId)) {
      setEmergencyContacts(contactCache.get(locationId) || {});
      return;
    }

    setLoadingContacts(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/locations/${locationId}/emergency_contacts`);
      const contacts: EmergencyContact[] = response.data.emergency_contacts;

      // Group contacts by type (e.g., Medical_Emergency, Police_Services)
      const groupedContacts = contacts.reduce((acc: Record<string, EmergencyContact[]>, contact) => {
        acc[contact.type] = acc[contact.type] || [];
        acc[contact.type].push(contact);
        return acc;
      }, {});

      contactCache.set(locationId, groupedContacts);
      setEmergencyContacts(groupedContacts);
    } catch (error) {
      console.error("Error fetching emergency contacts:", error);
    } finally {
      setLoadingContacts(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-36">
      {/* Header Section */}
      <header className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row justify-between items-center pb-6">
        <h1 className="text-lg sm:text-2xl font-bold">Help When You Need It Most</h1>

        <div className="w-full sm:w-auto flex justify-center sm:justify-start items-center ">
          <div className="relativew-auto">
            <Dropdown
              label={selectedLocation ? selectedLocation : "Select Location"}
              dismissOnClick={true}
              className="h-52 overflow-y-scroll"
            >
              {locations.map((location) => (
                <Dropdown.Item
                  key={location.id}
                  onClick={() => {
                    const selectedName = location.name;
                    const selectedLocationObject = locations.find(
                      (location) => location.name === selectedName
                    );
                    setSelectedLocation(selectedName);
                    fetchEmergencyContacts(selectedLocationObject?.id || null);
                  }}
                >
                  {location.name}
                </Dropdown.Item>
              ))}
            </Dropdown>
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
        {/* Medical Assistance Accordion */}
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

        {/* Police Services Accordion */}
        <details className="border rounded-md overflow-hidden shadow">
          <summary className="bg-white px-6 py-4 font-semibold cursor-pointer flex justify-between items-center">
            Police Services
            <span className="text-gray-500">▼</span>
          </summary>
          {loadingContacts ? (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500">
              Loading emergency contacts...
            </div>
          ) : emergencyContacts.Police_Services ? (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500 h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
              <ul className="space-y-4">
                {emergencyContacts.Police_Services.map((contact) => (
                  <li key={contact.id}>
                    {contact.name}:{" "}
                    <a href={`tel:${contact.phone}`} className="text-blue-500">
                      {contact.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500">
              No emergency contacts available.
            </div>
          )}
        </details>

        {/* Transport Assistance Accordion */}
        <details className="border rounded-md overflow-hidden shadow">
          <summary className="bg-white px-6 py-4 font-semibold cursor-pointer flex justify-between items-center">
            Transport Assistance
            <span className="text-gray-500">▼</span>
          </summary>
          {loadingContacts ? (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500">
              Loading emergency contacts...
            </div>
          ) : emergencyContacts.Transport_Assistance ? (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500 h-70 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
              <ul className="space-y-4">
                {emergencyContacts.Transport_Assistance.map((contact) => (
                  <li key={contact.id}>
                    {contact.name}:{" "}
                    <a href={`tel:${contact.phone}`} className="text-blue-500">
                      {contact.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-gray-50 px-6 py-4 border-t-2 border-green-500">
              No emergency contacts available.
            </div>
          )}
        </details>
      </div>
    </div>
  );
}
