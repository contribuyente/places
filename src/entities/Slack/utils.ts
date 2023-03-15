import logger from "decentraland-gatsby/dist/entities/Development/logger"
import env from "decentraland-gatsby/dist/utils/env"
import fetch from "isomorphic-fetch"
import isURL from "validator/lib/isURL"

import { PlaceAttributes } from "../Place/types"
import { placeUrl } from "../Place/utils"

const SLACK_WEBHOOK = env("SLACK_WEBHOOK", "")

if (!isURL(SLACK_WEBHOOK)) {
  logger.log(`missing config SLACK_WEBHOOK`)
}

export async function notifyNewPlace(place: PlaceAttributes) {
  logger.log(`sending new place "${place.id}" to slack`)
  await sendToSlack({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:tada: New place added: <${placeUrl(place)}|${
            place.base_position
          }>`,
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: [`${place.title}`, place.description].join("\n\n"),
        },
        accessory: {
          type: "image",
          image_url: place.image,
          alt_text: place.title || "Place - Decentraland",
        },
      },
    ],
  })
}

export async function notifyUpdatePlace(place: PlaceAttributes) {
  logger.log(`sending update place "${place.id}" to slack`)
  await sendToSlack({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:tada: Place updated: <${placeUrl(place)}|${
            place.base_position
          }>`,
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: [`${place.title}`, place.description].join("\n\n"),
        },
        accessory: {
          type: "image",
          image_url: place.image,
          alt_text: place.title || "Place - Decentraland",
        },
      },
    ],
  })
}

export async function notifyDisablePlaces(places: PlaceAttributes[]) {
  logger.log(
    `sending disable place "${places
      .map((place) => place.id)
      .join(", ")}" to slack`
  )
  await sendToSlack({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:tada: ${places.length} ${
            places.length > 1 ? "places" : "place"
          } disabled in base positions: ${places
            .map((place) => place.base_position)
            .join(" - ")}`,
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: places
            .map((place) => `${place.title} (${place.base_position})`)
            .join("\n\n"),
        },
      },
    ],
  })
}

async function sendToSlack(body: {}) {
  if (!isURL(SLACK_WEBHOOK)) {
    return
  }

  try {
    const response = await fetch(SLACK_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.text()

    if (response.status >= 400) {
      logger.error(`Slack bad request: ${data} (${response.status})`)
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Slack service error: ` + error.message, error)
    }
  }
}
