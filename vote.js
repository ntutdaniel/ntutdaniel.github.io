//獎品項目
var prize_list = [
  {
    "name":"蠟筆小新睡衣",
    "img":"https://image.flaticon.com/icons/png/512/2934/2934972.png"
  },
	{
    "name":"謝謝惠顧",
    "img":"https://image.flaticon.com/icons/svg/742/742751.svg"
  },
  {
    "name":"謝謝惠顧",
    "img":"https://image.flaticon.com/icons/svg/742/742751.svg"
  },
  {
    "name":"iphone12 Pro Max",
    "img":"https://image.flaticon.com/icons/svg/214/214314.svg"
  },
  {
    "name":"謝謝惠顧",
    "img":"https://image.flaticon.com/icons/svg/742/742751.svg"
  },
  {
    "name":"謝謝惠顧",
    "img":"https://image.flaticon.com/icons/svg/742/742751.svg"
  },
  {
    "name":"蠟筆小新拼圖",
    "img":"https://image.flaticon.com/icons/png/512/993/993723.png"
  },
  {
    "name":"神秘組合",
    "img":"https://image.flaticon.com/icons/png/512/837/837891.png"
  },
];
$(function(){
  for(var i=0; i<=prize_list.length-1; i++){
    $(".lottery ul li").eq(i).append("<img src='"+prize_list[i].img+"'><p>"+prize_list[i].name+"</p>")
  }  
});

// 假設iEnd是請求獲得的獎品結果
var iEnd = -1;
var count = 0; 
$(".lottery_btn button").on("click", function(){

    var $this = $(this);

    // 這個setTimeout是假設的請求

    iEnd = Math.floor(Math.random() * 8);
    if(count == 0){
      iEnd = 1;
      count ++;
    }
    else if(count == 1){
      iEnd = 5;
      count ++;
    }
    else if(count == 2){
      iEnd = 7;
      count = 0;
    }

    //console.log(iEnd);

    // 禁用
    $this.attr("disabled", "disabled");
  
    $(".lottery li").removeClass("shiny");

    draw($(".lottery"), function(){
        // 恢復按鈕
        $this.removeAttr("disabled");
        setTimeout(function(){
          var prize = $(".lottery").find("li").eq(iEnd).find("p").html();
            // console.log(prize);
            if(iEnd != 7){
              alert("恭喜獲得："+ prize + "!!");
            }
            else{
              alert("恭喜獲得："+ "蠟筆小新睡衣與蠟筆小新拼圖" + "!!");
            }

            $(".lottery li").removeClass("active");
            $(".lottery li").addClass("shiny");
        }, 500);
    });

});

// 開始轉動
function draw(oMain, fn){
    var timer = null,
        iNow = oMain.find(".active").index(),
        len = oMain.find("li").length,
        iSpeed = 300,
        count = 0, // 轉了多少次
        iLast = len; // 最後一次轉圈圈
        (function run(){

            // 前3個加速
            if(count > 2){ iSpeed = 100; }

            // 後3個减速
            if(iLast < 2){ iSpeed = 300; }

            iNow++;
            count++;

            if(iNow >= len){
              iNow = 0;
            }
            oMain.find("li").removeClass("active").eq(iNow).addClass("active");

            timer = setTimeout(run, iSpeed);

            // 得到结果
            if(iEnd !== -1 && iNow == iEnd){
                // console.log(iLast);
                // 為了最後一圈减速，再跑一圈
                iLast--;
                if(iLast == 0){
                    clearTimeout(timer);
                    fn();
                }
            }
        })();
}