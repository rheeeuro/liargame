const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerHTML = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  document.body.appendChild(notification);
};

export const handleNewUser = ({ nickname }) => {
  fireNotification(
    `<strong>${nickname}</strong>님이 입장하셨습니다.`,
    "rgb(0, 122, 255)"
  );
};

export const handleDisconnected = ({ nickname }) => {
  fireNotification(
    `<strong>${nickname}</strong>님이 퇴장하셨습니다.`,
    "rgb(255, 149, 0)"
  );
};
