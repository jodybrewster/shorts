// init-mongo.js

db = db.getSiblingDB("urlShortener");

db.createCollection("Urls", {
  autoIndexId: true,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["url", "shortcode"],
      properties: {
        url: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        shortcode: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        amountVisited: {
          bsonType: "number",
          description: "Amount of times the url was visit}ed",
        },
      },
    },
  },
});

db.Urls.createIndex({ shortcode: 1 }, { unique: true });

db.Urls.insertOne({
  url: "https://www.google.com",
  shortcode: "google",
});

print("Initialized urlShortener database with urls collection");
