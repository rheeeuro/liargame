const words = [
  /**
   * 영화
   */
  { word: "어벤져스", category: "영화" },
  { word: "매트릭스", category: "영화" },
  { word: "라라랜드", category: "영화" },
  { word: "메이즈러너", category: "영화" },
  { word: "택시운전사", category: "영화" },
  { word: "명량", category: "영화" },
  { word: "트랜스포머", category: "영화" },
  { word: "쏘우", category: "영화" },
  { word: "곤지암", category: "영화" },
  { word: "반지의 제왕", category: "영화" },
  { word: "해리포터", category: "영화" },
  { word: "캐리비안의 해적", category: "영화" },
  { word: "아바타", category: "영화" },
  { word: "실미도", category: "영화" },
  { word: "국제시장", category: "영화" },
  { word: "이웃집 토토로", category: "영화" },
  { word: "하울의 움직이는성", category: "영화" },
  { word: "너의 이름은", category: "영화" },
  { word: "센과치히로의 행방불명", category: "영화" },
  { word: "스즈메의 문단속", category: "영화" },

  /**
   * 애니메이션
   */
  { word: "원피스", category: "애니메이션" },
  { word: "나루토", category: "애니메이션" },
  { word: "이누야샤", category: "애니메이션" },
  { word: "명탐정 코난", category: "애니메이션" },
  { word: "슬램덩크", category: "애니메이션" },
  { word: "드래곤볼", category: "애니메이션" },
  { word: "시간을 달리는 소녀", category: "애니메이션" },

  /**
   * 음식
   */
  { word: "잡곡밥", category: "음식" },
  { word: "비빔밥", category: "음식" },
  { word: "콩나물밥", category: "음식" },
  { word: "곤드레비빔밥", category: "음식" },
  { word: "쌈밥", category: "음식" },
  { word: "야채죽", category: "음식" },
  { word: "전복죽", category: "음식" },
  { word: "소고기버섯죽", category: "음식" },
  { word: "팥죽", category: "음식" },
  { word: "단호박죽", category: "음식" },
  { word: "김치볶음밥", category: "음식" },
  { word: "간장계란밥", category: "음식" },
  { word: "볶음밥", category: "음식" },
  { word: "카레", category: "음식" },
  { word: "짜장밥", category: "음식" },
  { word: "오징어덮밥", category: "음식" },
  { word: "오므라이스", category: "음식" },
  { word: "육회비빔밥", category: "음식" },
  { word: "미역국", category: "음식" },
  { word: "콩나물국", category: "음식" },
  { word: "사골곰탕", category: "음식" },
  { word: "뼈해장국", category: "음식" },
  { word: "어묵탕", category: "음식" },
  { word: "육개장", category: "음식" },
  { word: "갈비탕", category: "음식" },
  { word: "삼계탕", category: "음식" },
  { word: "추어탕", category: "음식" },
  { word: "꽃게탕", category: "음식" },
  { word: "홍합탕", category: "음식" },
  { word: "된장찌개", category: "음식" },
  { word: "김치찌개", category: "음식" },
  { word: "순두부찌개", category: "음식" },
  { word: "부대찌개", category: "음식" },
  { word: "청국장", category: "음식" },
  { word: "밀폐유나베", category: "음식" },
  { word: "소고기버섯전골", category: "음식" },
  { word: "불고기전골", category: "음식" },
  { word: "만두전골", category: "음식" },
  { word: "곱창전골", category: "음식" },
  { word: "삼겹살", category: "음식" },
  { word: "수육", category: "음식" },
  { word: "스테이크", category: "음식" },
  { word: "찹스테이크", category: "음식" },
  { word: "갈비찜", category: "음식" },
  { word: "돼지갈비", category: "음식" },
  { word: "LA갈비", category: "음식" },
  { word: "바베큐", category: "음식" },
  { word: "김치등갈비찜", category: "음식" },
  { word: "묵은지돼지갈비찜", category: "음식" },
  { word: "폭립", category: "음식" },
  { word: "제육볶음", category: "음식" },
  { word: "불고기", category: "음식" },
  { word: "닭볶음탕", category: "음식" },
  { word: "닭갈비", category: "음식" },
  { word: "훈제오리구이", category: "음식" },
  { word: "숙주볶음", category: "음식" },
  { word: "찜닭", category: "음식" },
  { word: "소세지야채볶음", category: "음식" },
  { word: "돈까스", category: "음식" },
  { word: "떡갈비", category: "음식" },
  { word: "함박스테이크", category: "음식" },
  { word: "동그랑땡", category: "음식" },
  { word: "곱창", category: "음식" },
  { word: "막창", category: "음식" },
  { word: "족발", category: "음식" },
  { word: "치킨", category: "음식" },
  { word: "닭강정", category: "음식" },
  { word: "생선까스", category: "음식" },
  { word: "연어스테이크", category: "음식" },
  { word: "오징어볶음", category: "음식" },
  { word: "쭈꾸미볶음", category: "음식" },
  { word: "아귀찜", category: "음식" },
  { word: "해물찜", category: "음식" },
  { word: "고등어구이", category: "음식" },
  { word: "고등어조림", category: "음식" },
  { word: "갈치구이", category: "음식" },
  { word: "갈치조림", category: "음식" },
  { word: "장어구이", category: "음식" },
  { word: "조기구이", category: "음식" },
  { word: "가자미구이", category: "음식" },
  { word: "꽁치조림", category: "음식" },
  { word: "낙곱새", category: "음식" },
  { word: "바지락칼국수", category: "음식" },
  { word: "꽃게찜", category: "음식" },
  { word: "대게찜", category: "음식" },
  { word: "간장게장", category: "음식" },
  { word: "양념게장", category: "음식" },
  { word: "새우장", category: "음식" },
  { word: "회", category: "음식" },
  { word: "생굴", category: "음식" },
  { word: "잡채", category: "음식" },
  { word: "골뱅이무침", category: "음식" },
  { word: "곱창볶음", category: "음식" },
  { word: "순대볶음", category: "음식" },
  { word: "닭발", category: "음식" },
  { word: "오돌뼈", category: "음식" },
  { word: "월남쌈", category: "음식" },
  { word: "도토리묵", category: "음식" },
  { word: "쌈무", category: "음식" },
  { word: "감자조림", category: "음식" },
  { word: "두부조림", category: "음식" },
  { word: "장조림", category: "음식" },
  { word: "진미채볶음", category: "음식" },
  { word: "버섯", category: "음식" },
  { word: "연근", category: "음식" },
  { word: "우엉", category: "음식" },
  { word: "멸치볶음", category: "음식" },
  { word: "볶음김치", category: "음식" },
  { word: "마늘쫑", category: "음식" },
  { word: "미역줄기", category: "음식" },
  { word: "땅콩", category: "음식" },
  { word: "콩자반", category: "음식" },
  { word: "꽈리고추", category: "음식" },
  { word: "베이컨", category: "음식" },
  { word: "시금치", category: "음식" },
  { word: "콩나물", category: "음식" },
  { word: "고사리", category: "음식" },
  { word: "숙주", category: "음식" },
  { word: "오이소박이", category: "음식" },
  { word: "단무지", category: "음식" },
  { word: "골뱅이", category: "음식" },
  { word: "꼬막", category: "음식" },
  { word: "김치", category: "음식" },
  { word: "물김치", category: "음식" },
  { word: "열무김치", category: "음식" },
  { word: "깻잎", category: "음식" },
  { word: "깍두기", category: "음식" },
  { word: "겉절이", category: "음식" },
  { word: "젓갈", category: "음식" },
  { word: "오이", category: "음식" },
  { word: "된장", category: "음식" },
  { word: "파절이", category: "음식" },
  { word: "양배추찜", category: "음식" },
  { word: "파김치", category: "음식" },
  { word: "계란찜", category: "음식" },
  { word: "계란후라이", category: "음식" },
  { word: "계란말이", category: "음식" },
  { word: "스팸", category: "음식" },
  { word: "치킨너겟", category: "음식" },
  { word: "치킨텐더", category: "음식" },
  { word: "애호박전", category: "음식" },
  { word: "김치전", category: "음식" },
  { word: "부추전", category: "음식" },
  { word: "배추전", category: "음식" },
  { word: "깻잎전", category: "음식" },
  { word: "참치마요", category: "음식" },
  { word: "라면", category: "음식" },
  { word: "주먹밥", category: "음식" },
  { word: "유부초밥", category: "음식" },
  { word: "김밥", category: "음식" },
  { word: "꼬마김밥", category: "음식" },
  { word: "충무김밥", category: "음식" },
  { word: "떡볶이", category: "음식" },
  { word: "라볶이", category: "음식" },
  { word: "떡꼬치", category: "음식" },
  { word: "소떡소떡", category: "음식" },
  { word: "샌드위치", category: "음식" },
  { word: "마늘빵", category: "음식" },
  { word: "토스트", category: "음식" },
  { word: "냉면", category: "음식" },
  { word: "잔치국수", category: "음식" },
  { word: "비빔국수", category: "음식" },
  { word: "열무국수", category: "음식" },
  { word: "콩국수", category: "음식" },
  { word: "수제비", category: "음식" },
  { word: "만두", category: "음식" },
  { word: "쫄면", category: "음식" },
  { word: "칼국수", category: "음식" },
  { word: "떡국", category: "음식" },
  { word: "떡만둣국", category: "음식" },
  { word: "우동", category: "음식" },
  { word: "핫도그", category: "음식" },
  { word: "찐만두", category: "음식" },
  { word: "튀김만두", category: "음식" },
  { word: "비빔만두", category: "음식" },
  { word: "김말이튀김", category: "음식" },
  { word: "야채튀김", category: "음식" },
  { word: "오징어튀김", category: "음식" },
  { word: "가지튀김", category: "음식" },
  { word: "순대", category: "음식" },
  { word: "짜장면", category: "음식" },
  { word: "짬뽕", category: "음식" },
  { word: "마라탕", category: "음식" },
  { word: "탕수육", category: "음식" },
  { word: "꿔바로우", category: "음식" },
  { word: "마파두부", category: "음식" },
  { word: "양장피", category: "음식" },
  { word: "깐풍기", category: "음식" },
  { word: "깐풍새우", category: "음식" },
  { word: "크림새우", category: "음식" },
  { word: "유린기", category: "음식" },
  { word: "팔보채", category: "음식" },
  { word: "고추잡채", category: "음식" },
  { word: "춘권", category: "음식" },
  { word: "딤섬", category: "음식" },
  { word: "스파게티", category: "음식" },
  { word: "크림파스타", category: "음식" },
  { word: "명란파스타", category: "음식" },
  { word: "봉골레파스타", category: "음식" },
  { word: "감바스", category: "음식" },
  { word: "그라탕", category: "음식" },
  { word: "피자", category: "음식" },
  { word: "함박스테이크", category: "음식" },
  { word: "리조또", category: "음식" },
  { word: "샐러드", category: "음식" },
  { word: "햄버거", category: "음식" },
  { word: "부리또", category: "음식" },
  { word: "해쉬브라운", category: "음식" },
  { word: "감자튀김", category: "음식" },
  { word: "맥앤치즈", category: "음식" },
  { word: "콘샐러드", category: "음식" },
  { word: "초밥", category: "음식" },
  { word: "라멘", category: "음식" },
  { word: "나가사키짬뽕", category: "음식" },
  { word: "연어덮밥", category: "음식" },
  { word: "새우장덮밥", category: "음식" },
  { word: "메밀소바", category: "음식" },
  { word: "돈카츠", category: "음식" },
  { word: "야키니쿠", category: "음식" },
  { word: "낫또", category: "음식" },
  { word: "볶음우동", category: "음식" },
  { word: "카레우동", category: "음식" },
  { word: "가츠동", category: "음식" },
  { word: "규동", category: "음식" },
  { word: "쌀국수", category: "음식" },
  { word: "팟타이", category: "음식" },
  { word: "타코", category: "음식" },

  /**
   * 나라
   */
  { word: "가나", category: "나라" },
  { word: "가봉", category: "나라" },
  { word: "감비아", category: "나라" },
  { word: "과테말라", category: "나라" },
  { word: "그리스", category: "나라" },
  { word: "나이지리아", category: "나라" },
  { word: "남아프리카 공화국", category: "나라" },
  { word: "네덜란드", category: "나라" },
  { word: "네팔", category: "나라" },
  { word: "노르웨이", category: "나라" },
  { word: "뉴질랜드", category: "나라" },
  { word: "대한민국", category: "나라" },
  { word: "덴마크", category: "나라" },
  { word: "독일", category: "나라" },
  { word: "러시아", category: "나라" },
  { word: "레바논", category: "나라" },
  { word: "루마니아", category: "나라" },
  { word: "룩셈부르크", category: "나라" },
  { word: "말레이시아", category: "나라" },
  { word: "멕시코", category: "나라" },
  { word: "몰디브", category: "나라" },
  { word: "몽골", category: "나라" },
  { word: "미국", category: "나라" },
  { word: "방글라데시", category: "나라" },
  { word: "베네수엘라", category: "나라" },
  { word: "베트남", category: "나라" },
  { word: "벨기에", category: "나라" },
  { word: "북한", category: "나라" },
  { word: "불가리아", category: "나라" },
  { word: "브라질", category: "나라" },
  { word: "사우디아라비아", category: "나라" },
  { word: "세네갈", category: "나라" },
  { word: "세르비아", category: "나라" },
  { word: "소말리아", category: "나라" },
  { word: "스리랑카", category: "나라" },
  { word: "스웨덴", category: "나라" },
  { word: "스위스", category: "나라" },
  { word: "스페인", category: "나라" },
  { word: "싱가포르", category: "나라" },
  { word: "아랍에미리트", category: "나라" },
  { word: "아르헨티나", category: "나라" },
  { word: "아이슬란드", category: "나라" },
  { word: "아프가니스탄", category: "나라" },
  { word: "알제리", category: "나라" },
  { word: "에콰도르", category: "나라" },
  { word: "에티오피아", category: "나라" },
  { word: "영국", category: "나라" },
  { word: "오스트리아", category: "나라" },
  { word: "요르단", category: "나라" },
  { word: "우간다", category: "나라" },
  { word: "우루과이", category: "나라" },
  { word: "우즈베키스탄", category: "나라" },
  { word: "우크라이나", category: "나라" },
  { word: "이라크", category: "나라" },
  { word: "이란", category: "나라" },
  { word: "이스라엘", category: "나라" },
  { word: "이집트", category: "나라" },
  { word: "이탈리아", category: "나라" },
  { word: "인도", category: "나라" },
  { word: "인도네시아", category: "나라" },
  { word: "일본", category: "나라" },
  { word: "자메이카", category: "나라" },
  { word: "잠비아", category: "나라" },
  { word: "중국", category: "나라" },
  { word: "체코", category: "나라" },
  { word: "칠레", category: "나라" },
  { word: "카메룬", category: "나라" },
  { word: "카자흐스탄", category: "나라" },
  { word: "카타르", category: "나라" },
  { word: "캄보디아", category: "나라" },
  { word: "캐나다", category: "나라" },
  { word: "케냐", category: "나라" },
  { word: "코스타리카", category: "나라" },
  { word: "코트디부아르", category: "나라" },
  { word: "콜롬비아", category: "나라" },
  { word: "콩고민주공화국", category: "나라" },
  { word: "쿠바", category: "나라" },
  { word: "크로아티아", category: "나라" },
  { word: "탄자니아", category: "나라" },
  { word: "태국", category: "나라" },
  { word: "토고", category: "나라" },
  { word: "튀니지", category: "나라" },
  { word: "파라과이", category: "나라" },
  { word: "파키스탄", category: "나라" },
  { word: "페루", category: "나라" },
  { word: "포르투갈", category: "나라" },
  { word: "폴란드", category: "나라" },
  { word: "프랑스", category: "나라" },
  { word: "핀란드", category: "나라" },
  { word: "필리핀", category: "나라" },
  { word: "헝가리", category: "나라" },
  { word: "호주", category: "나라" },
  { word: "대만", category: "나라" },

  /**
   * 스포츠
   */
  { word: "럭비", category: "스포츠" },
  { word: "가라테", category: "스포츠" },
  { word: "골프", category: "스포츠" },
  { word: "기계체조", category: "스포츠" },
  { word: "농구", category: "스포츠" },
  { word: "다이빙", category: "스포츠" },
  { word: "레슬링", category: "스포츠" },
  { word: "스피드스케이팅", category: "스포츠" },
  { word: "루지", category: "스포츠" },
  { word: "리듬체조", category: "스포츠" },
  { word: "마라톤", category: "스포츠" },
  { word: "바이애슬론", category: "스포츠" },
  { word: "배구", category: "스포츠" },
  { word: "배드민턴", category: "스포츠" },
  { word: "복싱", category: "스포츠" },
  { word: "봅슬레이", category: "스포츠" },
  { word: "비치발리볼", category: "스포츠" },
  { word: "사격", category: "스포츠" },
  { word: "사이클", category: "스포츠" },
  { word: "서핑", category: "스포츠" },
  { word: "쇼트트랙", category: "스포츠" },
  { word: "수구", category: "스포츠" },
  { word: "스노보드", category: "스포츠" },
  { word: "스케이트보드", category: "스포츠" },
  { word: "스켈레톤", category: "스포츠" },
  { word: "스키점프", category: "스포츠" },
  { word: "클라이밍", category: "스포츠" },
  { word: "승마", category: "스포츠" },
  { word: "아이스하키", category: "스포츠" },
  { word: "야구", category: "스포츠" },
  { word: "양궁", category: "스포츠" },
  { word: "역도", category: "스포츠" },
  { word: "요트", category: "스포츠" },
  { word: "유도", category: "스포츠" },
  { word: "육상", category: "스포츠" },
  { word: "조정", category: "스포츠" },
  { word: "축구", category: "스포츠" },
  { word: "컬링", category: "스포츠" },
  { word: "탁구", category: "스포츠" },
  { word: "태권도", category: "스포츠" },
  { word: "테니스", category: "스포츠" },
  { word: "트라이애슬론", category: "스포츠" },
  { word: "펜싱", category: "스포츠" },
  { word: "풋살", category: "스포츠" },
  { word: "스키", category: "스포츠" },
  { word: "피겨스케이팅", category: "스포츠" },
  { word: "핸드볼", category: "스포츠" },

  /**
   * 게임
   */
  { word: "리그오브레젼드", category: "게임" },
  { word: "배틀그라운드", category: "게임" },
  { word: "오버워치", category: "게임" },
  { word: "메이플", category: "게임" },
  { word: "리니지", category: "게임" },
  { word: "스타크래프트", category: "게임" },
  { word: "피파온라인", category: "게임" },
  { word: "겟엠프드", category: "게임" },
  { word: "디아블로", category: "게임" },
  { word: "마비노기", category: "게임" },
  { word: "포트리스", category: "게임" },

  /**
   * 직업
   */
  { word: "수영 강사", category: "직업" },
  { word: "헬스 트레이너", category: "직업" },
  { word: "테니스 강사", category: "직업" },
  { word: "교사", category: "직업" },
  { word: "교수", category: "직업" },
  { word: "박사", category: "직업" },
  { word: "번역가", category: "직업" },
  { word: "연구원", category: "직업" },
  { word: "언어학자", category: "직업" },
  { word: "사회학자", category: "직업" },
  { word: "심리학자", category: "직업" },
  { word: "과학자", category: "직업" },
  { word: "수학자", category: "직업" },
  { word: "철학자", category: "직업" },
  { word: "교감", category: "직업" },
  { word: "교장", category: "직업" },
  { word: "원장", category: "직업" },
  { word: "경호원", category: "직업" },
  { word: "대리운전", category: "직업" },
  { word: "디지털 장의사", category: "직업" },
  { word: "배달부", category: "직업" },
  { word: "야쿠르트 배달원", category: "직업" },
  { word: "집배원", category: "직업" },
  { word: "택배 기사", category: "직업" },
  { word: "상하차 아르바이트", category: "직업" },
  { word: "사회복지사", category: "직업" },
  { word: "상담사", category: "직업" },
  { word: "웨이터", category: "직업" },
  { word: "웨딩플래너", category: "직업" },
  { word: "작가", category: "직업" },
  { word: "시인", category: "직업" },
  { word: "소설가", category: "직업" },
  { word: "방송작가", category: "직업" },
  { word: "만화가", category: "직업" },
  { word: "음악가", category: "직업" },
  { word: "가수", category: "직업" },
  { word: "성악가", category: "직업" },
  { word: "기타리스트", category: "직업" },
  { word: "드러머", category: "직업" },
  { word: "바이올리니스트", category: "직업" },
  { word: "피아니스트", category: "직업" },
  { word: "작곡가", category: "직업" },
  { word: "작사가", category: "직업" },
  { word: "지휘자", category: "직업" },
  { word: "싱어송라이터", category: "직업" },
  { word: "DJ", category: "직업" },
  { word: "발레리나", category: "직업" },
  { word: "비보이", category: "직업" },
  { word: "백댄서", category: "직업" },
  { word: "화가", category: "직업" },
  { word: "만화가", category: "직업" },
  { word: "웹툰 작가", category: "직업" },
  { word: "조각가", category: "직업" },
  { word: "건축가", category: "직업" },
  { word: "목수", category: "직업" },
  { word: "디자이너", category: "직업" },
  { word: "사진가", category: "직업" },
  { word: "영화 감독", category: "직업" },
  { word: "게임 기획자", category: "직업" },
  { word: "클라이언트 프로그래머", category: "직업" },
  { word: "서버 프로그래머", category: "직업" },
  { word: "평론가", category: "직업" },
  { word: "마술사", category: "직업" },
  { word: "곡예사", category: "직업" },
  { word: "내레이터", category: "직업" },
  { word: "모델", category: "직업" },
  { word: "연예인", category: "직업" },
  { word: "아이돌", category: "직업" },
  { word: "개그맨", category: "직업" },
  { word: "코미디언", category: "직업" },
  { word: "배우", category: "직업" },
  { word: "뮤지컬 배우", category: "직업" },
  { word: "성우", category: "직업" },
  { word: "재연배우", category: "직업" },
  { word: "영화 배우", category: "직업" },
  { word: "스턴트맨", category: "직업" },
  { word: "프로듀서", category: "직업" },
  { word: "MC", category: "직업" },
  { word: "아나운서", category: "직업" },
  { word: "기상캐스터", category: "직업" },
  { word: "유튜버", category: "직업" },
  { word: "BJ", category: "직업" },
  { word: "스트리머", category: "직업" },
  { word: "PD", category: "직업" },
  { word: "인플루언서", category: "직업" },
  { word: "블로거", category: "직업" },
  { word: "틱톡커", category: "직업" },
  { word: "레이서", category: "직업" },
  { word: "프로게이머", category: "직업" },
  { word: "프로레슬러", category: "직업" },
  { word: "바둑기사", category: "직업" },
  { word: "치어리더", category: "직업" },
  { word: "해설자", category: "직업" },
  { word: "산악인", category: "직업" },
  { word: "구단주", category: "직업" },
  { word: "기자", category: "직업" },
  { word: "리포터", category: "직업" },
  { word: "특파원", category: "직업" },
  { word: "아나운서", category: "직업" },
  { word: "앵커", category: "직업" },
  { word: "캐스터", category: "직업" },
  { word: "기상캐스터", category: "직업" },
  { word: "버스 기사", category: "직업" },
  { word: "택시 기사", category: "직업" },
  { word: "대리운전 기사", category: "직업" },
  { word: "기관사", category: "직업" },
  { word: "항해사", category: "직업" },
  { word: "승무원", category: "직업" },
  { word: "스튜어디스", category: "직업" },
  { word: "파일럿", category: "직업" },
  { word: "항공정비사", category: "직업" },
  { word: "의사", category: "직업" },
  { word: "간호사", category: "직업" },
  { word: "치과의사", category: "직업" },
  { word: "한의사", category: "직업" },
  { word: "물리치료사", category: "직업" },
  { word: "약사", category: "직업" },
  { word: "영양사", category: "직업" },
  { word: "응급구조사", category: "직업" },
  { word: "수의사", category: "직업" },
  { word: "장의사", category: "직업" },
  { word: "개발자", category: "직업" },
  { word: "건축가", category: "직업" },
  { word: "목수", category: "직업" },
  { word: "배관공", category: "직업" },
  { word: "광부", category: "직업" },
  { word: "대장장이", category: "직업" },
  { word: "프로그래머", category: "직업" },
  { word: "나무꾼", category: "직업" },
  { word: "농부", category: "직업" },
  { word: "도축업자", category: "직업" },
  { word: "사냥꾼", category: "직업" },
  { word: "어부", category: "직업" },
  { word: "플로리스트", category: "직업" },
  { word: "해녀", category: "직업" },
  { word: "촌장", category: "직업" },
  { word: "미식가", category: "직업" },
  { word: "바리스타", category: "직업" },
  { word: "바텐더", category: "직업" },
  { word: "셰프", category: "직업" },
  { word: "소믈리에", category: "직업" },
  { word: "요리사", category: "직업" },
  { word: "제빵사", category: "직업" },
  { word: "파티시에", category: "직업" },
  { word: "푸드파이터", category: "직업" },
  { word: "요리연구가", category: "직업" },
  { word: "가사도우미", category: "직업" },
  { word: "건물주", category: "직업" },
  { word: "매니저", category: "직업" },
  { word: "비서", category: "직업" },
  { word: "사육사", category: "직업" },
  { word: "자영업자", category: "직업" },
  { word: "파출부", category: "직업" },
  { word: "코디네이터", category: "직업" },
  { word: "스타일리스트", category: "직업" },
  { word: "사채업자", category: "직업" },
  { word: "공무원", category: "직업" },
  { word: "외교관", category: "직업" },
  { word: "통역가", category: "직업" },
  { word: "정치인", category: "직업" },
  { word: "대통령", category: "직업" },
  { word: "국회의원", category: "직업" },
  { word: "시장", category: "직업" },
  { word: "교육감", category: "직업" },
  { word: "감정평가사", category: "직업" },
  { word: "검사", category: "직업" },
  { word: "경찰", category: "직업" },
  { word: "형사", category: "직업" },
  { word: "해양경찰", category: "직업" },
  { word: "경비원", category: "직업" },
  { word: "경호원", category: "직업" },
  { word: "직업군인", category: "직업" },
  { word: "변호사", category: "직업" },
  { word: "보안관", category: "직업" },
  { word: "세무사", category: "직업" },
  { word: "탐정", category: "직업" },
  { word: "프로파일러", category: "직업" },
  { word: "판사", category: "직업" },
  { word: "현상금 사냥꾼", category: "직업" },
  { word: "용병", category: "직업" },
  { word: "소방관", category: "직업" },
  { word: "예언가", category: "직업" },
  { word: "목사", category: "직업" },
  { word: "무당", category: "직업" },
  { word: "성직자", category: "직업" },
  { word: "신부", category: "직업" },
  { word: "스님", category: "직업" },
  { word: "회사원", category: "직업" },
  { word: "미용사", category: "직업" },
  { word: "관광 가이드", category: "직업" },
  { word: "레크리에이션 강사", category: "직업" },
  { word: "탐험가", category: "직업" },
  { word: "산악인", category: "직업" },
  { word: "백수", category: "직업" },
  { word: "노숙자", category: "직업" },
  { word: "카지노딜러", category: "직업" },
  { word: "환경미화원", category: "직업" },
];

const chooseWord = () => words[Math.floor(Math.random() * words.length)];

module.exports = { chooseWord };
