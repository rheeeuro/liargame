import { getSocket } from "./sockets.js";

const answerOverlay = document.getElementById("jsAnswerOverlay");
const answerForm = document.getElementById("jsSendAnswer");

const handleAnswerFormSubmit = (e) => {
  e.preventDefault();
  const input = answerForm.querySelector("input");
  const { value } = input;
  input.value = "";
  closeAnswerModal();
  getSocket().emit(window.events.sendAnswer, { input: value });
};

export const handleRequestAnswer = (id) => {
  if (getSocket().id === id) {
    answerOverlay.style.display = "flex";
  }
};

export const closeAnswerModal = () => {
  answerOverlay.style.display = "none";
};

if (answerForm) {
  answerForm.addEventListener("submit", handleAnswerFormSubmit);
}
