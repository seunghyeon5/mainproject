# 🍹 Btender
![KakaoTalk_Photo_2022-07-29-15-42-48 001](https://user-images.githubusercontent.com/105096793/181819625-cf6a98dd-8482-4aee-ba58-77ff1c2c1d81.jpeg)
## 기획의도
혼자서 소주, 맥주는 무겁고 조금 더 가볍고 맛있는 술을 마시고싶은 사람들을 위한 사이트 여러 블로그, 사이트를 찾아보지 않고 바로바로 찾아볼 수 있고 나만의 레시피를 공유보기위한 플렛폼입니다.
## 시연영샹

## 프론트엔드 주소
<details>
<summary>Github</summary>
<div markdown="1">       

https://github.com/junsu0121/finalFE

</div>
</details>

## 백엔드 팀원소개
|팀원|깃허브|역할분담|
|-----|---|---|
|진태인🔰|[Github](https://github.com/jthebat)|DB 테이블설계, HTTPS 보안 서버 구축, S3이미지 업로드, 초기데이터 관리, 전반적인 CRUD API |
|최봉규|[Github](https://github.com/choibonggyu)|store 페이지 CRUD , 소셜로그인|
|홍승현|[Github](https://github.com/seunghyeon5)|CI/CD, 서버 담당, 로그인 회원가입,좋아요,술창고 불러오기,넣기CRUD, test코드(일부 미완) |

## Environment
<img src="https://img.shields.io/badge/-Amazon AWS-232F3E?style=flat&logo=Amazon AWS&logoColor=white"/>
AWS EC2 서버의 t2.large 환경에서 구동 중입니다.

DATABASE는 MongoDB를 활용 중이며 ec2 인스턴스에서만 접근 할 수 있습니다.

## Technical Stacks
<div float: left; >
  <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Mongodb-47A248?style=flat&logo=Mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
</div>
TYPESCRIPT, NODEJS, EXPRESS, MongoDB를 활용합니다.

### 기술선정이유
1. TypeScript
 - 타입스크립트는 인터페이스나 제너럴 같은 강력한 객체지향 프로그래밍을 지원함으로써 자바스크립트에서 일어날 수 있는 오류를 잡아줄 수 있고 안정성또한 높습니다. 이에 대한 에러메세지도 명확해서 보다 쉽게 에러메세지를 찾아낼수있습니다. 또한 타입스크립트의 경우 자바스크립트 기반으로 만들어졌기때문에 진입장벽또한 낮기때문에 선택했습니다.
2. MongoDB
 - MySQL과 같은 관계형 데이터베이스가 데이터끼리의 조인하는 과정은 편할 수 있으나 이번프로젝트에서는 비관계형 데이터베이스인 MongoDB의 사용이 더 적절하다고 판단했습니다. 비관계형 데이터베이스인 몽고디비의 경우 데이터테이블의 유연성이 뛰어나고 대용량의 데이터가 저장이 가능합니다 그리고 쉽고 개발이 편리하다는 장점이 있어서 사용했습니다.
3. Class-vaildator
 - Class-validator는 TS버전으로 데코레이터를 이용해 편리하게 객체의 프로퍼티를 검증할수있는 라이브러리임으로 TS에 더 잘어울린다고 판단하여 사용했습니다.
 

## 라이브 러리|Library
|기술 스택|Appliance|Version|
|------|---|---|
|Express|Node.JS|4.18.1|
|Typescript|전체 코드 타입스크립트 적용|4.7.4|
|Mongoose|변동성 많은 DB.NoSQL|6.4.1|
|CORS|Request resource 제한|2.8.5|
|dotenv|보안 토큰, 키 관련보안화|16.0.1|
|JWT(BEARER)|사용자 인증, Bearer토큰|8.5.1|
|Passport|소셜 로그인|0.6.0|
|passport-kakao|카카오 로그인 모듈|1.0.1|
|class-validator|유효성 검사|0.13.2|
|multer|이미지 데이터 처리|1.4.5-lts.1|
|multer-S3|사진 파일 업로드|2.10.0|
|aws-sdk|S3 접근|2.1167.0|
|bcrypt|비밀번호 암호화|5.0.1|
|prettier|코드 포맷팅|2.7.1|
|jest|테스트 코드|28.1.3|
|supertest|테스트 코드|6.2.4|
|helmet|외부로부터 보안 세팅|5.1.1|

## 트러블슈팅
### Heap out of memory 
1. 문제발생 : 깃허브에 푸쉬 후 서버를 다시 실행시킬때 서버가 다운되는 현상이 발생했다.

2. 문제 원인: Typescript 파일 컴파일 과정에서 heap 메모리가 부족한 문제가 발생하여 메모리의 누수 여부를 확인하였고 사용하는 AWS EC2 프리티어로 제공되는 서버 컴퓨터의 스펙이 너무 낮기 때문에 감당하지 못하는 결과라고 판단하였다.  

3. 해결방안: 더 큰 메모리를 제공하는 서버를 이용하기 전에 SWAP 메모리를 이용해서 해결해보고자 하였으나 SWAP메모리를 사용하면 하드드라이브 I/O작업을 하는 것이기 때문에 속도에 대한 문제가 있기 때문에 더 큰 용량을 제공하는 인스턴스를 선택하는 방법으로 문제를 해결하였다. 기존 node.js의 기본 heap 영역의 제약이 500MiB인데 기존의 1GiB의 리눅스 서버 메모리를 8GiB의 용량으로 늘려주면서 heap 영역에 대한 제약도 4GiB로 변경해주었다. 

### API 속도 개선

1. 문제 원인: 좋아요(추천하기)정보는 따로 table을 두어 좋아요를 사용자가 누른 recipe나 store의 id 값과 userId를 담고 있는데 내가 누른 좋아요 목록을 찾아오기 위해서는 좋아요 table에서 내가 누른 좋아요의 recipe나 store id 값을 찾아와서 그 id 값을 이용해서 recipe 또는 store 정보를 탐색했었는데 이는 반복문 안에 반복문을 사용해서 대략적으로 최악의 경우 N^2 보다는 
빠르고 N logN 보다는 느린 시간 복잡도를 가질 것으로 예상이되었다. 

2. 해결방안: 좋아요를 누른 recipe, store의 숫자 또는 전체 recipe, store 수가 늘어나면 이러한 이중 반복의 구조가 api 속도에 영향을 미칠것이라 생각해서 id 값으로 찾아내야하는 정보를 필요한 데이터만 정제하여 미리 좋아요 정보에 담아 이중반복문과 비슷한 탐색의 상황을 피하였다. 
데이터의 수가 얼마 없는 환경에서 테스트 했음에도 유의미한 속도 차이를 확인 하여 기존의 테이블에 field 하나를 추가해 API 속도를 조금 개선하였다.
![00948438-73A3-401B-B819-20441976DE98](https://user-images.githubusercontent.com/105096793/183228840-bbd1ec26-e970-46a6-94d3-5733833f55de.jpeg)

## 아키텍쳐 
![%E1%84%8E%E1%85%AC%E1%84%8C%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%B5%E1%84%90%E1%85%A6%E1%86%A8%E1%84%8E%E1%85%A7](https://user-images.githubusercontent.com/105096793/182070604-8ee3fed3-5123-455c-86e4-49ecc8e115bf.png)

## ERD
![erd11](https://user-images.githubusercontent.com/105096793/183009881-f80edea4-b30c-4faa-928e-9c31a7dc43e2.png)


