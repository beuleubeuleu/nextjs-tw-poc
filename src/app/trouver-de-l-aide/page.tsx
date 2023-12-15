"use client";

import Footer from "../../app/_components/_ui/Footer";
import Map from "../../app/_components/Map";
import { useEffect, useState } from "react";
import { getDistanceVoldOiseauFromLatLonInKm } from "../utils";
import Image from "next/image";
import Link from "next/link";
import { AdresseType } from "../../_types/AdresseType";

const DEFAULT_CENTER = [48.79493, 2.36622];

export default function TrouverDeLaide() {
  const [adresses, setAdresses] = useState<AdresseType[]>([]);

  useEffect(() => {
    async function getData(): Promise<any> {
      const data = await fetch("/api/trouver-de-l-aide").then((res) =>
        res.json(),
      );
      setAdresses(data);
    }

    getData();
  }, []);

  return (
    <main
      className={"flex h-[100svh] w-full max-w-2xl flex-col justify-between"}
    >
      <Map
        className={"z-0 h-1 max-w-2xl"}
        width="200"
        height="400"
        center={DEFAULT_CENTER}
        zoom={12}
        adresses={[]}
      >
        {({ TileLayer, Marker, Popup }: any) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={DEFAULT_CENTER}>
              <Popup>Là où j'habite :)</Popup>
            </Marker>
            {adresses.map((adresse) => {
              return (
                <Marker
                  key={adresse.id}
                  position={[adresse.lattitude, adresse.longitude]}
                >
                  <Popup>
                    <div className={"text-[#294B68FA]"}>
                      <div className={"flex items-center justify-between"}>
                        <h4 className={"text-xl"}>{adresse.titre} </h4>
                        <p className={"italic"}>
                          {Math.round(
                            getDistanceVoldOiseauFromLatLonInKm(
                              DEFAULT_CENTER[0],
                              DEFAULT_CENTER[1],
                              adresse.lattitude,
                              adresse.longitude,
                            ) * 10,
                          ) / 10}
                          {"km "}
                        </p>
                      </div>
                      <p>{adresse.description}</p>
                      <div
                        className={
                          "grid grid-cols-2 items-center justify-center gap-6"
                        }
                      >
                        <p className={"font-bold text-sky-600 underline"}>
                          {adresse.adresse}
                        </p>
                        <p
                          className={
                            "rounded-full bg-[#294B68EF] p-2 text-center text-white"
                          }
                        >
                          {adresse.telephone}
                        </p>
                      </div>
                      <Link
                        href={"/"}
                        className={
                          "flex items-center justify-center gap-1 rounded-full border-2 border-sky-600 bg-white p-3 text-xl font-bold text-sky-600"
                        }
                      >
                        Plus d'info
                        <Image
                          width={24}
                          height={24}
                          alt={""}
                          src={"/images/right-arrow-svgrepo-com.svg"}
                          className={"font-bold"}
                        />
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </>
        )}
      </Map>
      <Footer />
    </main>
  );
}
