# TrialSpace MVP

AI 기반 디지털 트윈 창업 분석 플랫폼 (발표용 MVP)

## 기술 스택

- Next.js 16 (App Router)
- React 19 · TypeScript
- Tailwind CSS 4
- Kakao Maps JavaScript API
- Recharts · Framer Motion · Lucide React

## 사용자 흐름

1. **랜딩** (`/`) — 서비스 소개 및 시작하기
2. **상권 선택** (`/map`) — 카카오맵 클릭 → mock 상권 매칭
3. **창업 입력** (`/simulate`) — 업종·메뉴·가격 등 입력
4. **AI 분석** (`/results`) — mock 분석 + 차트·인사이트

## 실행 방법

### 방법 A (권장, Windows)

`trialspace` 폴더에서 **`start-dev.bat`** 더블클릭  
→ 터미널 창을 **닫지 말고** 유지한 채 브라우저 접속

### 방법 B (터미널)

```bash
cd "C:\Users\kip23\StoreTwin AI\trialspace"
npm install
npm run dev
```

브라우저: [http://127.0.0.1:3000](http://127.0.0.1:3000)

### 상위 폴더(StoreTwin AI)에서 실행할 때

```bash
cd "C:\Users\kip23\StoreTwin AI"
npm run dev
```

## 접속이 안 될 때

1. **반드시 `trialspace` 폴더**에서 실행 (상위 폴더에 `package.json` 없으면 실패)
2. `npm run dev` 후 터미널에 `Ready`가 보이면 **Ctrl+C 하지 말고 창 유지**
3. 포트 충돌 시: `npm run dev:clean` 또는 `start-dev.bat` 재실행
4. 주소는 `http://127.0.0.1:3000` 사용 (`localhost` 대신)
5. 이전 서버가 남았으면 작업 관리자에서 `node.exe` 종료 후 재시작

## 환경 변수

`.env.local`:

```
NEXT_PUBLIC_KAKAO_MAP_KEY=8870e6e1b24f9c8816053ce94653aa32
```

카카오 개발자 콘솔 허용 도메인:

- `http://localhost:3000`
- `https://digitaltwin.dreamhelixion.com`

## 프로젝트 구조

```
app/           # 페이지 (랜딩, map, simulate, results)
components/    # UI·지도·폼·결과 컴포넌트
lib/           # 타입, 분석 로직, 세션
mock/          # 상권·샘플 분석 데이터
```

## 배포

Vercel 등에 배포 시 동일 도메인을 카카오맵에 등록하세요.

```bash
npm run build
npm start
```
