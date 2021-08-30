## Directories

```
./src/
├── Components
    ├── derivative: generic컴포넌트 혹은 derivative컴포넌트로 구성되었으며, 다양한 화면에서 사용되는 컴포넌트
    │   └── RangeInput.tsx
    ├── generic: 다른 컴포넌트를 제작하는 데 사용되는 컴포넌트
    │   ├── NumberInput.tsx
    │   ├── ResizeTrackView.tsx
    │   ├── ToggleButton.tsx
    │   ├── ToggleView.tsx
    │   ├── TrailAppear.tsx
    │   └── TransitModal.tsx
    └── specific: generic컴포넌트 혹은 derivatie컴포넌트로 구성되었으며, 제한된 용도로 활용되는 컴포넌트
├── Hooks: react hooks 관련
├── Interface: 프로젝트 단위에서 자주 사용되는 객체의 인터페이스 관련
├── Modules: 데이터 바인딩 관련 로직
│   └── beers: redux.state.beers와 관련된 데이터 바인딩
├── Pages: 각 페이지별 컴포넌트들 모아둔 디렉토리
│   └── BeerList: /beerlist 페이지에 사용되는 컴포넌트들을 모아둔 디렉토리
│       ├── AbvFilter: 테이블 상단의 필터 컴포넌트
│       └── BeerThumbnail: 테이블 칼럼의 Thumbnail인 동시에 Modal로도 기능하는 컴포넌트
├── Styled: 공통적으로 사용하는 Styled 컴포넌트
├── Types: 프로젝트 범위의 타입 디렉토리(개별 컴포넌트의 타입은 각 컴포넌트 파일에 저장)
└── Util
    ├── animation: easeInOutCubic (홈 화면의 애니메이션 easing함수)
    ├── array: swap (table column의 순서를 바꾸기 위해 제작)
    ├── layout: getAbsoluteOffset (TransitModal에서 컨테이너의 절대 위치를 파악하기 위해 제작)
    ├── number: interpolate, clamp (react-spring의 값을 interpolation하기 위해 제작)
    ├── observer: resize observer 관련 유틸 (TransitModal에서 컨테이너의 크기 변화를 추적하기 위해 제작)
    └── timer: timing 관련 유틸 (메인 화면에서 애니메이션을 실행할 때 이미지 painting이 끝났는지 확인하기 위해 제작)
```

## Features

### Column Change
![column-change](https://user-images.githubusercontent.com/24871544/131306837-b9e13f8b-2db3-4629-9894-47b723a0711d.gif)
> redux에 column indice에 저장되어 있기 때문에 네비게이션을 이동해도 바뀐 column의 순서가 유지됩니다.


### ABV Filter
![abv-filter](https://user-images.githubusercontent.com/24871544/131306828-195f1b68-c11b-4eac-aced-99b4aa26cdea.gif)
> 삭제하거나 추가할 수 있는 알코올 도수 필터입니다. 선택한 도수에 해당하는 맥주들을 모두 보여줍니다.


### Main Animation
![main-animation](https://user-images.githubusercontent.com/24871544/131306845-baefb215-4c41-4476-b5de-6b79151c261a.gif)
> react-spring을 사용한 trail 애니메이션입니다.


### Transitional Modal
![modal](https://user-images.githubusercontent.com/24871544/131306579-f911ce59-ebfb-4659-91ef-e124fb0600d0.gif)
> react-spring과 mutationObserver를 활용하여 만든 Modal입니다. Thumbnail인 동시에 Modal로서 기능합니다.


