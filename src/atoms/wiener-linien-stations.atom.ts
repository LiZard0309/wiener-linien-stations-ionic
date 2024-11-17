import {atomWithQuery} from "jotai-tanstack-query";
import Papa, {ParseResult} from "papaparse";
import {useState} from "react";

const wienerLinienStationsAtom = atomWithQuery((get) =>
    ({
        queryKey: ['stations'],
        queryFn: async () => {
            const response = await fetch('https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv');
            //const responseAsText = await response.text();


            console.log("Stations as String:", response);
            return response;

        }
    })
);

export {wienerLinienStationsAtom};