"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import { usePathname } from "next/navigation";

const Page = () => {
  const eventId = usePathname().split("/").pop();

  const [event, setEvent] = useState<{
    cover_image: string;
    description: string;
    end_date: Date;
    id: number;
    name: string;
    start_date: Date;
    type: string;
  }>({
    cover_image: "",
    description: "",
    end_date: new Date(),
    id: 0,
    name: "",
    start_date: new Date(),
    type: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/events/${eventId}`)
      .then(
        (
          response: AxiosResponse<{
            code: number;
            event: {
              cover_image: string;
              description: string;
              end_date: string;
              id: number;
              name: string;
              start_date: string;
              type: string;
            };
          }>
        ) => {
          console.log(response);
          const apiEvent = response.data.event;

          // Convert date strings to Date objects
          const parsedEvent = {
            ...apiEvent,
            start_date: new Date(apiEvent.start_date),
            end_date: new Date(apiEvent.end_date),
          };

          setEvent(parsedEvent);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for months < 10
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for days < 10
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 pt-24">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="bg-black opacity-40 w-full h-full absolute left-0 top-0"></div>
        <div className="relative w-1/2 aspect-[897/698] bg-white rounded-xl min-w-[95%] min-h-[95%] max-h-[95%] overflow-y-auto">
          <div className="relative w-full h-[55%] flex-grow rounded-t-xl bg-black">
            {event.cover_image ? (
              <Image
                src={event.cover_image}
                alt="Event Cover"
                layout="fill"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <p>No cover image available</p> 
            )}
          </div>
          <div className="absolute w-full h-[50%] bg-white top-[50%] left-0 rounded-xl p-6">
            <h1 className="text-[25px] font-bold">{event?.name}</h1>
            <h1 className="text-[16px] font-bold pb-6">
              {formatDate(event.start_date)} - {formatDate(event.end_date)}
            </h1>
            <p className="text-sm font-normal">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
