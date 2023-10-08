import { closeAnswerModal } from "./answer.js";
import {
  autoSendHint,
  closeHintModal,
  disableVote,
  votePlayer,
} from "./chat.js";
import { getSocket } from "./sockets.js";

const board = document.getElementById("jsBoard");
const notifs = document.getElementById("jsServerNotifs");
const readyBtn = document.getElementById("jsReadyBtn");
const cardCategory = document.getElementById("jsCategory");
const cardWord = document.getElementById("jsWord");
const timer = document.getElementById("jsTimer");

const WORD_TIME = 10;
const HINT_TIME = 30;
const DUPLICATED_TIME = 5;

export let hintIntervalId = null;
let wordIntervalId = null;
let duplicatedIntervalId = null;

let inProgress = false;

export const clearAllInterval = () => {
  clearInterval(hintIntervalId);
  clearInterval(wordIntervalId);
  clearInterval(duplicatedIntervalId);
};

const addPlayers = (players) => {
  if (!inProgress) {
    if (players.length >= 3) {
      readyBtn.style.display = "block";
    } else {
      readyBtn.style.display = "none";
    }
  }

  board.innerHTML = "";
  players.forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.id = player.id;
    playerElement.classList.add("player");
    if (player.ready && inProgress === false) {
      playerElement.classList.add("ready");
    }
    playerElement.innerHTML = `
    <div class="ready">
      <svg fill="${player.color}" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="playerReady">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M4 11H6V12H7V13H8V14H10V13H11V12H12V11H13V10H14V9H15V8H16V7H17V6H19V8H18V9H17V10H16V11H15V12H14V13H13V14H12V15H11V16H10V17H8V16H7V15H6V14H5V13H4V11Z"></path>
        </g>
      </svg>
    </div>
    <div class="voteCounter" style="display: none;">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
        />
      </svg>
      ${player.voteCount}
    </div>
    <svg fill="${player.color}" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="player">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M9 3H13V4H14V5H15V9H14V10H13V11H9V10H8V9H7V5H8V4H9V3M10 8V9H12V8H13V6H12V5H10V6H9V8H10M7 12H15V13H17V14H18V15H19V19H3V15H4V14H5V13H7V12M6 16H5V17H17V16H16V15H14V14H8V15H6V16Z"></path>
      </g>
    </svg>
    <h1>${player.nickname}</h1>
    `;
    board.appendChild(playerElement);
  });
};

const addVotePlayers = (players) => {
  const voted = players.filter((p) => p.id === getSocket().id)[0].voted;
  board.innerHTML = "";
  console.log(voted);
  players.forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.id = player.id;
    playerElement.classList.add("selectable");
    playerElement.classList.add("player");

    if (player.id === voted) {
      playerElement.classList.add("voted");
    }
    playerElement.innerHTML = `
    <div class="voteCounter">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
        />
      </svg>
      ${player.voteCount}
    </div>
    

    <svg fill="${player.color}" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="player">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M9 3H13V4H14V5H15V9H14V10H13V11H9V10H8V9H7V5H8V4H9V3M10 8V9H12V8H13V6H12V5H10V6H9V8H10M7 12H15V13H17V14H18V15H19V19H3V15H4V14H5V13H7V12M6 16H5V17H17V16H16V15H14V14H8V15H6V16Z"></path>
      </g>
    </svg>

    <h1>${player.nickname}</h1>
    `;
    board.appendChild(playerElement);
  });
};

export const setNotifs = (text) => {
  notifs.innerHTML = "";
  notifs.innerHTML = `<div>${text}</div>`;
};

const setCard = (liar, word) => {
  cardCategory.innerHTML = `
    <span>카테고리</span>
    <span class="bold">${word.category}</span>
  `;
  cardWord.innerHTML =
    getSocket().id === liar.id
      ? `<span class="liar">당신은<br/>라이어<br/>입니다</span>`
      : `<span>제시어</span><span class="bold">${word.word}</span>`;
};

const requestHint = () => {
  document.getElementById("jsHintOverlay").style.display = "flex";
};

