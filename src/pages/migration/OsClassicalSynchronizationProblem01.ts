import { mdImageAuto } from "@/util/tool";

export default {
  published: true,
  title: "classical synchronization problem 01",
  modified: "2022-03-09 20:30:30",
  done: true,
  tags: [
    "os",
    "classical",
    "problem",
    "synchronization",
    "busy-wait",
    "생산",
    "소비",
  ],
  categories: ["cs", "Operating System"],
  authors: ["kimson"],
  wrote: "2022-03-03 20:56:12",
  toc: true,
  md: true,
  content: [
    `
# 전통적 동기화 (Classical Synchronization Problem)

프로세스 관리라 하면, 크게 두 가지이다. *CPU Scheduling*, *Process Synchronization*이다.

## Producer & Consumer Problems

> 생산자 소비자 문제 또는 유한버퍼 문제(Bounded Buffer Problem) 라고 한다.

### 생산자와 소비자

\`생산자\`가 데이터를 생산하면 \`소비자\`는 그것을 소비한다. 예를 들면 컴파일러는 C, Java 와 같은 \`high-level\` 언어를 \`low-level\` 언어로 번역하는 것이다. 이때 \`high-level\`언어는 \`Assembly\`코드로 만들어 낸다. 그 다음 \`Assembler\`라는 프로그램이 기계어로 번역한다.

즉, 하나의 언어가 컴파일 되어 나타난 결과는 연달아 처리가 되는데, Compiler가 *생산*해낸 결과(Assembly code)를 Assembler가 소비하는 것이다. 그 외 다른 비유는 아래와 같다.

- 파일 서버 (생산) ==> 클라이언트 (소비)
- 웹 서버 (생산) ==> 웹 클라이언트 (소비)

### Bounded Buffer

일반적으로 생산 속도와 소비 속도는 다르다. \`Producer\`와 \`Consumer\`사이에는 \`Buffer\`를 두게 된다. \`Buffer\`는 데이터를 모아 둘 수 있는 공간이다.

생산된 데이터는 *버퍼에 일단 저장* (속도 차이 등) 된다. *버퍼는* 현실 시스템에서 *크기가 유한*하기 때문에 생산자는 버퍼가 가득 차면 더 넣을 수 없다. 그래서 *생산자는 기다리게* 된다. 소비자가 *버퍼를 소비*하므로써 *공간이 생기면* 생산자가 다시 채워 넣을 수 있다. 반대로 *소비자는 비어있으면* 빼 낼 수 없다.

위 내용을 \`Java\`로 써보면 아래와 같다. (교수님 강의에서 테스트를 위해 조금 바꿨다.)

\`\`\`java
import java.util.Arrays;

public class Test {
public static void main(String[] args) {
  Buf buf = new Buf(5);
  
  buf.insert(1);  // [ 1, 0, 0, 0, 0 ] [ inserted :  1 ]
  buf.insert(2);  // [ 1, 2, 0, 0, 0 ] [ inserted :  2 ]
  buf.insert(3);  // [ 1, 2, 3, 0, 0 ] [ inserted :  3 ]
  buf.insert(4);  // [ 1, 2, 3, 4, 0 ] [ inserted :  4 ]
  buf.insert(5);  // [ 1, 2, 3, 4, 5 ] [ inserted :  5 ]
  buf.remove();   // [ 1, 2, 3, 4, 5 ] [ removed  :  1 ]
  buf.insert(6);  // [ 6, 2, 3, 4, 5 ] [ inserted :  1 ]
  buf.remove();   // [ 6, 2, 3, 4, 5 ] [ removed  :  2 ]
  buf.insert(7);  // [ 6, 7, 3, 4, 5 ] [ inserted :  7 ]
  buf.remove();   // [ 6, 7, 3, 4, 5 ] [ removed  :  3 ]
  buf.insert(8);  // [ 6, 7, 8, 4, 5 ] [ inserted :  8 ]
  buf.remove();   // [ 6, 7, 8, 4, 5 ] [ removed  :  4 ]
  buf.insert(9);  // [ 6, 7, 8, 9, 5 ] [ inserted :  9 ]
  buf.remove();   // [ 6, 7, 8, 9, 5 ] [ removed  :  5 ]
  buf.remove();   // [ 6, 7, 8, 9, 5 ] [ removed  :  6 ]
  buf.remove();   // [ 6, 7, 8, 9, 5 ] [ removed  :  7 ]
  buf.remove();   // [ 6, 7, 8, 9, 5 ] [ removed  :  8 ]
  buf.remove();   // [ 6, 7, 8, 9, 5 ] [ removed  :  9 ]
  buf.remove();   // [ 6, 7, 8, 9, 5 ] [ Not consumed  ]
}
}

class Buf {
int[] buf;
int size, count, in, out;

Buf(int size) {
  buf = new int[size];
  this.size = size;
  count = in = out = 0;
}

void insert(int item) {
  System.out.println("===insert===");
  if(count == size) {
    System.out.println("Not produced");
  } else {
    buf[in] = item;
    in = (in + 1) % size;
    count++;
    
    info();
  }
}

int remove() {
  System.out.println("===remove===");
  if(count == 0) {
          System.out.println("Not consumed");
          return -1;
      } else {
        int item = buf[out];
        out = (out + 1) % size;
        count--;
        
        System.out.println("! removed : " + item);
        info();
        return item;
      }
}

void info() {
  System.out.println("========================");
  System.out.println("Buffer is : " + Arrays.toString(buf));
  System.out.println("Buffer size is : " + size);
  System.out.println("count is : " + count);
  System.out.println("in is : " + in);
  System.out.println("out is : " + out);
  System.out.println("========================");
}
}
\`\`\`

이렇게 생산하고 소비하는 것을 똑같은 횟수로 반복하면 count는 0이 나와야 한다. 하지만 간혹 아닌 경우가 있다.

그렇다면 *Producer*와 *Comsumer*를 Java로 구현해보면 어떻게 될까? 이전에 했던 \`BankAccount\` 문제 처럼 두 가지를 스레드로 만들면 된다.

\`\`\`java
package os;

class Buffer {
int[] buf;
int size, count, in, out;

Buffer(int size) {
  buf = new int[size];
  this.size = size;
  count = in = out = 0;
}

void insert(int item) {
  if(count == size) {
    System.out.println("Not produced");
  } else {			
    System.out.println("inserted : " + item);
    buf[in] = item;
    in = (in + 1) % size;
    count++;
    
  }
}

int remove() {
  if(count == 0) {
          System.out.println("Not consumed");
          return -1;
      } else {        	
        int item = buf[out];
        out = (out + 1) % size;
        count--;
        
        System.out.println("! removed : " + item);
        return item;
      }
}
}

// ================ Producer ================
class Producer extends Thread {
Buffer b;
int N;
public Producer (Buffer b, int N) {
  this.b = b;
  this.N = N;
}
public void run() {
  for (int i=0; i<N; i++) {
    b.insert(i);
  }
}
}

// ================ Consumer ================
class Consumer extends Thread {
Buffer b;
int N;
public Consumer (Buffer b, int N) {
  this.b = b;
  this.N = N;
}
public void run() {
  int item;
  for (int i=0; i<N; i++) {
    item = b.remove();
  }
}
}

public class Test2 {
public static void main (String[] args) {
  Buffer b = new Buffer(100);
  Producer p = new Producer(b, 10000);
  Consumer c = new Consumer(b, 10000);
  p.start();
  c.start();
  try {
    p.join();
    c.join();
  } catch (Exception e) {
    // TODO: handle exception
  }
  System.out.println("Number of items in the buf is " + b.count);
}
}
\`\`\`

#### 잘못된 결과

작동시켜보면 정상적일 때는 0이 나오지만 가끔 100이 나오거나 잘못된 값이 나온다.

혹은 실행불가가 나온다. 최족적으로는 버퍼 내에는 0개의 항목이 있어야 한다. 즉, \`Consumer\`가 못 꺼내야 하는 것이다.

#### 이유

공통변수(임계구역) count와 buf[]에 대한 동시 업데이트 때문이다. 업데이트 구간에 대한 동시 진입으로 인해 잘못된 결과 값이 나오거나 실행이 불가하게 된다.

${mdImageAuto("os/prod-cuns01.jpg", "test")}

#### 해결방법

- \`mutually exclusive\` ==> 임계구역에 대한 동시 접근을 방지하는 상호배타적 관계를 형성해야 한다.
- \`세마포 사용\`
- 세마포 mutex.value = 1 (# of mermit)
- 각 스레드는 들어가기 전 acquire, 나온 후 release를 해준다.

위 코드에서 느려지는 출력구문을 제거하고 세마포를 적용하면 다음과 같다.

\`\`\`java
package os;

import java.util.concurrent.Semaphore;

class Buffer {
int[] buf;
int size, count, in, out;
Semaphore mutex; // +

Buffer(int size) {
  buf = new int[size];
  this.size = size;
  count = in = out = 0;
  mutex = new Semaphore(1);
}

void insert(int item) {
  while(count == size)
    ;
  try {
    mutex.acquire(); // +
    ///////////////////////// CS
    buf[in] = item;
    in = (in + 1) % size;
    count++;
    ///////////////////////// CS
    mutex.release(); // +
  } catch (Exception e) { }
}

int remove() {
  while(count == 0)
    ;
    try {
      mutex.acquire(); // +
    ///////////////////////// CS
      int item = buf[out];
        out = (out + 1) % size;
        count--;
    ///////////////////////// CS
        mutex.release(); // +
        return item;
    } catch (Exception e) { }
    return -1;
}
}

/***************** Producer *****************/
class Producer extends Thread {
Buffer b;
int N;
public Producer (Buffer b, int N) {
  this.b = b;
  this.N = N;
}
public void run() {
  for (int i=0; i<N; i++) {
    b.insert(i);
  }
}
}

/***************** Consumer *****************/
class Consumer extends Thread {
Buffer b;
int N;
public Consumer (Buffer b, int N) {
  this.b = b;
  this.N = N;
}
public void run() {
  int item;
  for (int i=0; i<N; i++) {
    item = b.remove();
  }
}
}

public class Test2 {
public static void main (String[] args) {
  Buffer b = new Buffer(100);
  Producer p = new Producer(b, 10000);
  Consumer c = new Consumer(b, 10000);
  p.start();
  c.start();
  try {
    p.join();
    c.join();
  } catch (Exception e) {
    // TODO: handle exception
  }
  System.out.println("Number of items in the buf is " + b.count);
}
}
\`\`\`

이렇게 적용하고 보면 10000번 계산 속도도 약간 증가한 느낌이고, 정확하게 *원하던 결과 값인 0을 출력*해주게 된다.

##### Busy-wait

다른 문제점이 존재하는데 생산자는 버퍼가 가득 차면 기다려야하고, 소비자 또한 버퍼가 비어있으면 기다려야한다.

즉, 위 코드에서 producer를 보면 while문 검증에서 count와 size가 같을 때 무한 루프를 돌며 기다리게 되어 있는데, 이는 CPU도 발이 묶이기 때문에 좋지 않다. 이렇게 *CPU가 다른 일 못하고 묶여 있는 것을 Busy-wait*라 한다. (소비도 마찬가지)

##### 세마포를 사용한 busy-wait 회피

- 생산자 ==> empty.acquire() \`permit === BUF_SIZE\`
- 소비자 ==> full.acquire() \`premit === 0\`

그래서 이 문제를 해결하기 위해서는 두 가지의 세마포를 더 추가해서 각 \`while 검증\` 부분을 변경하려한다.

empty일 때의 세마포와 full일 때의 세마포를 생성하는데, producer는 빈 곳이 없으면(가득 차면) 멈추기 위해 *empty세마포의 초기 value 값을 size만큼* 한다.

consumer는 소비할 것이 없으면 block되어야 하므로 *full세마포의 초기 value는 0*이 된다.

간단하게 보면 아래와 같이 작동되어야 한다.

- prod. ==> \`empty.acquire()\` -> \`mutex.acquire()\` -> \`CS\` -> \`mutex.release()\` -> \`full.release()\`
- consum. ==> \`full.acquire()\` -> \`mutex.acquire()\` -> \`CS\` -> \`mutex.release()\` -> \`empty.release()\`

이제 위의 내용대로 세마포를 생성해서 while을 제거하고 교체해주면 아래와 같은 코드를 짤 수 있다.

\`\`\`java
package os;

import java.util.concurrent.Semaphore;

class Buffer {
int[] buf;
int size, count, in, out;
Semaphore mutex, empty, full;

Buffer(int size) {
  buf = new int[size];
  this.size = size;
  count = in = out = 0;
  mutex = new Semaphore(1);
  empty = new Semaphore(size);
  full = new Semaphore(0);
}

void insert(int item) {
//		while(count == size); // -
  try {
    empty.acquire(); // +
    mutex.acquire();
    ///////////////////////// CS
    buf[in] = item;
    in = (in + 1) % size;
    count++;
    ///////////////////////// CS
    mutex.release();
    full.release(); // +
  } catch (Exception e) { }
}

int remove() {
//		while(count == 0); // -
    try {
      full.acquire(); // +
      mutex.acquire();
    ///////////////////////// CS
      int item = buf[out];
        out = (out + 1) % size;
        count--;
    ///////////////////////// CS
        mutex.release();
        empty.release(); // +
        return item;
    } catch (Exception e) { }
    return -1;
}
}

// ================ Producer ================
class Producer extends Thread {
Buffer b;
int N;
public Producer (Buffer b, int N) {
  this.b = b;
  this.N = N;
}
public void run() {
  for (int i=0; i<N; i++) {
    b.insert(i);
  }
}
}

// ================ Consumer ================
class Consumer extends Thread {
Buffer b;
int N;
public Consumer (Buffer b, int N) {
  this.b = b;
  this.N = N;
}
public void run() {
  int item;
  for (int i=0; i<N; i++) {
    item = b.remove();
  }
}
}

public class Test2 {
public static void main (String[] args) {
  Buffer b = new Buffer(100);
  Producer p = new Producer(b, 10000);
  Consumer c = new Consumer(b, 10000);
  p.start();
  c.start();
  try {
    p.join();
    c.join();
  } catch (Exception e) {
    // TODO: handle exception
  }
  System.out.println("Number of items in the buf is " + b.count);
}
}
\`\`\`

결과는 동일한 0의 값이 나오지만 내부에서는 CPU 효율면에서 더욱 좋아진다. CPU를 무한루프하지 않고 아예 block되어 CPU를 쓸데없이 사용하지 않게 된다.
`,
  ],
  ref: [
    {
      name: "경성대 양희재 교수님 - 6강 생산자-소비자 문제",
      link: "http://www.kocw.net/home/cview.do?mty=p&kemId=978503",
    },
  ],
};
