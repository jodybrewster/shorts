// src/controllers/urlController.ts
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import UrlModel from "../models/Url"; // Import your Url model

const fourOhFourText = "<html><head><head><body><h1>404</h1><p>url doesn't exist</p></body></html>";
const general500Response = {
  errors: [
    {
      status: 500,
      detail: "Server error",
    },
  ],
};

// Function to create a shortened URL
export const createShortUrl = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { url } = req.body;
    const shortcode = nanoid(7); // Generate a 7-character shortcode

    const newUrl = await UrlModel.create({ url, shortcode });
    res.status(201).json(newUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json(general500Response);
  }
};

// Function to redirect to the original URL using a shortcode
export const redirectToUrl = async (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;
    const urlEntry = await UrlModel.findOne({ shortcode });
    if (urlEntry) {
      return res.redirect(urlEntry.url);
    }
    return res
      .status(404)
      .send(
        fourOhFourText
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(general500Response);
  }
};

// Function to update an existing shortened URL
export const updateUrl = async (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;
    const { url } = req.body;
    const updatedUrl = await UrlModel.findOneAndUpdate(
      { shortcode },
      { url },
      { new: true }
    );
    if (updatedUrl) {
      return res.json(updatedUrl);
    }
    return res.status(404).send(fourOhFourText)
  } catch (error) {
    res.status(500).json(general500Response);
  }
};

// Function to get all of the short urls
export const getShorts = async (req: Request, res: Response) => {
  try {
    const foundShorts = await UrlModel.find();
    console.log("foundShorts", foundShorts);
    if (foundShorts) {
      return res.json({ data: foundShorts });
    }
    return res.status(404).send(fourOhFourText)
  } catch (error) {
    console.error(error);
    res.status(500).json(general500Response);
  }
};

// Function to delete a shortened URL
export const deleteUrl = async (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;
    console.log(shortcode);
    const deleted = await UrlModel.findOneAndDelete({ shortcode });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).send(fourOhFourText)
  } catch (error) {
    res.status(500).json(general500Response);
  }
};
