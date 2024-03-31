import React from "react";
import { settings } from "../constants";
import { Short } from '@/services/AppContext'


export const _addShort = async (url: string) => {
  try {
    const response = await fetch(`${settings.API_URL}/shorts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    });

    const data = await response.json();


    return data;
  } catch (err) {
    console.error("There was a problem with your fetch operation:", err);
  }
}
/**
 * Gets a collection of shorts on startup
 *
 * @returns Promise<Short[]>
 */
export const _getShorts = async () => {
  try {
    const url = `${settings.API_URL}/shorts`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    throw new Error("Network response was not ok");
  }
};

/**
 * Deletes a single shortcode
 * @param shortCode string
 * @returns Promise<bool>
 */
export const _deleteShort = async (shortCode: string) => {
  try {
    const url = `${settings.API_URL}/shorts/${shortCode}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const ok = response.status === 204;

    return ok;
  } catch (err) {
    throw new Error("Network response was not ok");
  }
};

/**
 * Deletes a single shortcode
 * @param shortCode string
 * @returns Promise<bool>
 */
export const _saveShort = async (short: Short, editedShort: Short) => {

    try {
      const response = await fetch(
        `${settings.API_URL}/shorts/${short.shortcode}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(editedShort)
        },
      
      );
      const done = response.status === 200;
      return done;
    } catch (err) {
      console.error(err);
      throw new Error("Error: couldn't save short");
    }
  };

