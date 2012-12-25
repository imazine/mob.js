<br/>
# mob.js

> mob.js is post-image loader for reducing mobile traffic on the responsive web.

> (mob.js 는 반응형웹의 모바일 트래픽을 줄이기 위한 post-image loader 입니다)


<br/>
<br/>
<br/>


## How to use

> 1. Include js file to your HTML (js파일을 HTML에 넣어줍니다)

>  ```HTML 
<script type="text/javascript" src="https://raw.github.com/imazine/mob.js/master/mob.min.js"></script> 
```

> 2. Mark up img Tag with __data-src__ (img 태그 작성시 __data-src__ 를 사용합니다)

>  ```HTML 
<img data-src="ice_cream.png" alt="It's ice cream"/> 
```

> 3. Insert cofigure script at the bottom of HTML and pull the trigger
> (HTML 하단에 환경설정 스크립트를 넣어주고 트리거를 실행 합니다) 
> ```HTML
    <script type="text/javascript">
    // mob.config is not a precondition (환경설정이 없으면 기본설정으로 동작합니다)
		mob.config = {
			requestType : "%fx%w.%e",
				/*requestType : expression
				for example FileName.png defined width: 700px;(예시)
				default> "%fx%w.%e" --> FileNamex700.png
				ex> "http://url/imgServer?fn=%f.%e&width=%wpx" --> http://url/imgServer?fn=FileName.png&width=700px
				%f = File Name (파일 이름으로 치환)
				%w = width value catched CSS (CSS 에 정의된 넓이로 치환)
				%e = extension (파일 확장자로 치환) */
			autoReload : true
				/*autoReload : Boolean
				Reload image when Media Query defines larger than current image width 
				(미디어 쿼리가 현재보다 큰 이미지폭을 설정하면 자동으로 이미지를 로드) */
		}  
		mob.init(); //pull the trigger. (트리거를 실행합니다)
	</script> 
  ```
          
