import Wiki from "@/entity/wiki";

export const Alu = new Wiki(
  "Arithmetic And Logic Operation Unit (ALU)",
  "/alu/"
);
Alu.category = "cs";
Alu.addTag("alu");
Alu.addLink({
  name: "정보통신기술용어해설 - Arithmetic And Logic Operation Unit (산술 논리 연산 장치)",
  path: "http://www.ktword.co.kr/test/view/view.php?nav=2&no=6039&sh=control+unit",
  target: "_blank",
});
Alu.addLink({
  name: "관련 위키 Wikimson>Os>이중 모드",
  path: "https://kkn1125.github.io/wikimson/#operating-system-dual-mode",
  target: "_blank",
});
Alu.created_at = new Date("2023-11-11 16:19:32");
Alu.content = () =>
  Wiki.Layout.bind(Alu)`
### Arithmetic And Logic Operation Unit (ALU)

산술 논리 연산 장치라고 한다.

1. CPU 산술 논리 연산 장치 (ALU, Arithmetic Logic Unit)
   - CPU에서, 실제로 연산을 수행하는, 장치(유닛)를 말함
     - 2개의 n 비트 수에 대해, .. ALU 크기(n 비트 처리 크기)가 CPU 크기를 결정함 (8, 16, 32 비트 등의 CPU)
     - 주로, 산술 연산(arithmetic : 가감승제), 논리 연산(logic : OR,AND,NOT)
     - 또한, 비교 연산, 보수 연산, 시프트 연산 등을 수행
2. ALU 주요 기능 요소
   - 산술연산 : ADD
     - 뺄셈은, 덧셈과 부호반전(negation)의 조합으로써, ☞ 1의 보수,2의 보수 참조
     - . 즉, 뺄 값의 부호를 바꾸어(NOT,보수) 이를 더함
     - 곱셈은, 덧셈의 반복으로써,
     - 나눗셈은, 뺄셈의 반복으로써, 구현 가능
   - 논리연산 : AND, OR, XOR, NOT
   - 시프트 레지스터 : 비트 이동
   - 보수기 : 1의 보수, 2의 보수
   - 상태 레지스터
3. ALU에서, 입력 및 결과 저장
   - 연산을 위해, 레지스터 또는 메모리로부터 데이터 입력되고, (LOAD)
   - 그 처리 결과가 레지스터 중의 하나 또는 메모리에 저장됨 (STORE)
   - 따라서, 메모리와 레지스터 간에 데이터 전송(교환)이 이루어짐
`.trim();
