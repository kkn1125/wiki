import Wiki from "@/entity/wiki";

export const BinarySearch = new Wiki(
  "이진 탐색 (Binary Search)",
  "/binarysearch/"
);
BinarySearch.category = "algorithm";
BinarySearch.addTag("binarysearch");
// BinarySearch.addLink({
//   name: "test1",
//   path: "https://www.naver.com",
//   target: "_blank",
// });
BinarySearch.created_at = new Date("2023-11-9 15:42:48");
BinarySearch.content = () =>
  Wiki.Layout.bind(BinarySearch)`
### Content {.title .title-3}

![Medium - Coding Freak](https://kkn1125.github.io/wikimson/src/images/algorithm/binary-search.png)

그림에 잘 설명 되어 있듯이 필요한 수 찾고자 하는 수와 첫번째 인덱스, 마지막 인덱스이다. 중간 인덱스를 찾아 해당 값이 찾고자 하는 수보다 작으면 해당 인덱스를 포한하지 않는 더 낮은 수를 찾아야하기 때문에 middle - 1의 인덱스에서 first 사이의 중간지점을 다시 조회한다. 이런 식으로 반복되면 절반에 절반을 쪼개어 탐색하게 된다.</p>
<p>코드로 보면 아래와 같다.

\`\`\`java
public int searchBinary(int[] arr, int find) {
  int mid, start, end;
  start = 0;
  end = arr.length - 1;
  while(start ⪳ end) {
      mid = (start + end) / 2 ;
      
      if(arr[mid] ⩵ find) {
          return mid;
      }
      
      if(find < arr[mid]) {
          end = mid - 1;
      } else {
          start = mid + 1;
      }
  }
  return -1;
}
\`\`\`
`.trim();
