import { closeAnswerModal } from "./answer.js";
import {
  autoSendHint,
  closeHintModal,
  disableVote,
  updateVoted,
} from "./chat.js";
import { getSocket } from "./sockets.js";

const board = document.getElementById("jsBoard");
const notifs = document.getElementById("jsServerNotifs");
const readyBtn = document.getElementById("jsReadyBtn");
const cardCategory = document.getElementById("jsCategory");
const cardWord = document.getElementById("jsWord");
const timer = document.getElementById("jsTimer");
const finalOverlay = document.getElementById("jsFinalOverlay");
const finalPlayer = document.getElementById("jsFinalPlayer");
const finalYes = document.getElementById("jsFinalYes");
const finalNo = document.getElementById("jsFinalNo");
export const chatInput = document.getElementById("jsChatInput");

const WORD_TIME = 10;
const HINT_TIME = 30;
const DUPLICATED_TIME = 5;
const RESULT_TIME = 10;
const FINAL_TIME = 30;
const SECOND_HINT_TIME = 60;

export let hintIntervalId = null;
let wordIntervalId = null;
let duplicatedIntervalId = null;
let resultIntervalId = null;
let finalAnounceIntervalId = null;
let secondHintIntervalId = null;

let inProgress = false;

export const clearAllInterval = () => {
  clearInterval(hintIntervalId);
  clearInterval(wordIntervalId);
  clearInterval(duplicatedIntervalId);
  clearInterval(resultIntervalId);
  clearInterval(finalAnounceIntervalId);
  clearInterval(secondHintIntervalId);
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
    ${
      inProgress
        ? ""
        : `
      <div class="point">
        <svg fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-diamond">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M6 2H16V3H17V4H18V5H19V6H20V12H19V13H18V14H17V15H16V16H15V17H14V18H13V19H12V20H10V19H9V18H8V17H7V16H6V15H5V14H4V13H3V12H2V6H3V5H4V4H5V3H6V2M15 5V4H14V6H15V7H17V6H16V5H15M12 6V4H10V6H9V7H13V6H12M8 6V4H7V5H6V6H5V7H7V6H8M4 11H5V12H6V13H7V14H8V12H7V9H4V11M10 12V16H12V12H13V9H9V12H10M14 12V14H15V13H16V12H17V11H18V9H15V12H14Z"></path>
          </g>
        </svg>
        ${player.point}
      </div>
      <div class="ready">
        <svg fill="${player.color}" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="playerReady">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M4 11H6V12H7V13H8V14H10V13H11V12H12V11H13V10H14V9H15V8H16V7H17V6H19V8H18V9H17V10H16V11H15V12H14V13H13V14H12V15H11V16H10V17H8V16H7V15H6V14H5V13H4V11Z"></path>
          </g>
        </svg>
      </div>
      `
    }
    <svg fill="${
      player.color
    }" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="user">
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
      <svg fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="memory-skull">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M6 2H8V1H14V2H16V3H17V4H18V5H19V7H20V14H19V16H18V20H17V21H5V20H4V16H3V14H2V8H3V5H4V4H5V3H6V2M15 5V4H13V3H9V4H7V5H6V6H5V9H4V13H5V15H6V19H8V17H10V19H12V17H14V19H16V15H17V13H18V8H17V6H16V5H15M7 8H10V11H7V8M12 11V8H15V11H12M10 13H12V15H10V13Z"></path>
        </g>
      </svg>
      ${player.voteCount}
    </div>
    <svg fill="${player.color}" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="user">
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
  updateVoted();
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
    updateTimer(time);

    if (time === 0) {
      timer.classList.remove("tick");
      timer.innerHTML = "";
      clearInterval(wordIntervalId);
    }
  }, 1000);
};

export const handleSecondHintNotif = () => {
  clearInterval(hintIntervalId);
  setNotifs(
    "첫번째 제시어 설명이 모두 끝났습니다. <br/>두번째 설명 전, 60초간 자유롭게 대화해주세요."
  );
  chatInput.style.display = "flex";
  let time = SECOND_HINT_TIME + 1;
  secondHintIntervalId = setInterval(() => {
    time -= 1;
    updateTimer(time);

    if (time === 0) {
      timer.classList.remove("tick");
      timer.innerHTML = "";
      clearInterval(secondHintIntervalId);
    }
  }, 1000);
};

