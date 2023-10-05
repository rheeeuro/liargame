import { autoSendHint } from "./chat.js";
import { getSocket } from "./sockets.js";

const board = document.getElementById("jsBoard");
const notifs = document.getElementById("jsServerNotifs");
const readyBtn = document.getElementById("jsReadyBtn");
const card = document.getElementById("jsCard");
const timer = document.getElementById("jsTimer");

export let hintIntervalId = null;

const addPlayers = (players) => {
  if (players.length >= 3) {
    readyBtn.style.display = "block";
  } else { 
    readyBtn.style.display = "none";
  }
  board.innerHTML = "";
  players.forEach((player) => {
    const playerElement = document.createElement("div");
    playerElement.id = player.id;
    playerElement.classList.add("player");
    playerElement.innerHTML = `
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="${player.color}"
      class="svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="${player.color}"
      class="svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
    <h1>${player.nickname}</h1>
    `;
    board.appendChild(playerElement);
  });
};

const setNotifs = (text) => {
  notifs.innerHTML = "";
  notifs.innerHTML = `<div>${text}</div>`;
};

const setCard = (liar, word) => {
  card.innerHTML = `
  <div class="cardContent front" id="jsCategory">
    <span>카테고리</span>
    <span class="bold">${word.category}</span>
  </div>
  <div class="cardContent back" id="jsWord">
  ${
    getSocket().id === liar.id
      ? `<span class="liar">당신은 <br/>라이어입니다.</span>`
      : `<span>제시어</span><span class="bold">${word.word}</span>`
  }
  </div>
  `;
};

const requestHint = () => {
  document.getElementById("jsHintOverlay").style.display = "flex";
};

export const handlePlayerUpdate = ({ sockets }) => {
  addPlayers(sockets);
};

export const handlePlayerVoteUpdate = ({ sockets }) => {
  addVotePlayers(sockets);
};

export const handleGameStarted = ({ liar, word }) => {
  readyBtn.style.display = "none";
  setNotifs(
    "라이어가 선정되었습니다. <br/>좌측에 마우스를 올려 제시어를 확인해주세요."
  );
  setCard(liar, word);

  let time = 11;
  const intervalId = setInterval(() => { 
    time -= 1;
    timer.innerText = time;

    if (time === 0) { 
      timer.innerHTML = "<span>타이머</span>";
      clearInterval(intervalId);
    }
  }, 1000);
};

export const handleHintTurn = ({ id, nickname, color }) => {
  clearInterval(hintIntervalId);
  setNotifs(
    `<span style="color:${color}">${nickname}</span>님의 차례입니다. <br/>30초 내에 20자 이내로 제시어에 대한 설명을 작성해주세요.`
  );

  if (getSocket().id === id) { 
    requestHint();
  }

  let time = 31;
  hintIntervalId = setInterval(() => { 
    time -= 1;
    timer.innerText = time;

    if (time === 0 && getSocket().id === id) { 
      autoSendHint("시간 초과");
    }
  }, 1000);
}

export const handleGameEnded = () => {
  clearInterval(hintIntervalId);
  timer.innerHTML = "<span>타이머</span>";
  setNotifs(
    "게임이 종료되었습니다. <br/>다음 게임이 시작될 때까지 기다려주세요."
  );
  card.innerHTML = `
  <div class="cardContent front" id="jsCategory">카테고리</div>
  <div class="cardContent back" id="jsWord">제시어</div>
  `;
  document.getElementById("jsHints").innerHTML = "";
  readyBtn.style.display = "block";
};

export const handleVoteNotification = () => {
  clearInterval(hintIntervalId);
  timer.innerHTML = "<span>타이머</span>";
  setNotifs(
    "제시어 설명이 종료되었습니다. <br/>라이어로 의심되는 사람을 선택해주세요."
  );
};

export const handleVoteEnded = ({ nickname, color }) => {
  setNotifs(
    `투표가 종료되었습니다, 라이어는 <span style="color:${color}">${nickname}</span>님이었습니다.<br/>라이어는 정답을 맞춰주세요.`
  );
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
      readyBtn.classList.remove("ready")
      getSocket().emit(window.events.cancelReadyGame);
    } else { 
      readyBtn.innerText = "준비 완료";
      readyBtn.classList.add("ready")
      getSocket().emit(window.events.readyGame);
    }
  });
}
