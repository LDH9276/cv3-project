# CV3 기술과제

기술과제입니다.

1. 데이터 추출법
데이터의 추출의 경우 API 서버의 경우 인증이 불가능하다 생각되어
POST MAN을 통해 list의 내용을 추출해 적용했습니다.
src/data에 두었습니다만, 추후 이 부분은 API 서버 이용시 받아올 수 있게 수정하면 될 것 같습니다.

2. 각 메뉴의 타입 지정
둘 다 같은 항목을 지니지만 다른 항목이 있어
normalize를 해서 처리했습니다. 가령 YYMMDD HMS이거나 YYYYMMDD HMS형식으로 되어 있습니다.
또한 플랫폼 명도 다르게 되어 있어 일단 수정을 해두었습니다. (liveCategoryPlatforms)

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
