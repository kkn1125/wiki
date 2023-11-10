import Wiki from "@/entity/wiki";

export const Api = new Wiki("Api", "/api/");
Api.category = "cs";
Api.addTag("dictionary");
// Api.addLink({
//   name: "test1",
//   path: "https://www.naver.com",
//   target: "_blank",
// });
Api.created_at = new Date("2023-11-10 16:31:32");
Api.content = () =>
  Wiki.Layout.bind(Api)`
### API


|핵심|설명|
|---|---|
|매개역할|프로그램 간 통신을 하게 해준다.|
| |요청하면 서버에 저장된 데이터를 꺼내어 준다.|
| |권한 또는 효청횟수, 비용 등의 제약이 있는 API도 있다.|
| |API를 호출함으로써 다른 프로그램에 전달하여 데이터를 처리, 이용할 수 있다.|





API의 예로 중간 단계에서 요청을 다루는 역할을 하는 것으로 많이들 예로 듭니다.

사용의 예로 들면, 주소 API를 사용한다고 가정할 때 우리가 그 주소데이터가 담긴 서버를 직접 들어가거나 요청하지 않습니다. 그 데이터에 접근할 수 있는 API라는 녀석에게 "경상남도에 어디 지역을 줘"라고 요청이 오면 해당 데이터를 허용된 요청자에게 접근성이 부여된 요청자에게 내용을 전달해줍니다.

즉, "내"가 요청해서 "API"가 데이터에 접근하고 요청 내용을 다시 "내"가 받는 모양세입니다. 이 때문에 어디서는 은행에서의 "창구"와 같은 역할, 또는 음식점에서의 "점원"과 같은 역할이라고 표현합니다.

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
public class bfsTest {
Boolean[] check;
ArrayList<Integer>[] list;
@Test
public void bfsTest() {
    int[][] graph = {
            {0,0,0,0,0},
            {0,0,0,0,0},
            {0,0,0,0,0},
            {0,0,0,0,0},
            {0,0,0,0,0},
    };
    int maxX = 5;
    int maxY = 5;
    int result = bfs(graph, 2, 2, maxX, maxY);
    System.out.println(result);
    for(int[] row : graph) {
        System.out.println(Arrays.toString(row));
    }
}
public Integer bfs(int[][] graph, int x, int y, int maxX, int maxY) {  
    Queue q = new LinkedList(); // x 2 y 2  
    int[] dx = {-1, 1, 0, 0};
    int[] dy = {0, 0, 1, -1};
    q.add(new Integer[] {x, y}); // [2 2]
        while(!q.isEmpty()) {
            Integer[] poll = q.poll(); // [2 2]
            x = poll[0]; // 2
            y = poll[1]; // 2
            for(int i=0; i<4; i++) { // 1 2
                int row=y+dy[i],col=x+dx[i]; // row 2 col 1
                if(row<0 || col<0 || row⪴maxY || col⪴maxX) {
                    continue;
                }
                if(graph[row][col]⩵0) { // 2 1
                    graph[row][col] = 1;
                    q.add(new Integer[] {row, col});
                }
            }
        }
        return 1;
    }
}
\`\`\`
`.trim();
