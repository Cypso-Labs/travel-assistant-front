"use client";

import Header from "@/app/components/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { Datepicker, Dropdown } from "flowbite-react";

const fetchEventsByLocationId = (
  locationId: number,
  setEvenList: React.Dispatch<React.SetStateAction<Event[]>>
) => {
  axios
    .get(`http://localhost:8080/api/v1/events/location/${locationId}`)
    .then((response) => {
      console.log(response);
      setEvenList(response.data.events);
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchEventsByDate = (
  dateValue: Date,
  setEvenList: React.Dispatch<React.SetStateAction<Event[]>>
) => {
  const year = dateValue.getFullYear();
  const month = String(dateValue.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(dateValue.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;

  axios
    .get(`http://localhost:5000/api/v1/events/by_date?date=${formattedDate}`)
    .then((response) => {
      console.log(response);
      setEvenList(response.data.events);
    })
    .catch((error) => {
      console.log(error);
    });
};

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  location_image: string;
  description: string;
  type: string;
}

interface Event {
  cover_image: string;
  description: string;
  end_date: Date;
  id: number;
  name: string;
  start_date: Date;
  type: string;
}

export default function Home() {
  const [eventList, setEventlist] = useState(Array<Event>);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/events")
      .then(
        (
          response: AxiosResponse<{
            code: number;
            events: Array<Event>;
          }>
        ) => {
          console.log(response);
          setEventlist(response.data.events);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [locations, setLocations] = useState(Array<Location>);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/locations")
      .then((response) => {
        console.log(response);
        setLocations(response.data.locations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="bg-white">
        <section className="container mx-auto py-10  pt-40">
          <div className="mx-6 flex justify-between">
            <div>
              <h2 className="text-5xl font-bold mb-6 pb-20">
                Events nearby you
              </h2>
            </div>

            <div className="flex gap-5">
              <div>
                <Datepicker
                  onChange={(e) => fetchEventsByDate(e, setEventlist)}
                />
              </div>

              <div>
                <Dropdown
                  label="Dropdown button on"
                  dismissOnClick={false}
                  className="h-52 overflow-y-scroll"
                >
                  {locations.map((location, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        fetchEventsByLocationId(location.id, setEventlist);
                      }}
                    >
                      {location.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 lg:gap-20 2xl:gap-32">
            {/* Card 1 */}
            {eventList.map((event, index) => {
              return (
                <div
                  key={index}
                  className="flex w-[280px] h-auto sm:w-[300px] md:w-[320px] lg:w-[350px] 2xl:w-[380px] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden items-start mx-auto"
                >
                  {/* Content Section */}
                  <div className="w-2/3 p-4">
                    <h3 className="text-lg font-bold text-gray-800 pb-8">
                      {event.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 pb-20">
                      {event.description}
                    </p>

                    <a
                      href={`eventPage/${event.id}`}
                      className="block mt-4 bg-green-500 text-white text-center py-2 px-4 rounded-md hover:bg-green-600"
                    >
                      Learn More...
                    </a>
                  </div>

                  {/* Image Section */}
                  <div className="w-1/3 h-full">
                    <Image
                      src={event.cover_image}
                      alt="Event Image"
                      width={380} // Set width here
                      height={350}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
