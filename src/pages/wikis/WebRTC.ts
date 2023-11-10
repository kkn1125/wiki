import Wiki from "@/entity/wiki";

export const WebRTC = new Wiki("WebRTC 관련", "/webrtc/");
WebRTC.category = "javascript";
WebRTC.addTag("webrtc");
WebRTC.addTag("p2p");
WebRTC.addTag("mcu");
WebRTC.addTag("sfu");
WebRTC.addLink({
  name: "test1",
  path: "https://www.naver.com",
  target: "_blank",
});
WebRTC.created_at = new Date("2023-11-9 15:41:25");
WebRTC.content = () =>
  Wiki.Layout.bind(WebRTC)`
### Content

This is the content of the wiki detail page. It can be quite long, and you can scroll to read more.
`.trim();
