export default {
  published: true,
  title: "Avoid Wasting Memory",
  modified: "2022-03-14 14:52:50",
  done: true,
  tags: [
    "os",
    "main memory management",
    "메인 메모리 관리",
    "메모리 낭비 방지",
    "avoid wasting memory",
  ],
  categories: ["cs", "Operating System"],
  authors: ["kimson"],
  wrote: "2022-03-14 13:12:47",
  toc: true,
  md: true,
  content: [
    `
# Avoid Wasting Memory

## 동적 적재 (Dynamic Loading)

메인 메모리에 실행할 프로그램(파일)들을 올리는 것을 *적재(load)*라 한다.

C언어로 파일을 하나 작성한다고 가정 해보자.

\`\`\`c
#include &lt;stdio.h&gt;

main()
{
  print("솰라솰라");

  if( ... ) { // 오류가 났을 때 실행하는 구문
      ...
  }
}
\`\`\`

위의 코드에서 if문은 파일이 안 열릴 때 처리하는 코드인데, 오류가 안 일어나면 이 코드는 괜히 올린 코드가 된다. 그렇다면 이 코드는 언제 올려야 할까? 실행될 때가 아닌 오류가 발생했을 때 그 때 올리면 되는 것이다. 프로그램 실행에 반드시 필요한 루틴/데이터만 적재한다.

- 모든 루틴(routine)이 다 사용되는 것은 아니다. (예: 오류처리)
  - 위에서 처럼 오류가 발생 할 때 실행되는 코드 ...
- 모든 데이터(data)가 다 사용되는 것은 아니다. (예: 배열)
  - 버퍼 등의 예로 봤을 때 Array[1000]이라 한다면, 1000을 모두 사용하지는 않는다라는 이야기
- 자바 ==> 모든 클래스가 다 사용되는 것은 아니다.
  - 클래스를 만들어서 실행할 때 꼭 모든 클래스가 사용되는 것은 아니다.
- 실행 시 필요하면 그때 해당 부분을 메모리에 올린다. -> 정적 적재 (Static loading)

## 동적 연결 (Dynamic Linking)

프로그램이 두 개 있다고 가정할 때, Prog@1@과 Prog@2@가 서로 \`printf\`라는 함수를 사용할 때 메모리에 올라가 실행되면 기계어 코드로 \`printf\`가 각각 들어 있게 된다. 이는 중복으로 올리는 것이기 때문에 낭비이다.

### 여러 프로그램에 공통 사용되는 라이브러리

- 위의 printf 예제처럼 공통 라이브러리 루틴(library routine)을 메모리에 중복으로 올리는 것은 낭비이다.
- 라이브러리 루틴 연결을 실행 시까지 미룬다.
  - 실행파일 (exe)를 만들기 전에 \`link\`가 일어나는데 이를 *정적 연결(Static Linking)*이라 한다. 정적 연결이 아닌 exe파일을 *만들기 전에 \`link\` 하지 않고*, 메모리에 올려 실행할 때 printf가 있으면 *하드디스크에서* 라이브러리의 *printf 모듈*을 가져와 *메모리에 적재*되고, 해당 프로그램과 *연결(link)*시켜준다.
- 위 과정에서 동적으로 연결하는 것을 *공유 라이브러리*라 한다. -> \`in Linux\`
- 동적 연결 라이브러리 (Dynamic Linking Library) -> \`in Window\`
  - 확장자명은 \`dll\`이라 한다. 한 번이라도 지나치면서 봤을 것이다.

## Swapping

메모리에 적재되어 있지만 현재 사용되지 않고 있는 프로세스 이미지를 하드디스크의 일부에 담아두는데 이를 \`swap-out\`이라 한다. 그렇게되면 빈 자리가 생기고 해당 자리에는 다른 프로세스가 차지하게 된다.

하드디스크에서 위와 같이 두 가지로 분류되는데 파일들이 저장되어 있는 영역을 \`File System\`이라 하고, 프로세스 이미지를 담아두는 부분을 \`Backing Store\`라 하며, \`Swap device\`라고도 한다.

여기서 \`Backing Store\`의 크기는 대략 자신의 메인 메모리의 크기만큼이면 된다.

다시 사용자가 돌아왔을 때 프로세스가 이전에 실행되었던 자리에 다른 프로세스가 실행 중이라도 이전 시간에 했던 \`MMU\`의 \`Relocation Register\`에 의해 어디서 프로세스를 실행했던 상관없이 \`backing store\`에서 \`swap-in\`하고 실행하게 된다.

프로세스 크기가 크면 \`backing sotre\` 입출력에 따른 \`overhead\`도 크다.
`,
  ],
  ref: [
    {
      name: "경성대 양희재 교수님 - 8강 메모리 절약",
      link: "http://www.kocw.net/home/cview.do?mty=p&kemId=978503",
    },
  ],
};
