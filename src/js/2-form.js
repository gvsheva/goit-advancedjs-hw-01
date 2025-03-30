"use strict";

import iziToast from "izitoast";

const lsKey = "feedback-form-state"
const form = document.querySelector("#feedback-form");

function formData() {
  const formData = new FormData(form);
  const entries = formData.entries();
  const data = Object.fromEntries(
    Array.from(entries, ([key, value]) => [key, value.trim()])
  );
  return data;
}

function validateState(state) {
  const { email, message } = state;
  const isValidEmail = email.length > 0 && email.includes("@");
  const isValidMessage = message.length > 0;
  return isValidEmail && isValidMessage;
}

function loadState() {
  const state = (() => {
    try {
      return JSON.parse(localStorage.getItem(lsKey)) || {};
    } catch (e) {
      return {};
    }
  })();
  form.elements.email.value = state.email || "";
  form.elements.message.value = state.message || "";
}

function saveState() {
  const state = formData();
  localStorage.setItem(lsKey, JSON.stringify(state));
}

addEventListener("submit", (e) => {
  e.preventDefault();
  const state = formData();
  if (!validateState(state)) {
    iziToast.error({
      title: "Error",
      message: "Fill in all the fields",
    });
    return;
  }
  console.log(state);
  form.reset();
  localStorage.removeItem(lsKey);
});

form.addEventListener("input", saveState);

loadState();