export const handleHintTurn = ({ id, nickname, color }) => {
  clearInterval(hintIntervalId);
  chatInput.style.display = "none";
  setNotifs(
    `<span style="color:${color}">${nickname}</span>님의 차례입니다. <br/>30초 내에 제시어에 대한 설명을 작성해주세요.`
  );

  if (getSocket().id === id) {
    requestHint();
  }

  let time = HINT_TIME + 1;
  hintIntervalId = setInterval(() => {
    time -= 1;
    updateTimer(time);

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

  timer.classList.remove("tick");
  timer.innerHTML = "";
  finalPlayer.innerHTML = "";
  chatInput.style.display = "flex";
  setNotifs(
    "게임이 종료되었습니다. <br/>다음 게임 시작을 위해 준비버튼을 눌러주세요."
  );
  cardCategory.innerHTML = "카테고리";
  cardWord.innerHTML = "제시어";
  document.getElementById("jsHints").innerHTML = "";
  readyBtn.style.display = "block";
  finalOverlay.style.display = "none";
};

export const handleVoteNotification = () => {
  clearInterval(hintIntervalId);
  chatInput.style.display = "flex";
  timer.classList.remove("tick");
  timer.innerHTML = "";
  setNotifs(
    "제시어 설명이 종료되었습니다. <br/>라이어로 의심되는 사람을 선택해주세요."
  );
};

export const handleRevoteNotification = () => {
  timer.classList.remove("tick");
  timer.innerHTML = "";
  setNotifs("재투표를 진행합니다. <br/>라이어로 의심되는 사람을 선택해주세요.");
};

export const handleInvalidVote = ({ duplicated }) => {
  if (duplicated) {
    setNotifs(
      `투표가 종료되었습니다. <br/>최다득표자가 여러명이므로 5초 뒤 재투표를 진행합니다.`
    );
  } else {
    setNotifs(
      `투표가 종료되었습니다. <br/>과반수를 넘지 못하여 5초 뒤 재투표를 진행합니다.`
    );
  }
  disableVote();
  let time = DUPLICATED_TIME + 1;
  duplicatedIntervalId = setInterval(() => {
    time -= 1;
    updateTimer(time);

    if (time === 0) {
      timer.classList.remove("tick");
      timer.innerHTML = "";
      clearInterval(duplicatedIntervalId);
    }
  }, 1000);
};

export const handleLiarWin = ({ answer }) => {
  setNotifs(
    `라이어가 정답을 맞춰 라이어가 승리했습니다.</br> 정답은 '<span style="color: blue;">${answer}</span>'였습니다.`
  );
  resultTimer();
  chatInput.style.display = "flex";
};

export const handleLiarLose = ({ liarId, input, answer }) => {
  if (getSocket().id === liarId) {
    setNotifs(
      `라이어가 정답을 맞추지 못해 시민이 승리했습니다.</br> 정답은 '<span style="color: blue;">${answer}</span>'였습니다. <br/>`
    );
  } else {
    setNotifs(
      `라이어가 정답을 맞추지 못해 시민이 승리했습니다.</br> 라이어의 오답은 '<span style="color: blue;">${input}</span>'였습니다. <br/>`
    );
  }
  resultTimer();
  chatInput.style.display = "flex";
};

export const handleVoteFailed = ({ nickname, color }) => {
  setNotifs(
    `투표가 종료되었습니다, 라이어는 <span style="color:${color}">${nickname}</span>님이었습니다.<br/>라이어를 찾지 못해 라이어가 승리합니다.`
  );
  resultTimer();
};

const resultTimer = () => {
  let time = RESULT_TIME + 1;
  resultIntervalId = setInterval(() => {
    time -= 1;
    updateTimer(time);

    if (time === 0) {
      timer.classList.remove("tick");
      timer.innerText = "";
    }
  }, 1000);
};

const updateTimer = (text) => {
  if (!timer.classList.contains("tick")) {
    timer.classList.add("tick");
  }
  timer.innerHTML = `
  <svg fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-clock">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M10 5H12V11H13V12H14V13H15V15H13V14H12V13H11V12H10V5M15 1V2H17V3H18V4H19V5H20V7H21V15H20V17H19V18H18V19H17V20H15V21H7V20H5V19H4V18H3V17H2V15H1V7H2V5H3V4H4V3H5V2H7V1H15M14 3H8V4H6V5H5V6H4V8H3V14H4V16H5V17H6V18H8V19H14V18H16V17H17V16H18V14H19V8H18V6H17V5H16V4H14V3Z"></path>
    </g>
  </svg>
  ${text}
  `;
};

export const handleFinalAnounce = ({ voted }) => {
  setNotifs(
    `<span style="color:${voted.color}">${voted.nickname}</span>님이 라이어로 지목되셨습니다. <br/>30초간 최후의 변론을 해주세요.`
  );
  let time = FINAL_TIME + 1;
  finalAnounceIntervalId = setInterval(() => {
    time -= 1;
    updateTimer(time);

    if (time === 0) {
      clearInterval(finalAnounceIntervalId);
      timer.classList.remove("tick");
      timer.innerText = "";
      requestFinalVote(voted);
    }
  }, 1000);
};

const requestFinalVote = (voted) => {
  finalPlayer.innerHTML = `
    <svg fill="${voted.color}" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="user">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M9 3H13V4H14V5H15V9H14V10H13V11H9V10H8V9H7V5H8V4H9V3M10 8V9H12V8H13V6H12V5H10V6H9V8H10M7 12H15V13H17V14H18V15H19V19H3V15H4V14H5V13H7V12M6 16H5V17H17V16H16V15H14V14H8V15H6V16Z"></path>
      </g>
    </svg>
    <h1>${voted.nickname}</h1>
  `;
  finalOverlay.style.display = "flex";
};

export const handleFinalNotif = ({ yes, no, total, voted }) => {
  setNotifs(
    `<span style="color:${voted.color}">${voted.nickname}</span>님에 대한 최종투표 진행중입니다.<br/>
    찬성: ${yes} / 반대: ${no} (전체: ${total})`
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

if (finalYes) {
  finalYes.addEventListener("click", () => {
    getSocket().emit(window.events.finalYes);
    finalOverlay.style.display = "none";
  });
}
if (finalNo) {
  finalNo.addEventListener("click", () => {
    getSocket().emit(window.events.finalNo);
    finalOverlay.style.display = "none";
  });
}
