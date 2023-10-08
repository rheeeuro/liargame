import { hintIntervalId, setNotifs } from "./players.js";
import { getSocket } from "./sockets.js";

const chatContainer = document.getElementById("jsChatContainer");
const hintContainer = document.getElementById("jsHintContainer");
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
  const position = chatContainer.scrollHeight;
  chatContainer.scrollTop = position;
};

const appendHint = (text, nickname, color) => {
  const li = document.createElement("li");
  li.classList.add("hintList");
  li.innerHTML = `
    <span style="color: ${color}">${nickname}:</span> ${text}
  `;
  hints.appendChild(li);
  const position = hintContainer.scrollHeight;
  hintContainer.scrollTop = position;
};

const appendVote = (nickname, targetNickname, color, targetColor) => {
  const li = document.createElement("li");
  li.innerHTML = `<span style="color: ${color}">${nickname}</span>님이 <span style="color: ${targetColor}">${targetNickname}</span>님을 라이어로 지목했습니다.`;
  hints.appendChild(li);
  const position = hintContainer.scrollHeight;
  hintContainer.scrollTop = position;
};

const appendCancelVote = (nickname, targetNickname, color, targetColor) => {
  const li = document.createElement("li");
  li.innerHTML = `<span style="color: ${color}">${nickname}</span>님이 <span style="color: ${targetColor}">${targetNickname}</span>님에 대한 지목을 취소했습니다.`;
  hints.appendChild(li);
  const position = hintContainer.scrollHeight;
  hintContainer.scrollTop = position;
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
  autoSendHint(value);
  input.value = "";
};

export const autoSendHint = (value) => {
  clearInterval(hintIntervalId);
  document.getElementById("jsTimer").innerHTML = "";
  getSocket().emit(window.events.sendHint, { hint: value });
  closeHintModal();
};

export const closeHintModal = () => {
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

export const handleVoteEnded = ({ nickname, color, liarId }) => {
  console.log("a");
  setNotifs(
    `투표가 종료되었습니다, 라이어는 <span style="color:${color}">${nickname}</span>님이었습니다.<br/>라이어는 정답을 맞춰주세요.`
  );
  disableVote();
};

export const disableVote = () => {
  const voteCounters = document.querySelectorAll(".voteCounter");
  const players = document.querySelectorAll(".player");
  console.log(voteCounters);
  voteCounters.forEach((element) => {
    element.style.display = "none";
  });
  players.forEach((element) => {
    element.classList.remove("voted");
    element.classList.remove("selectable");

    const elClone = element.cloneNode(true);
    element.parentNode.replaceChild(elClone, element);
  });
};

export const votePlayer = (id) => {
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
