import { figImage } from "@/util/tool";

import Wiki from "@/entity/wiki";
import Placeholder from "@/entity/placeholder";

export const OsBase = new Wiki("운영체제 서론", "/os-base/");
OsBase.category = "Operating System";
OsBase.addTag("cs");
OsBase.addTag("os");
OsBase.addLink({
  name: "경성대 양희재 교수님 - 1강 운영체제 서론",
  path: "http://www.kocw.net/home/cview.do?mty=p&kemId=978503",
  target: "_blank",
});
OsBase.created_at = new Date("2023-11-11 16:27:07");
OsBase.content = () =>
  Wiki.Layout.bind(OsBase)`# 운영체제 (Operating System)

> 운영체제란 시스템 하드웨어를 관리, 응용 소프트웨어를 실행하기 위해 하드웨어 추상화 플랫폼과 공통 시스템 서비스를 제공하는 시스템 소프트웨어이다.

## 운영체제의 필요성

프로세스가 메인 메모리의 명령을 가져와 실행하고, 그 다음 명령을 가져와 실행 반복하는데 이를 가능하도록 메모리에 실행 파일을 올려주는 역할을 운영체제가 한다.

운영체제가 없다면 메모리에 혼재되어 있는 \`Instruction\`들을 프로세스가 읽더라도 제멋대로의 명령이 실행되어 컴퓨터를 사용하지 못하게 된다.

> *파일의 실행조건* -> 메모리에 올려져야 실행 가능한 상태가 된다.  
> *하드디스크 내부* -> 실행 파일이 들어있다. (OS도 포함)  
> *프로그램* -> 메인 메모리에 어떠한 명령(Instruction)들이 기록되어야 하는데 이 명령들의 모음  
> *프로그램 내장형 컴퓨터* -> 미리 프로그램을 메모리에 내장해두고 실행하는 구조의 컴퓨터

## 운영체제의 목적

1. 성능(Performance)을 높인다.
2. 편의성(Convenience)을 제공한다.
3. 컴퓨터를 관리해주는 프로그램이다. (Control program for computer)

# 컴퓨터의 구조

![placeholder](${new Placeholder(500, 300).image.src})

## 컴퓨터 동작 과정

1. 전원 on
    - ROM을 읽어 실행
    - POST(Power on self test) 진행
        - CPU가 컴퓨터의 메인 메로리가 얼마나 있고 하드디스크 용량이 얼마이고, 하드웨어가 잘 연결되어 있는지 부팅 시 테스트 하는 것
    - Boot Load 진행 (과정을 부팅이라고 한다.)
        1. 하드디스크의 OS를 조회
        2. 메인 메모리에 올림
            - 이때부터 OS는 메모리에 상주하게 된다.
            - 전원이 꺼지기 전까지 Resident
    - 위의 과정 종료 후 ROM의 역할이 끝나고 더 이상 ROM을 읽지 않음
2. 화면이 출력 (흔한 들판 배경 이미지에 폴더, 파일들 주르륵...)

## Main Memory

|구분|내용|비고|
|---|---|---|
|*RAM*|전원이 꺼지면 사라지는 휘발성 메모리|수 백MB ~ 수GB|
|*ROM (Read only memory)*|전원과 관계 없이 내용이 유지(메인 메모리에서 극히 일부 차지)|수 십KB ~ 수 백KB|

# 커널(Kernel)과 쉘(Shell)

![placeholder](${new Placeholder(500, 300).image.src})

> 어플리케이션 영역으로 갈수록 사용자와 근접하고, 커널로 갈수록 하드웨어와 밀접한 관계를 가진다. *OS*는 *커널*과 *쉘*로 구성이 되어 있고, *커널이 핵심*이 되어 하드를 관리하고, *쉘*은 *사용자의 명령을 해석*하는 개념이다.

1. \`H/W(하드웨어)\` 하드디스크
2. \`OS(운영체제)\` 하드디스크를 관리, 제어한다.
    - \`kernel\` 실제로 관리를 하는 프로그램 (CPU, Memory, Disk ...)
    - \`Shell\` 윈도우는 UI로, Linux는 텍스트로 명령을 내린다.
        - 사용자 명령을 해석하고 출력해준다.
        - 다른 말로 Command Interpreter
3. \`Application\` 컴퓨터 응용프로그램이다. 예를들면 mp3, hwp, pptx 등의 실행가능한 프로그램들을 말한다. 이러한 응용프로그램은 어느 운영체제 위에서 실행되게 되는데, 만일 하드웨어가 동일하더라도 OS가 변경되면 이 응용프로그램은 작동되지 못한다.

> \`Application\`은 하드웨어 자원을 사용하고는 있지만 직접적으로 사용하는 것이 아닌 OS의 조정을 통해 사용 가능해지는 것이다.

## OS의 자원관리

![placeholder](${new Placeholder(500, 300).image.src})

운영체제에는 여러 자원 관리자, 자원 할당자가 존재한다. 운영체제를 총괄 관리하는 개념으로 정부를 예를 들고는 한다. 하지만 전공이 건축이기 때문에 예를 건축가로 들고 싶다.

건축가는 여러 업체나 전문가와 협력해서 건축물을 계획하고 설계한다. 이때 인력이라는 자원, 레퍼런스라는 자원, 전문가라는 자원을 잘 활용해서 본인이 일을 직접 하긴하지만 구조설계, 기계, 전기, 토목 등 다양한 전문분야의 전문가와 회의를 통해 여러 문제점을 해결해 나간다.

건축가는 업체들과 함께 일을 진행하면서 생기는 업무(자원)을 각 전문가와 업체에게 할당하고 관리하게 된다.

이러한 순환은 건축 뿐 아니라 여러 직군에서도 그럴 것이라 생각한다. 위 예시를 토대로 컴퓨터의 관점에서 보자면 \`OS\`는 \`하드웨어\`라는 자원을 \`Application\`에 *할당*하고 *관리*하는 이야기로 바꿔 말할 수 있다.

## OS의 management 종류

![placeholder](${new Placeholder(500, 300).image.src})

- Process Management
- Memory Managementm I/O Management
- File Management
- Network Management ... 등등`.trim();
