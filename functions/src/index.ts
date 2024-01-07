/* eslint-disable */
import * as functions from "firebase-functions";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({ origin: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require("firebase-admin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
admin.initializeApp();
const db = admin.firestore();

import OpenAI from "openai";

// Set up OpenAI configuration
const openai = new OpenAI({
  apiKey: functions.config().openai.key,
});

// Define the Cloud Function
export const generatePoem = functions.https.onRequest(
  async (request, response) => {
    cors(request, response, async () => {
      try {
        const { sampleText, userId, userName } = request.body.data;

        if (!sampleText) {
          response.status(400).send("No text provided");
          return;
        }

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant skilled in generating poems.",
            },
            {
              role: "user",
              content: `Generate a poem based on this text:  ${sampleText}`,
            },
          ],
        };
        const RES: OpenAI.Chat.ChatCompletion =
          await openai.chat.completions.create(params);
        const POEM = RES.choices[0].message.content || "";
        const userRef = db.collection("users").doc(userId);

        // First, set/update user name without touching the poems array
        await userRef.set({ name: userName }, { merge: true });

        // Then, update the poems array separately
        await userRef.update({
          poems: admin.firestore.FieldValue.arrayUnion({
            poem: POEM,
            dateCreated: admin.firestore.Timestamp.now(), // Use Timestamp.now() instead of serverTimestamp()
          }),
        });

        response.send({
          data: { POEM },
        });
      } catch (error) {
        console.error(error);
        response.status(500).send("Error generating poem");
      }
    });
  }
);
