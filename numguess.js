    /* 
        1. 유저가 숫자를 입력
        2. 유저가 입력한 숫자와 랜덤 정답 숫자와 비교해서 up/down/정답 피드백
        3. 유저가 클릭할 수 있는 기회는 5번 -> play 버튼을 5번 클릭
            > 같은 번호가 있으면 차감x
        4. 유저가 입력시 1~100 범위 밖의 숫자를 입력한 경우 알려줌. -> 클릭기회 차감x
        5. 게임종료 -> 정답/기회x -> 플레이 버튼 비활성화
        6. 리셋 버튼을 누르면 -> 랜덤 숫자가 새로 생성/UI가 모두 초기화.
    */

    //랜덤번호 생성
    let computerNum = 0;

    //선택자 변수
    let $playButton = document.querySelector('#btnPlay'); //play
    let $resetButton = document.querySelector('#btnReset'); //play
    let $userInput = document.querySelector('#userInput'); //input 박스
    let $resultArea = document.querySelector("#result")
    let chances = 5;
    let $chanceArea = document.querySelector('#chanceText')
    let gameOver = false;

    //입력한 값을 누적해서 가지고 있을 수 있는 변수
    let history = []

    //play 버튼을 클릭
    $playButton.addEventListener('click', play)

    //reset 버튼을 클릭
    $resetButton.addEventListener.apply('click', reset)
    $userInput.addEventListener('focus', function(){
        $userInput.value = ''
    })

    //랜덤번호 추천
    function pickRandomNum() {
        computerNum = Math.floor(Math.random() * 100) +1
        console.log(`정답: ${computerNum}`)
    }
    pickRandomNum()

    //play 버튼이 클릭되면 실행되는 play 함수
    function play() {
        //console.log('play')
        let userInputNum = $userInput.value
        console.log(userInputNum)
    
    //1~100 사이를 벗어난 숫자를 입력하면 유저에게 알림. -> 응시기회 차감 xx

    //유저가 입력한 값이 1보다 작거나 100보다 크면 결과창에 '1과 100사이의 숫자를 입력하세요' 라는 문구를 보여줌. -> return

    if (userInputNum < 1 || userInputNum > 100) {
        $resultArea.textContent = '1과 100사이의 숫자를 입력하세요'
        return
    }

    //유저가 입력한 값의 중복여부 - 데이터유효성
    if (history.includes(userInputNum)) {
        $resultArea.textContent = '이미 입력한 숫자입니다. 다른 숫자를 입력하세요.'
        return
    }

    //play버튼을 누르면 클릭할 때마다 chance가 1씩 감소
    chances--;
    //console.log(chances)
    $chanceArea.textContent = `남은기회 : ${chances}번`

    history.push(userInputNum)
    //console.log(history)

    //인풋에 입력된 값과 랜덤정답을 비교
    //인풋이 더 크면 결과창에 'DOWN' / 작으면 'UP' / 정답이면 정답.
    if (userInputNum < computerNum) {
        $resultArea.textContent = "Up";
    } else if (userInputNum > computerNum) {
        $resultArea.textContent = "Down";
    } else {
        $resultArea.textContent = "정답입니다😍😎😍🥰";
       /*  gameOver = true;
        $playButton.disabled = true;
        $playButton.style.opacity = 0.5;
        $playButton.style.cursor = 'not-allowed'; */
    }

    if (chances === 0) {
        $resultArea.textContent = "게임 종료 - 기회가 모두 소진되었습니다.";
        gameOver = true;
    
    }
    //기회가 모두 소진되면 버튼 비활성화
    if (chances < 1) {
        gameOver = true
    }
    if (gameOver == true) {
        $playButton.disabled = true;
        $playButton.classList.add('on')
    }
}
    //리셋버튼 - 결과창 '게임을 새로 시작합니다.' 1) 유저입력창 비워짐 2) 새추첨 번호 생성

    function reset() {
        $resultArea.textContent = '새 게임이 시작됩니다.😜';
        $userInput.value = '';
        $chanceArea.textContent = '남은 기회 : 5회';
        $playButton.textContent = ''

        pickRandomNum()
        

    }