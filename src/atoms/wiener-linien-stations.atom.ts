import {atomWithQuery} from "jotai-tanstack-query";
import Papa from "papaparse";
import {store} from "../App"

export interface Station {
    NAME: string;
    GEMEINDE: string;
    WGS84_LAT: number;
    WGS84_LON: number;
}

const wienerLinienStationsAtom = atomWithQuery((get) =>
    ({
        queryKey: ['stations'],
        queryFn: async (): Promise<Station[]> => {
            //check if there is data in storage
            const cachedData = await store.get("stationData");

            if (cachedData) {
                console.log("Cached data available: ", cachedData);
                return JSON.parse(cachedData);
            }

            const response = await fetch(
                'https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv'
            );

            if (!response.ok) {
                throw new Error("Failed to fetch station data.");
            }

            const responseAsText = await response.text();


            console.log("Stations as String:", responseAsText);

            return new Promise<Station[]>((resolve, reject) => {
                Papa.parse(responseAsText, {
                    header: true,
                    skipEmptyLines: true,

                    complete: (result) => {
                        if (result.errors.length > 0) {
                            reject(result.errors);
                        } else {
                            //map rows to station objects
                            const stationData = result.data.map((row: any) => ({
                                NAME: row.NAME,
                                GEMEINDE: row.GEMEINDE,
                                WGS84_LAT: parseFloat(row.WGS84_LAT),
                                WGS84_LON: parseFloat(row.WGS84_LON),
                            }));
                            resolve(stationData);
                        }
                    },
                    error: (error: any) => {
                        reject(error);
                    },
                });
            });

        },

    })
);

export {wienerLinienStationsAtom};
