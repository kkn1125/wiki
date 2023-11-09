import Wiki from "@/entity/wiki";
import { TITLE_2, TITLE_3, TITLE_4 } from "@/util/global";
import { classes } from "@/util/tool";

export const WebRTC = new Wiki("WebRTC 관련", "/webrtc");
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
WebRTC.created_at = new Date(2023, 10, 9);
WebRTC.content = () =>
  Wiki.Layout.bind(WebRTC)`
<div class="section">
  <h3 class="${classes(TITLE_3)}">Content</h3>
  <p>This is the content of the wiki detail page. It can be quite long, and you can scroll to read more.</p>
  <p>More content goes here...</p>
  <!-- Add your content here -->
</div>
`.trim();
