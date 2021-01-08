import findLastIndex from "lodash/findLastIndex";
import { auth } from "mm-firestore";
import qs from "qs";
import { useEffect, useState } from "react";



const ABSOLUTE_PREFIX = "/";
const IMG_FOLDER = `${ABSOLUTE_PREFIX}generated/img/`;
const FILE_ENDING = ".jpg";
const WIDTH = "_78";
export const imgPathFn = (image) => IMG_FOLDER + image + WIDTH + FILE_ENDING;

export function is_touch_device() {
  try {
    let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

    let mq = function (query) {
      return window.matchMedia(query).matches;
    };

    if (
      "ontouchstart" in window ||
      (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)
    ) {
      return true;
    }

    return mq(["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(""));
  } catch (e) {
    console.error("(Touch detect failed)", e);
    return false;
  }
}

export const isForImagePreview =
  typeof qs.parse(window.location.search, { ignoreQueryPrefix: true }).isPreview !== "undefined";

export const deckIdFromUrl = qs.parse(window.location.search, { ignoreQueryPrefix: true }).deckId;

// unused at the moment
export const insertAtCaret = (txtarea, text, setValue) => {
  const scrollPos = txtarea.scrollTop;
  let strPos = 0;

  const br =
    txtarea.selectionStart || txtarea.selectionStart === "0"
      ? "ff"
      : document.selection
      ? "ie"
      : false;
  if (br === "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart("character", -txtarea.value.length);
    strPos = range.text.length;
  } else if (br === "ff") strPos = txtarea.selectionStart;

  const front = txtarea.value.substring(0, strPos);
  const back = txtarea.value.substring(strPos, txtarea.value.length);

  const newValue = front + text + back;

  // will be overridden by setValue
  txtarea.value = newValue;
  setValue(newValue);

  // txtarea.value
  setTimeout(() => {
    strPos = strPos + text.length;
    if (br === "ie") {
      txtarea.focus();
      var range = document.selection.createRange();
      range.moveStart("character", -txtarea.value.length);
      range.moveStart("character", strPos);
      range.moveEnd("character", 0);
      range.select();
    } else if (br === "ff") {
      txtarea.selectionStart = strPos;
      txtarea.selectionEnd = strPos;
      txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
  }, 500); // TODO async issue? move to useasyncEffect in editor
};

function listenUserAuth(setCurrentUser) {
  return auth.onAuthStateChanged((user) => {
    setCurrentUser(auth.currentUser);
  });
}
export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const listen = listenUserAuth(setCurrentUser);
    return () => listen();
  }, []);

  return currentUser;
};

export const matchSelectedTabOutOfPath = (tabsConfig) =>
  findLastIndex(tabsConfig, (tab) => window.location.pathname.startsWith(tab));
