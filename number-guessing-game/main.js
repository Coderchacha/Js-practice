//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜던번호가 < 유저번호 down!
//랜덤번호가 > 유저번호 up!
//reset버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다쓰면 게임이 끝난다(더이상 추측불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.

//랜덤넘버 변수
let randomNum = 0;
let userInput = document.getElementById('user-input');
let playBtn = document.getElementById('play-button');
let resultArea = document.getElementById('result-area');
let resetBtn = document.getElementById('reset-button');
let chances = 5;
let chanceArea = document.getElementById('chance-area');
let gameOver = false;
let userHistory = [];

playBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);
userInput.addEventListener('focus', function () {
  userInput.value = '';
});

//랜덤넘버 생성함수
function pickRandomNum() {
  randomNum = Math.floor(Math.random() * 100 + 1);
  console.log(randomNum);
}

function play() {
  //user의 value를 가져와줘야 함.
  let userValue = userInput.value;

  //기회를 깎기 전에 미리 유효성 검사를 돌린다.
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = 'Put a number between 1 ~ 100';
    return;
  }

  //기회를 깎기 전에 유저가 이미 입력했던 값인지 확인한다.
  if (userHistory.includes(userValue)) {
    resultArea.textContent =
      "You've already tried this number. Try other number.";
    return;
  }

  chances--;
  chanceArea.textContent = `Remain chances: ${chances}`;

  if (userValue > randomNum) {
    resultArea.textContent = 'DOWN!⬇️';
  } else if (userValue < randomNum) {
    resultArea.textContent = 'UP!⬆️';
  } else {
    resultArea.textContent = 'You got it! Good job!';
  }

  userHistory.push(userValue);

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver) {
    playBtn.disabled = true;
    playBtn.style.opacity = 0.5;
  }
}

function reset() {
  userInput.value = '';
  pickRandomNum();
  resultArea.textContent = 'Guess the number';
  playBtn.style.opacity = 1;
}

//랜덤넘버 생성함수 실행을 시켜줘야 계속 랜덤넘버를 만들어줌.
pickRandomNum();
