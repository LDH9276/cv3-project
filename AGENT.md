# AGENT.md

## 1. 역할

당신은 이 저장소의 **초기 개발 환경과 기본 구조만 세팅하는 코딩 에이전트**다.

이 프로젝트는 CV3 기술과제용 React 웹페이지이며, 실제 테이블 UI와 퍼블리싱은 제작자(User)가 직접 구현한다.

에이전트는 임의로 디자인을 완성하거나 과제 화면을 재현하지 않는다.

---

## 2. 목표

다음 작업만 수행한다.

1. React 프로젝트의 기본 실행 환경을 구성한다.
2. 방송 데이터를 JSON으로 관리할 수 있는 폴더와 파일을 만든다.
3. 아이콘 라이브러리로 `lucide-react`를 설치한다.
4. 제작자가 바로 퍼블리싱을 시작할 수 있도록 최소한의 파일 구조를 준비한다.
5. `README.md`에 설치 및 실행 방법을 작성한다.

---

## 3. 기술 스택

- React
- Vite
- TypeScript
- CSS
- JSON
- lucide-react
- Bun

별도의 상태관리 라이브러리, UI 프레임워크, CSS 프레임워크는 설치하지 않는다.

설치 금지 예시:

- Redux
- Zustand
- TanStack Query
- Tailwind CSS
- styled-components
- Emotion
- Material UI
- Ant Design
- Bootstrap

이번 단계에서는 React 기본 기능만 사용한다.

---

## 4. 프로젝트 생성

현재 폴더가 비어 있다면 다음 기준으로 프로젝트를 생성한다.

```bash
bun create vite . --template react-ts
bun install
bun add lucide-react
```

이미 React 프로젝트가 생성되어 있다면 새 프로젝트를 덮어쓰지 말고 기존 설정을 확인한 후 필요한 패키지만 추가한다.

---

## 5. 기본 폴더 구조

다음 구조를 만든다.

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── .gitkeep
│   ├── data/
│   │   ├── live-broadcasts.json
│   │   └── home-shopping-broadcasts.json
│   ├── types/
│   │   └── broadcast.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── AGENT.md
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

폴더가 비어 있어 Git에서 추적되지 않을 경우에만 `.gitkeep`을 사용한다.

---

## 6. 데이터 관리 원칙

방송 데이터는 API 호출 없이 로컬 JSON 파일에서 관리한다.

파일 구분:

- `src/data/live-broadcasts.json`: 라이브 방송 데이터
- `src/data/home-shopping-broadcasts.json`: 홈쇼핑 데이터

실제 데이터는 제작자가 직접 입력하므로, 에이전트는 과제 페이지의 데이터를 임의로 수집하거나 생성하지 않는다.

초기 JSON 파일에는 빈 배열만 작성한다.

```json
[]
```

---

## 7. 데이터 타입

`src/types/broadcast.ts`에 다음 타입을 작성한다.

```ts
export type BroadcastType = "live" | "homeShopping";

export interface BroadcastItem {
  id: string;
  rank: number;
  title: string;
  category: string;
  broadcastTime: string;
  metricLabel: "조회수" | "시청률";
  metricValue: string;
  sales: string;
  revenue: string;
  productCount: string;
}
```

### 타입 작성 원칙

- 원본 화면의 출력값을 그대로 표현할 수 있도록 표시용 값은 문자열로 관리한다.
- 금액, 조회수, 판매량의 쉼표와 단위를 보존한다.
- 실제 데이터가 확정되기 전까지 필드를 임의로 추가하지 않는다.
- JSON 구조와 TypeScript 타입의 필드명을 일치시킨다.

---

## 8. App 컴포넌트 범위

`App.tsx`는 프로젝트가 정상 실행되는지만 확인할 수 있는 최소 구조로 작성한다.

허용되는 예시:

```tsx
function App() {
  return (
    <main>
      <h1>CV3 기술과제</h1>
    </main>
  );
}

export default App;
```

다음 작업은 하지 않는다.

- 방송 테이블 구현
- 라이브 방송/홈쇼핑 토글 구현
- 반응형 UI 구현
- 과제 페이지 디자인 재현
- 임의의 레이아웃 설계
- 임의의 샘플 방송 데이터 출력
- 헤더, 푸터, 사이드바 구현

