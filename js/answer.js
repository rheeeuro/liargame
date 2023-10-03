import { getSocket } from "./sockets.js";

const answerOverlay = document.getElementById("jsAnswerOverlay");
const answerForm = document.getElementById("jsSendAnswer");

const handleAnswerFormSubmit = (e) => {
  e.preventDefault();
  const input = answerForm.querySelector("input");
  const { value } = input;
  input.value = "";
  answerOverlay.style.display = "none";
  getSocket().emit(window.events.sendAnswer, { answer: value });
};

export const handleRequestAnswer = ({ id }) => {
  if (getSocket().id === id) {
    answerOverlay.style.display = "flex";
  }
};

if (answerForm) {
  answerForm.addEventListener("submit", handleAnswerFormSubmit);
}
