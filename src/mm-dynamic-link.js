import * as axios from "axios";
import { FIREBASE_API_CONFIG } from "mm-firestore";

const API_LINK = "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=";
export function generateDynamicLink(originLink) {
  return axios.post(API_LINK + FIREBASE_API_CONFIG.apiKey, {
    dynamicLinkInfo: {
      domainUriPrefix: "https://minionmastersmanager.page.link",
      link: originLink,
    },
    suffix: {
      option: "SHORT",
    },
  });
}
