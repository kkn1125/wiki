import Wiki from "@/entity/wiki";

export const JavascriptClass = new Wiki(
  "JavaScript Class에 대해서",
  "/javascript-class/"
);
JavascriptClass.category = "language";
JavascriptClass.addTag("javascript");
JavascriptClass.addTag("class");
// JavascriptClass.addLink({
//   name: "test1",
//   path: "https://www.naver.com",
//   target: "_blank",
// });
JavascriptClass.created_at = new Date("2023-11-13 16:58:12");
JavascriptClass.content = () =>
  Wiki.Layout.bind(JavascriptClass)`
# 자바스크립트의 객체

클래스에 대해 알아보기 전에 자바스크립트의 객체 성질을 알아봐야합니다. 자바스크립트는 \`Object\`타입의 객체를 사용할 때 프로토타일이라는 속성이 존재합니다. 자바스크립트의 객체 모두에게 적용되는 공통 요소입니다.

자바스크립트에서 프로토타입은 아주 중요한 요소입니다. 객체를 생성할 때 기본적으로 \`Object\`라는 타입이 프로토타입으로 존재합니다. 이 프로토타입은 자바로 예를 들면 생성자인 constructor와 유사합니다.

만일 A 객체가 B 객체를 상속하는 개념을 구현하고자 한다면, 이 프로토타입을 이용해서 상속을 구현해야합니다. ES6부터 class 키워드가 도입됐습니다. ES6이전에 객체는 function을 이용해 객체를 생성했습니다. 아래는 객체를 정의하는 예시입니다.

\`\`\`javascript {filename="src/main.js"}
function User(nickname, email){
  console.log(this, this.constructor, this.constructor.prototype, this.__proto__);
  this.nickname=nickname;
  this.email=email;
}

const kimson = new User('kimson', 'kimson@gmail.com');

console.log(kimson instanceof Object); // true
console.log(kimson instanceof User); // true
\`\`\`

User라는 이름으로 객체가 생성됩니다. User는 User의 인스턴스이기도 하고 Object의 인스턴스이기도 합니다.

모든 객체는 Object는 프로토타입으로 하고 정의한 User 또한 기본적으로 Object를 기반으로 합니다.

그렇다면 User라는 객체를 Client와 Admin이라는 객체를 정의하고 User를 상속하려면 어떻게 해야할까요?


## 객체의 상속

객체의 상속에서 프로토타입을 이용해야한다고 앞서 말했습니다. 그렇다면 프로토타입에 상속하고자 하는 객체를 대입하면 됩니다.

\`\`\`javascript
function Player(role, ...rest) {
  this.constructor.apply(this.constructor.prototype, rest);
  this.role=role;
}

min.prototype.constructor = User.prototype.constructor;
Player.prototype = User.prototype;

const test = new Player('admin', 'test', 'test@gmail.com');
\`\`\`

Player이라는 객체를 정의할 때 constructor에 prototype을 this로 전달하고, 나머지 arguments를 전달합니다.

constructor가 호출되면 Player의 생성자 프로토타입이 User의 프로토타입이 되고 기존 User객체의 인자로 Player의 인스턴스 생성에 전달된 인자 값이 User로 전달되어 객체의 생성자까지 상속이 구현됩니다.

`.trim();
