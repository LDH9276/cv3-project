# CV3 기술과제

방송 데이터를 탭별로 표시하는 React 기술과제 프로젝트입니다. 데이터는 API 호출 없이 로컬 JSON 파일로 관리합니다.

## 기술 스택

- React
- Vite
- TypeScript
- Bun
- CSS
- Tailwind Preflight (전역 CSS reset 용도만 사용)
- JSON
- lucide-react
- Oxlint

## 데이터 처리

- 라이브 방송: `src/data/live-broadcasts.json`
- 홈쇼핑 방송: `src/data/home-shopping-broadcasts.json`
- 두 JSON의 서로 다른 필드 구조는 `src/data/broadcasts.ts`에서 `BroadcastItem` 공통 타입으로 정규화합니다.
- 방송 시간은 `YYMMDDHHmm`과 `YYYYMMDDHHmm` 형식을 지원합니다.
- 통계 데이터가 `null`이면 화면에서 잠김 상태로 표시합니다.

## 실행 환경

- Bun 1.3 이상

## 설치

```bash
bun install
```

## 개발 서버 실행

```bash
bun run dev
```

## 빌드

```bash
bun run build
```

## 린트

```bash
bun run lint
```

## 미리보기

```bash
bun run preview
```
