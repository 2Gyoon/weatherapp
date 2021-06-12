$(document).ready(function(){
    //var city = "Seoul";  //선택한 버튼의 날씨를 알려주기 위한 도시명을 넣을 초기변수
    var city = [];
    //city.push("Seoul");
    //console.log(city);
    /*
    선택한 도시명을 데이터에 넣어준다.
    배열변수명.push("b") : ["a"] -> ["a", "b"];  ~~> 마지막 인덱스에 새로운 데이터인 "b"를 넣겠다는 의미
    shift() : 첫번째 인덱스 데이터를 제거한다.
    unshift("새로운 데이터") : 첫번째 인덱스 자리에 새로운 데이터를 추가한다. -> 전체적인 인덱스번호가 하나씩 밀린다.
    */
    var myKey = "7f547c908b87bda12d29e675af3f92ff";  //사이트로부터 받아온 API key를 저장

    var state_icon = "";  //날씨 아이콘의 이름을 초기변수로 구성한다.

    var ch_img; //시간대에 의한 이미지 파일을 변경
    var $date = new Date();
    console.log($date);
    var $hour = $date.getHours();
    if($hour >=6 && $hour<18){   //낮구간
        ch_img = "day.jpg";
    }else{                      //밤구간
        ch_img = "night.jpeg";
    }


    var w_box = `
    <li>
        <div class="top">
            <div class="cur_icon"><i class="wi"></i></div>
            <div class="info">
                <p class="temp"><span>20</span>&nbsp;℃</p>
                <h4>Sunny</h4>
                <p><span class="city">Seoul</span></p>
                <p><span class="nation">KR</span></p>
            </div>
        </div>
        <div class="bottom">
            <div class="wind">
                <i class="wi wi-strong-wind"></i>
                <p><span>1.2</span>&nbsp;m/s</p>
            </div>
            <div class="humidity">
                <i class="wi wi-humidity"></i>
                <p><span>50</span>&nbsp;%</p>
            </div>
            <div class="cloud">
                <i class="wi wi-cloud"></i>
                <p><span>20</span>&nbsp;%</p>
            </div>
        </div>
    </li>
    `;

    /*
    ["서울"]                ==> <li>구조를 한번 돌린 상태 <ul>아래 <li>태그는 한개
    ["서울", "부산"]        ==> <li>구조를 두번 돌린 상태 <ul>아래 <li>태그는 세개
    */

    function w_info(){

        $("#weather ul").empty();  //기존에 쌓여있던 모든 <li>를 제거


        //배열 데이터의 수를 기준으로 다시 반복하여 넣는다 (갱신)
        for(i=0; i<city.length; i++){
            $("#weather ul").append(w_box);
        }

        $("#weather ul li").each(function(index){   //0, 1, 2, ...

            $.ajax({
                url : "https://api.openweathermap.org/data/2.5/weather?q="+city[index]+"&appid=" + myKey,
                dataType : "json",
                success : function(data){
                    console.log(data);
                    console.log("현재 온도(℃) : " + Math.round(data.main.temp - 273.15));
                    var temp = Math.round(data.main.temp - 273.15);
                    console.log("현재 습도(%) : " + data.main.humidity);
                    var humidity = data.main.humidity;
                    console.log("현재 날씨 : " + data.weather[0].main);
                    var weather = data.weather[0].main;
                    console.log("현재 풍속(m/s) : " + data.wind.speed);
                    var wind = data.wind.speed;
                    console.log("국가명 : " + data.sys.country);
                    var nation = data.sys.country;
                    console.log("도시명 : " + data.name);
                    var region = data.name;
                    console.log("구름 양(%) : " +  data.clouds.all);
                    var cloud = data.clouds.all;
        
                    //텍스트(weahter의 데이터 : clear, rain, snow)로 받아온 현재 날씨를 이미지 아이콘으로 변경(클래스명을 추가)
                    if(weather == "Clear"){
                        state_icon = "wi-day-sunny";
                    }else if(weather == "Clouds"){
                        state_icon = "wi-cloud"
                    }else if(weather == "Rain"){
                        state_icon = "wi-rain";
                    }else if(weather == "Snow"){
                        state_icon == "wi-snow";
                    }else if(weather == "Fog"){
                        state_icon = "wi-fog";
                    }else if(weather == "Haze"){
                        state_icon = "wi-day-haze";
                    }else if(weather == "Mist"){
                        state_icon = "wi-dust";
                    }else if(weather == "Sand"){
                        state_icon = "wi-sandstorm";
                    }else if(weather == "Thunderstorm"){
                        state_icon = "wi-thunderstorm";
                    }else if(weather == "Drizzle"){
                        state_icon = "wi-day-rain-mix";
                    }else if(weather == "Smoke"){
                        state_icon = "wi-smoke";
                    }else if(weather == "Tornado"){
                        state_icon = "wi-tornado";
                    }

                    //Haze, Mist, Must, Sand, Thunderstorm, Drizzle, Smoke, Ash, Squall, Tornado

                    console.log(this);

                    $("#weather li").find(".top").css("background-image", "url(./img/"+ch_img+")");

                    $("#weather li").eq(index).find(".cur_icon i").attr("class", "wi");  //클래스에 대한 초기화
        
                    $("#weather li").eq(index).find(".cur_icon i").addClass(state_icon);  //각 지역으로부터 받은 정보를 추가시킨다

                    $("#weather li").eq(index).find(".temp span").text(temp);
                    $("#weather li").eq(index).find(".info h4").text(weather);
                    $("#weather li").eq(index).find(".city").text(region);
                    $("#weather li").eq(index).find(".nation").text(nation);
                    $("#weather li").eq(index).find(".wind span").text(wind);
                    $("#weather li").eq(index).find(".humidity span").text(humidity);
                    $("#weather li").eq(index).find(".cloud span").text(cloud);
                }
            });
        });
    };

    w_info();  //문서가 준비가 완료되면 함수를 호출해라

    $.getJSON("https://extreme-ip-lookup.com/json", function(data){
        console.log(data);
        city.unshift(data.city);
        w_info();
    });
    //GEO Location : 현재위치 설정


    $(".cities button").click(function(){
        //city = $(this).text();  //기존 번역 변수인 var city에 새로운 값을 대입하겠다는 의미
        var $city_txt = $(this).text();  //클릭한 곳의 텍스트 요소만을 저장
        //city.push($city_txt);   //기존의 배열 데이터에 새로운 데이터를 마지막 자리에 추가한다
        city.unshift($city_txt);    //기존의 배열 데이터에 새로운 데이터(도시명)를 첫번째 자리(0번 인덱스)에 추가한다
        console.log(city);

        $(this).prop("disabled", true);


        w_info();   //버튼을 클릭하면 함수문으로 접근시켜라
    });

    function search(){
        var $search_val = $("#search_box").val();    //입력상자에 입력한 문자형 데이터를 받아오겠다는 의미
        if($search_val.length < 1){
            alert("검색어를 입력하세요");
        }else{
            city.unshift($search_val);
            console.log(city);
            w_info();
        }
        $("#search_box").val("")
    };

    $(".search button").click(function(){
        search();
    });

    $(".search").keypress(function(event){
        console.log(event);
        if(event.keyCode == 13){
            search();
        }
    });

    //"타이틀" 클릭시 모든 정보 사라지게 만듦
    $(".title").click(function(){
        location.reload();
    });


});
//https://api.openweathermap.org/data/2.5/weather?q=London&appid=7f547c908b87bda12d29e675af3f92ff
//API key : 7f547c908b87bda12d29e675af3f92ff
//api.openweathermap.org/data/2.5/weather?q=London&appid=7f547c908b87bda12d29e675af3f92ff
/*
{
    "coord": {
        "lon": -0.1257,
        "lat": 51.5085
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 276.17,
        "feels_like": 273.64,
        "temp_min": 275.37,
        "temp_max": 277.04,
        "pressure": 1026,
        "humidity": 81
    },
    "visibility": 10000,
    "wind": {
        "speed": 2.57,
        "deg": 0
    },
    "clouds": {
        "all": 75
    },
    "dt": 1619062029,
    "sys": {
        "type": 1,
        "id": 1414,
        "country": "GB",
        "sunrise": 1619066978,
        "sunset": 1619118478
    },
    "timezone": 3600,
    "id": 2643743,
    "name": "London",
    "cod": 200
}
*/