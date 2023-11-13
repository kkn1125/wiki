import { mdImageAuto } from "@/util/tool";

export default {
  published: true,
  title: "classical synchronization problem 02",
  modified: "2022-03-09 20:30:25",
  done: true,
  tags: [
    "os",
    "classical",
    "problem",
    "synchronization",
    "philosopher",
    "철학자",
  ],
  categories: ["cs", "Operating System"],
  authors: ["kimson"],
  wrote: "2022-03-04 16:41:59",
  toc: true,
  md: true,
  content: [
    `
# 전통적 동기화 (Classical Synchronization Problem)

## Readers-Writers Problem

### 공통된 데이터베이스

하나의 데이터베이스에 접근한다 했을 때, 데이터 조회 할 때 데이터를 읽기만 하는 *Reader Process*와 읽고 바꾸기도 하는 *Writer Process*가 있다.

이때 쉽게 보면 데이터베이스 자체를 \`Critical Section\`으로 두면 되는데, 이는 비효율적이게 된다.

### 효율성 제고

\`Reader Process\`가 만일 데이터베이스에 여러 개 접근한다고 가정 해보자. 읽기만 하기 때문에 내용이 바뀔 일이 없다. 그래서 \`Reader\`는 허용하는 것으로 효율성을 제고할 수 있다.

반대로 Writer가 두 개 이상 들어온다면 \`Mutual exclusion\`이 고려되야 한다. 다르게 볼 때, \`Writer\`가 이미 들어와서 내용을 수정 중인데 \`Reader\`도 들어온다면 어떻게 해야할까.

당연히 허용해도 된다. 왜냐하면 굳이 내용이 변경되는 게 아닌 읽기만 하는데 허용을 안 할 이유가 없다는 것이다. \`Writer\`끼리의 상호배타를 신경써야하는 것이다.

- \`Readers\` ==> read data, never modify it
- \`Writers\` ==> read data and modify it
- \`상호배타\` ==> 한 번에 한 개의 프로세스만 접근 -> 비효율적

### 변종

- The fist R/W Problem (Readers-preference) -> 위에서 말한 \`Reader\` -> \`Writer\` 순서로 항상 Reader에 우선순위를 준다는 것이다.
- The second R/W Problem (Writer-preference) -> 반대로 \`Writer\` -> \`Reader\`순서로 항상 \`Writer\`에 우선순위를 주는 것이다.
- The third R/W Problem -> 우선권을 아무에게도 안 주는 것이다.

> 넓게 다루어지는 영역은 아니다. 그래도 알고는 있어야 한다.

## Dining Philosopher Problem (식사하는 철학자)

### 문제 1

5명의 철학자와 5개의 젓가락이 있다. 식사를 하기 위해 젓가락 두 개가 필요하다. 철학자는 생각 -> 식사 -> 생각 -> 식사 ... 패턴으로 밥을 먹는다.

${mdImageAuto("os/phil01.jpg", "sample")}

위 내용을 토대로 코드로 구현하고자 한다. 의사코드로 보면 아래와 같다.

1. 0번 철학자가 0번, 1번 젓가락을 든다.
2. 0번 철학자가 밥을 먹는다.
3. 0번 철학자가 0번, 1번 젓가락을 놓는다.
4. 0번 철학자는 생각한다.
5. 1번 철학자가 1번, 2번 젓가락을 든다.
6. 1번 철학자가 밥을 먹는다.
7. 1번 철학자가 1번, 2번 젓가락을 놓는다.
8. 1번 철학자가 생각한다.
9. ...

이제 의사코드를 바탕으로 Java코드로 구현하면 아래와 같다.

\`\`\`java
import java.util.concurrent.Semaphore;

class Philosopher extends Thread {
  int id;
  Semaphore lstick, rstick;

  Philosopher(int id, Semaphore lstick, Semaphore rstick) {
      this.id = id;
      this.lstick = lstick;
      this.rstick = rstick;
  }

  public void run() {
      try {
          while (true) {
              lstick.acquire();
              rstick.acquire();

              eating();

              lstick.release();
              rstick.release();
              thinking();
          }
      } catch (InterruptedException e) {
      }
  }

  void eating() {
      System.out.println("[" + id + "] eating");
  }

  void thinking() {
      System.out.println("[" + id + "] thinking");
  }
}

public class test {
  static final int num = 5;

  public static void main(String[] args) {
      int i;

      // chopsticks
      Semaphore[] sticks = new Semaphore[num];
      for (i = 0; i < num; i++)
          sticks[i] = new Semaphore(1);

      // philosopher
      Philosopher[] phil = new Philosopher[num];
      for (i = 0; i < num; i++)
          phil[i] = new Philosopher(i, sticks[i], sticks[(i + 1) % num]);

      // let philosophers eat and think
      for (i = 0; i < num; i++)
          phil[i].start();
  }
}
\`\`\`

이 코드를 실행해보면 \`while\`문에 \`true\`값인데도 불구하고 \`block\`되는 것을 볼 수 있다.

이러한 잘못된 결과는 동기화문제에서 온다. 만일 철학자 전부가 배가 고파서 동시에 젓가락을 드는 상황이 온다면 철학자 중 한 명이 젓가락을 쥐고 밥을 먹고 있으니 젓가락이 없어 나머지 철학자는 식사를 하지 못한다.

while문이 계속 돌지 못하고 이러한 상태에 빠져 오작동하는 것을 *교착상태(Deadlock)*이라 한다.

## 교착상태 (deadlock) {:.text-danger}

프로세스는 실행되려면 여러 자원을 필요로 한다.

- CPU, 메모리, 파일, 프린터 ...
- 어떤 자원은 갖고 있지만 다른 자원은 갖지 못할 때(ex: 다른 프로세스가 사용 중 일 때) *대기*해야 한다.
- 다른 프로세스 역시 다른 자원을 가지려고 대기할 때 *교착상태* 가능성이 있다.

### 교착상태 필요 조건(Necessary Conditions)

교착상태는 보통 잘 일어나지 않는다. 하지만 필요 조건이 말하는 것은 아래의 사항이 모두 만족되는 상황이라면 *교착상태가 발생 할 수 있다*는 이야기를 한다.

- Mutual exclusion (상호배타)
  - 자원을 누군가 사용하고 있다면 다른 누군가는 자원을 사용하지 못하는 것
- Hold and wait (보유 및 대기)
  - 철학자 문제로 예를 들면 0번 철학자가 0번 젓가락을 들고 있으면서 1번 철학자가 1번 젓가락을 들고 있을 때 0번 철학자가 1번 젓가락을 들기 위해 대기하는 상황이다.
- No Preemption (비선점)
  - 젓가락을 빼앗아 식사를 하면 굶어 죽는 일은 없다. 하지만 뺏지 못하기 때문에 이러한 *starvation*이 일어난다.
- Circular wait (환형대기)
  - 원형으로 순환하고 있기 때문에 발생 가능성이 생기는 것이다.

### 자원 (Resources)

#### 동일 자원

동일 형식 자원(instance)이 여러 개 있을 수 있다. 예를 들면 동일 CPU 2개, 동일 프린터 3개 등 ...

#### 자원의 사용

- \`요청(request)\` -> \`사용(use)\` -> \`반납(release)\`

#### 자원 할당도 (Resource Allocation Graph) {:.text-danger}

시스템 내에 어떤 자원이 있고, 그 자원이 어떤 프로세스에게 할당되었는가? 또는 어떤 프로세스가 어떤 자원을 할당 받으려고 기다리고 있는가를 그림으로 나타내는 것을 말한다.

- 자원 ==> 사각형
- 프로세스 ==> 원
- 할당 ==> 화살표

자원에서 프로세스로 가면 \`assign\`, 프로세스에서 자원으로 가면 \`request\`이다.

![]()
${mdImageAuto("os/deadlock01.jpg", "deadlock01")}

위의 그림을 교착상태 필요조건에서 제시한 4가지에 해당되는지 보자.

얼핏 봐서는 상호배타, 보유대기, 비선점이 이루어질 수 있다. 하지만 원형으로 순환하고 있지는 않다. 환형대기가 발생하려면 \`P@2@\` -> \`R@1@\`으로 화살표가 바뀌어야 가능해진다.

식사하는 철학자 문제를 자원 할당도로 나타내면 아래와 같다.

${mdImageAuto("os/phil01.jpg", "sample")}

이렇게 원형으로 요청, 할당하기 때문에 교착상태 가능성이 있는 것이다. 그렇다면 교착상태를 해결하려면 어떻게 해야할까?

환형대기를 해제하는 방법은 여러 방법이 있지만 쉽게 생각해 볼 수 있는 방법으로는 홀 수(혹은 짝 수) 번째 철학자는 왼쪽 젓가락을 먼저 들고, 그 다음 오른쪽 젓가락을 들고, 짝 수(혹은 홀 수) 번째 철학자는 오른쪽 젓가락을 먼저 들고, 그 다음 왼쪽 젓가락을 드는 형태로 바꾸면 원형의 요청, 할당에서 벗어날 수 있다.

\`\`\`java
import java.util.concurrent.Semaphore;

class Philosopher extends Thread {
  int id;
  Semaphore lstick, rstick;

  Philosopher(int id, Semaphore lstick, Semaphore rstick) {
      // 생략 ...
  }

  public void run() {
      try {
          while (true) {
              // -
              // lstick.acquire();
              // rstick.acquire();

              // +
              if ((id % 2 == 0)) {
                  lstick.acquire();
                  rstick.acquire();
              } else {
                  rstick.acquire();
                  lstick.acquire();
              }

              // 생략 ...
          }
      } catch (InterruptedException e) {
      }
  }

  void eating() {
      System.out.println("[" + id + "] eating");
  }

  void thinking() {
      System.out.println("[" + id + "] thinking");
  }
}

public class test {
  // 생략 ...
}
\`\`\`

나머지 코드는 \`code block [ 1 ]\`과 같기 때문에 생략했다. 변경된 부분을 \`+\`와 \`-\`로 구분지었다.

id가 짝 수 일 때 왼쪽 젓가락을, 홀 수 일 때 오른쪽 젓가락을 먼저 들도록 하게 하면, 신기하게도 \`while\`문을 계속 돌며, 교착상태에 빠지지 않게 된다.

> 교착상태의 필요조건은 자원 할당도 상에 원이 만들어져야 하며(환형 대기), 충분 조건이 아니기 때문에 언제까지나 일어날 수도 있다는 이야기이다.
`,
  ],
  ref: [
    {
      name: "경성대 양희재 교수님 - 6강 기타 전통적 동기화 문제",
      link: "http://www.kocw.net/home/cview.do?mty=p&kemId=978503",
    },
  ],
};
