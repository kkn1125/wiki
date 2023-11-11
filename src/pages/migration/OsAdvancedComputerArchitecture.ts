import Placeholder from "@/entity/placeholder";
import { WIKI } from "@/util/global";
import { mdImageAuto } from "@/util/tool";

export default {
  published: true,
  title: "고등운영체제",
  path: "/os-advanced-computer-architecture/",
  modified: "2022-02-26 12:11:32",
  done: true,
  tags: ["os", "advanced computer architecture", "고등운영체제"],
  categories: ["Operating System"],
  authors: [WIKI.AUTHOR],
  wrote: "2022-02-21 21:37:39",
  toc: true,
  md: true,
  content: [
    `
# 고등 운영체제

## 다중 프로세스 시스템 (Multiprocessor System)

컴퓨터 구조를 볼 때 대표적으로 폰 노이만 구조를 볼 수 있다. 폰 노이만 구조는 1945년 수학자이자 물리학자인 존 폰 노이만과 다른 사람들이 서술한 설명에 기반해서 만든 컴퓨터 아키텍처이다.

![wiki - 폰 노이만 구조](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Von_Neumann_Architecture.svg/1024px-Von_Neumann_Architecture.svg.png)

간단히 도식화하면 자주 회자되는 \`CPU\`와 \`Memory\`이다.

${mdImageAuto("os/aca01.png", "sample")}

하지만 나아가 볼 것은 CPU가 하나가 아닌 여러 개, 다중 프로세서 시스템에 대해 알아보려한다.

${mdImageAuto("os/aca02.png", "sample")}

위의 그림과 같이 *Memory*에 *CPU*여러 개가 병렬로 연결 되어 있는 것을 *병렬 시스템 (Parallel System)*이라고 하며, CPU가 서로 메인 메모리를 공유하며 강하게 결합되어 있어 *강결합 시스템 (Tightly-Coupled System)*이라 부르기도 한다.

이렇게 여러 개의 CPU를 연결한 데에는 장점이 있어서 인데, 아래의 3가지가 주요 장점이다.

1. Performance
2. Cost
3. Reliability

## Performanc (성능)

예를 들면 계산이 필요한 특정 처리에 있어서 (ex.기상청) 하나의 CPU로 처리하는 것보다 여러 CPU로 더 많은 계산을 할 수 있다는 것이다.

그렇게 성능향상을 위한 것이 장점 중 하나이다.

## Cost (비용)

컴퓨터는 빠를수록 좋다. 하지만 좋은 성능의 CPU 하나를 쓰는 것보다 저렴하고 덜 강한 성능의 CPU를 여러 개 사용하는 것이 비용측면에서 더 싸다.

예를 들면 20만원 짜리 하드가 \`1TB\`라 칠 때 저렴하고 적당한 하드 \`500GB\`를 5만원에 산다고 생각하면 될 것 같다.

즉, 이렇게 저 비용의 CPU를 여러 개 연결해서 사용해서 성능을 향상시키는 것이 비용적으로 유리할 수 있다는 것이다.

## Reliablility (신뢰성)
  
이미지1을 보면 하나의 CPU가 연결되어 있을 때 CPU가 고장이 나면 아무런 작업을 할 수가 없게 된다.

그러나 이미지2를 보면 하나의 CPU가 고장나도 나머지 CPU가 일을 할 수 있기 때문에 작업에 대한 *신뢰성*이 보장된다는 것이다.

${mdImageAuto("os/aca03.png", "kimson")}

암울한 예제이지만 한 회사 P파트 팀에 5명의 직원이 있으면 3명이 눈치보지 않고 휴가를 갔다면 나머지 2사람이 일을 할 수 있기 때문에 작업에 대한 신뢰성이(현실은 오너입장에선 못 미더움) 보장 된다.

하지만 상상만 하다가 기획에 차질이 생겨 인원 풀이 부족해 본인 1명이서 담당할 때, 아무리 작은 일이라도 한 사람이 병가를 낸다면 유일하게 작업하던 사람이 없기에 작업에 대한 신뢰성이 없어지게 된다는 것이다.

그래서 신뢰도 측면에서 여러 CPU를 사용하는 방식이 더 낫다는 것이다.

## 다중 프로세서 운영체제 (Multiprocessor OS)

\`CPU\` 하나만 연결된 것과 여러 개가 있는 것은 운영체제가 달라야한다. \`CPU\`가 하나 일 때 작동하는 방식과 달리 여러 개가 있어 더 많은 작업을 할 수 있기 때문에 스케쥴링에 관해서 봐도 많은 것들이 달라야 한다.

그래서 다중 프로세서를 관리하는 *Multiprocessor OS*가 필요하다.

# 분산 시스템 (Distributed System)

${mdImageAuto("os/aca04.png", "kimson")}

컴퓨터와 컴퓨터가 하나의 같은 \`LAN\`(근거리 통신망)으로 연결되어 있을 때 위와 같이 메모리가 3개가 된다.

하나의 \`LAN\`에 들어있기 때문에 어떠한 작업을 할 때, 그룹화 작업이 가능하고, 서로 메세지를 주고 받으며 계산할 수 있다.

이렇게 흩어져 있는 시스템 *분산 시스템 (Distributed System)*이라 하고, *다중 컴퓨터 시스템 (Multi-computer System)*이라고도 한다.

이는 앞서 말한 다중 프로세서 시스템의 강결합과 달리 메인 메모리가 서로 떨어져 있고, 하나의 \`LAN\`상에서 느슨하게 결합되어 있기 때문에 *소결합 시스템(Loosely-Coupled System)*이라 부른다.

## 분산 운영체제 (Distributed OS)

다중 프로세서는 다중 프로세서만의 OS가 있어야 하는 맥락에서 분산 시스템 또한 어떠한 일에 대해 서로 공유하고 연관된 일을 하기 때문에 분산 시스템만의 OS, 즉, *분산 운영체제 (Distributed OS)*가 있어야 한다.

현재까지 언급된 두 가지의 컴퓨터는 공통된 목표를 가지는데 그것은 강하고, 성능이 좋고, 비용이 절감되면서 신뢰성을 보장하는 것이다.

# 실시간 시스템 (Real-Time System)

> 어떤 시간 내에 반드시 끝나야 하는 시스템

예를 들면, 컴파일을 한다고 가정할 때 변환되는 속도가 빠를수록 좋다. 단순히 빠른 것이 아닌 *특정 시간 안에* 끝나는 *시간 제약(Deadline)*을 주어 반드시 끝내는 것을 말한다. 그 시간에 계산 해내지 못하면 실패한 작업으로 본다.

또 다른 예로 자동차 네비게이션이 있는데 교차로를 통과하는 상황이라면 교차로에 오기 전에 어느 경로로 갈지 계산이 끝나고 알려주어야 하는데 교차로를 지나고서 네비게이션이 뒤늦게

"아차 왼쪽인데 이미 지났네요😉"

이러면 욕이 절로 나올 것이다. 이렇게 특정 시간 내에 계산을 끝내어 성공시키는 것을 *실시간 시스템*이라 한다.

## 사용되는 분야의 예

- 공장 자동화(FA)
- 군사, 항공, 우주 등

실시간 시스템 또한 실시간 시스템에 맞춰 관리하는 운영체제가 필요한데 이를 *실시간 운영체제 (Real-Time OS = RTOS)*라고 한다.

이 모든 운영체제는 고등 컴퓨터 구조가 나타나면서 그에 겨냥하여 운영체제를 만들게 된다.

-----

- \`컴파일\` *High level language* -> *기계어*로 변환하는 작업을 하는 것

`,
  ],
  links: [
    {
      name: "경성대 양희재 교수님 - 2강 고등운영체제, 인터럽트 기반 운영체제",
      link: "http://www.kocw.net/home/cview.do?mty=p&kemId=978503",
    },
  ],
};
