import { getSocket } from "./sockets.js";

const messages = document.getElementById("jsMessages");
const sendMessage = document.getElementById("jsSendMsg");
const hints = document.getElementById("jsHints");
const sendHint = document.getElementById("jsSendHint");
const hintOverlay = document.getElementById("jsHintOverlay");

const appendMessage = (text, nickname, color) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span style="color: ${color}">${nickname}:</span> ${text}
  `;
  messages.appendChild(li);
  const position = messages.scrollHeight;
  messages.scrollTop = position;
};

const appendHint = (text, nickname, color) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span style="color: ${color}">${nickname}:</span> ${text}
  `;
  hints.appendChild(li);
  const position = hints.scrollHeight;
  hints.scrollTop = position;
};

const appendVote = (nickname, targetNickname, color, targetColor) => {
  const li = document.createElement("li");
  li.innerHTML = `<span style="color: ${color}">${nickname}</span>님이 <span style="color: ${targetColor}">${targetNickname}</span>님을 라이어로 지목했습니다.`;
  hints.appendChild(li);
  const position = hints.scrollHeight;
  hints.scrollTop = position;
};

const appendCancelVote = (nickname, targetNickname, color, targetColor) => {
  const li = document.createElement("li");
  li.innerHTML = `<span style="color: ${color}">${nickname}</span>님이 <span style="color: ${targetColor}">${targetNickname}</span>님에 대한 지목을 취소했습니다.`;
  hints.appendChild(li);
  const position = hints.scrollHeight;
  hints.scrollTop = position;
};

const handleSendMessage = (event) => {
  event.preventDefault();
  const input = sendMessage.querySelector("input");
  const { value } = input;
  if (value === "") return;
  getSocket().emit(window.events.sendMessage, { message: value });
  input.value = "";
};

const handleSendHint = (event) => {
  event.preventDefault();
  const input = sendHint.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendHint, { hint: value });
  input.value = "";
  hintOverlay.style.display = "none";
};

export const handleNewMessage = ({ message, nickname, color }) => {
  appendMessage(message, nickname, color);
};

export const handleNewHint = ({ hint, nickname, color }) => {
  appendHint(hint, nickname, color);
};

export const handleVoteStarted = () => {
  const voteCounters = document.querySelectorAll(".voteCounter");
  const players = document.querySelectorAll(".player");
  console.log(voteCounters);
  voteCounters.forEach((element) => {
    element.style.display = "flex";
  });
  players.forEach((element) => {
    element.classList.add("selectable");
    element.addEventListener("click", votePlayer(element.id));
  });
};

const votePlayer = (id) => {
  return () => {
    getSocket().emit(window.events.sendVote, { target: id });
  };
};

const cancelVotePlayer = (id) => {
  return () => {
    getSocket().emit(window.events.cancelVote, { target: id });
  };
};

const updateVoted = () => {
  const voted = document.querySelector(".voted");
  if (voted) {
    voted.removeEventListener("click", votePlayer(voted.id));
    voted.addEventListener("click", cancelVotePlayer(voted.id));
  } else {
    const players = document.querySelectorAll(".player");
    players.forEach((element) => {
      console.log(element);
      element.removeEventListener("click", cancelVotePlayer(element.id));
      element.addEventListener("click", votePlayer(element.id));
    });
  }
};

export const handleNewVote = ({
  targetNickname,
  targetColor,
  nickname,
  color,
}) => {
  appendVote(nickname, targetNickname, color, targetColor);
  updateVoted();
};

export const handleNewCancelVote = ({
  targetNickname,
  targetColor,
  nickname,
  color,
}) => {
  appendCancelVote(nickname, targetNickname, color, targetColor);
  updateVoted();
};

if (sendMessage) {
  sendMessage.addEventListener("submit", handleSendMessage);
}

if (sendHint) {
  sendHint.addEventListener("submit", handleSendHint);
}
