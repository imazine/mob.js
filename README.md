#mob.js

> mob.js is post-image loader for reducing mobile traffic on the responsive web.

> (mob.js 는 반응형웹의 모바일 트래픽을 줄이기 위한 post-image loader 입니다)



###How to use

> 1. Include js file to your HTML (js파일을 HTML에 넣어줍니다)

>  ```HTML 
<script type="text/javascript" src="https:/"></script> 
```

> 2. Mark up img Tag with data-src (img 태그 작성시 data-src 를 사용합니다)

>  ```HTML 
<img data-src="ice_cream.png" alt="It's ice cream"/> 
```

> 3. Insert cofigure script at the bottom of HTML and pull the trigger
> (HTML 하단에 환경설정 스크립트를 넣어주고 트리거를 실행 합니다) 
> ```HTML
    <script type="text/javascript">
        // mob.config is not a precondition (환경설정이 없으면 기본설정으로 동작합니다)
		    mob.config = {			
            /*requestType : expression
			        %f = File Name
			        %w = width catched CSS
			        %e = extension
			        default value is FineName + x + width + .Extension */
          requestType : "%fx%w.%e",
            /*autoReload : Boolean
			        Reload bigger image when Media Query define larger than current width 
			       default value is true*/ 
			    autoReload : true
		}  
		mob.init();
	</script> 
  ```
          
