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
              end_date: Date;
              id: number;
              name: string;
              start_date: Date;
              type: string;
            };
          }>
        ) => {
          console.log(response);
          setEvent(response.data.event);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  return (
    <div className="w-full h-full fixed top-0 left-0 pt-24">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="bg-black opacity-40 w-full h-full absolute left-0 top-0"></div>
        <div className="relative w-1/2 aspect-[897/698] bg-white rounded-xl min-w-[960px]">
          <div className="relative w-full h-[55%] flex-grow rounded-t-xl bg-black">
            {event.cover_image ?? (
              <Image
                src={event.cover_image}
                alt=""
                layout="fill"
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>
          <div className="absolute w-full h-[50%] bg-white top-[50%] left-0 rounded-xl p-6">
            <h1 className="text-[25px] font-bold">{event?.name}</h1>
            <h1 className="text-[16px] font-bold pb-6">
              {event.start_date.toDateString()} -{" "}
              {event.end_date.toDateString()}
            </h1>
            <p className="text-sm font-normal">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