실제 퍼블리싱과 컴포넌트 설계는 제작자가 직접 진행한다.

---

## 9. CSS 범위

기본 Vite 데모 스타일은 제거한다.

다만 퍼블리싱 작업을 대신하지 않도록 아래 수준만 유지한다.

```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
}
```

다음 스타일은 추가하지 않는다.

- 색상 시스템
- 폰트 크기 체계
- 테이블 스타일
- 버튼 스타일
- 카드 스타일
- 반응형 미디어 쿼리
- 임의의 여백 및 레이아웃 디자인

---

## 10. Lucide 사용 원칙

아이콘은 `lucide-react`만 사용한다.

설치 여부를 `package.json`에서 확인한다.

```bash
bun add lucide-react
```

이번 초기 세팅 단계에서는 아이콘을 화면에 반드시 출력할 필요가 없다.

향후 아이콘 사용 예시는 다음과 같다.

```tsx
import { ChevronDown } from "lucide-react";
```

다른 아이콘 패키지는 설치하지 않는다.

---

## 11. README 작성

`README.md`에 최소한 다음 내용을 작성한다.

````md
# CV3 기술과제

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

## 미리보기

```bash
bun run preview
```

## 데이터 파일

- `src/data/live-broadcasts.json`
- `src/data/home-shopping-broadcasts.json`
````

README에는 아직 구현하지 않은 기능을 구현했다고 적지 않는다.

---

## 12. 품질 확인

작업 후 반드시 다음 명령어를 실행한다.

```bash
bun run build
```

프로젝트에 lint 스크립트가 있다면 다음 명령어도 실행한다.

```bash
bun run lint
```

오류가 발생하면 원인을 수정한 후 다시 실행한다.

경고를 숨기기 위해 TypeScript 설정이나 ESLint 규칙을 임의로 완화하지 않는다.

---

## 13. 커밋 단위 제안

기술과제는 작업 과정을 확인할 수 있도록 커밋을 나누어야 한다.

초기 세팅 작업은 다음처럼 분리한다.

```text
chore: initialize React project
chore: add data and type structure
docs: add project setup instructions
```

에이전트가 실제 커밋을 수행하려면 제작자의 명시적인 요청이 있어야 한다.

---

## 14. 금지 사항

다음 작업은 절대 수행하지 않는다.

1. 과제 페이지를 자동 크롤링한다.
2. 과제 페이지의 실제 데이터를 임의로 작성한다.
3. 테이블 UI를 완성한다.
4. 디자인 시스템을 추가한다.
5. 불필요한 라이브러리를 설치한다.
6. 백엔드 또는 프록시 서버를 만든다.
7. API 호출 코드를 작성한다.
8. 테스트용이라는 이유로 가짜 방송 데이터를 추가한다.
9. 제작자가 작성한 퍼블리싱 코드를 대규모로 변경한다.
10. 요청받지 않은 기능을 선제적으로 구현한다.

---

## 15. 작업 완료 조건

다음 항목을 모두 만족해야 한다.

- React + Vite + TypeScript 프로젝트가 실행된다.
- `lucide-react`가 설치되어 있다.
- `src/data` 폴더에 두 개의 JSON 파일이 있다.
- 두 JSON 파일은 빈 배열로 시작한다.
- `src/types/broadcast.ts`가 존재한다.
- Vite 데모 코드와 데모 스타일이 제거되어 있다.
- `App.tsx`에는 최소 실행 확인 화면만 있다.
- README만 보고 설치, 실행, 빌드할 수 있다.
- `bun run build`가 성공한다.
- 방송 테이블과 퍼블리싱은 구현되어 있지 않다.

---

## 16. 완료 보고 형식

작업이 끝나면 다음 형식으로만 요약한다.

```md
## 완료 내용

- React + Vite + TypeScript 기본 환경 구성
- 방송 데이터 JSON 폴더 및 파일 생성
- 방송 데이터 타입 정의
- lucide-react 설치
- README 실행 방법 작성

## 검증

- `bun run build`: 성공
- `bun run lint`: 성공 또는 스크립트 없음

## 제작자가 이어서 할 작업

- 실제 방송 데이터 입력
- 방송 유형 토글 구현
- 방송 테이블 퍼블리싱
- 반응형 스타일 작성
```

완료 보고에는 구현하지 않은 기능을 완료했다고 표현하지 않는다.