export const handlePlayerUpdate = ({ sockets }) => {
  let ready = false;
  sockets.forEach((s) => {
    if (s.id === getSocket().id) ready = s.ready;
  });

  if (ready) {
    readyBtn.innerText = "준비 완료";
    readyBtn.classList.add("ready");
  } else {
    readyBtn.innerText = "준비";
    readyBtn.classList.remove("ready");
  }

  if (inProgress) {
    readyBtn.style.display = "none";
  } else {
    readyBtn.style.display = "flex";
  }

  addPlayers(sockets);
  getSocket().emit(window.events.requestUpdateColor);
};

export const handlePlayerVoteUpdate = ({ sockets }) => {
  addVotePlayers(sockets);
};

export const handleGameStarted = ({ liar, word }) => {
  readyBtn.style.display = "none";
  inProgress = true;
  setNotifs(
    "라이어가 선정되었습니다. <br/>좌측에 마우스를 올려 제시어를 확인해주세요."
  );
  setCard(liar, word);

  let time = WORD_TIME + 1;
  wordIntervalId = setInterval(() => {
    time -= 1;
    timer.innerText = time;

    if (time === 0) {
      timer.innerHTML = "";
      clearInterval(wordIntervalId);
    }
  }, 1000);
};

export const handleHintTurn = ({ id, nickname, color }) => {
  clearInterval(hintIntervalId);
  setNotifs(
    `<span style="color:${color}">${nickname}</span>님의 차례입니다. <br/>30초 내에 제시어에 대한 설명을 작성해주세요.`
  );

  if (getSocket().id === id) {
    requestHint();
  }

  let time = HINT_TIME + 1;
  hintIntervalId = setInterval(() => {
    time -= 1;
    timer.innerText = time;

    if (time === 0 && getSocket().id === id) {
      autoSendHint("시간 초과");
    }
  }, 1000);
};

export const handleGameEnded = () => {
  inProgress = false;
  clearAllInterval();
  closeAnswerModal();
  closeHintModal();

  timer.innerHTML = "";
  setNotifs(
    "게임이 종료되었습니다. <br/>다음 게임이 시작될 때까지 기다려주세요."
  );
  cardCategory.innerHTML = "카테고리";
  cardWord.innerHTML = "제시어";
  document.getElementById("jsHints").innerHTML = "";
  readyBtn.style.display = "block";
};

export const handleVoteNotification = () => {
  clearInterval(hintIntervalId);
  timer.innerHTML = "";
  setNotifs(
    "제시어 설명이 종료되었습니다. <br/>라이어로 의심되는 사람을 선택해주세요."
  );
};

export const handleRevoteNotification = () => {
  timer.innerHTML = "";
  setNotifs("재투표를 진행합니다. <br/>라이어로 의심되는 사람을 선택해주세요.");
};

export const handleDuplicatedVote = () => {
  setNotifs(
    `투표가 종료되었습니다. <br/>최다득표자가 여러명이므로 5초 뒤 재투표를 진행합니다.`
  );
  disableVote();
  let time = DUPLICATED_TIME + 1;
  duplicatedIntervalId = setInterval(() => {
    time -= 1;
    timer.innerText = time;

    if (time === 0) {
      timer.innerHTML = "";
      clearInterval(duplicatedIntervalId);
    }
  }, 1000);
};

export const handleLiarWin = ({ answer }) => {
  setNotifs(
    `라이어가 정답을 맞춰 라이어가 승리했습니다.</br> 정답은 ${answer}였습니다.`
  );
};

export const handleLiarLose = ({ answer }) => {
  setNotifs(
    `라이어가 정답을 맞추지 못해 시민이 승리했습니다.</br> 정답은 ${answer}였습니다.`
  );
};

export const handleVoteFailed = ({ nickname, color }) => {
  setNotifs(
    `투표가 종료되었습니다, 라이어는 <span style="color:${color}">${nickname}</span>님이었습니다.<br/>라이어를 찾지 못해 라이어가 승리합니다.`
  );
};

if (readyBtn) {
  readyBtn.addEventListener("click", () => {
    if (readyBtn.classList.contains("ready")) {
      readyBtn.innerText = "준비";
      readyBtn.classList.remove("ready");
      getSocket().emit(window.events.cancelReadyGame);
    } else {
      readyBtn.innerText = "준비 완료";
      readyBtn.classList.add("ready");
      getSocket().emit(window.events.readyGame);
    }
  });
}
