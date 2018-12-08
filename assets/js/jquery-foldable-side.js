var show = false;

$('.foldable-side-btn').on('click',function(){
    if(show){
        $('.foldable-side-container').animate({right: -300}, 300);
        $('body').css('overflow-y', 'visible');
    }else{
        $('.foldable-side-container').animate({right: 0}, 300);
        $('body').css('overflow-y', 'hidden');
    }
    show = !show;
})


$.ajax({
    url: 'https://free-api.heweather.com/s6/weather/forecast?key=5e9a2b5c24174c6b8309be65393583b8&location=杭州',
    dataType: 'json',
    success: function (data) {
        // console.log(data.HeWeather6[0].basic.location);
        // console.log(data.HeWeather6[0].daily_forecast[0].cond_txt_d);
        // console.log(data.HeWeather6[0].daily_forecast[0].cond_code_d);
        // console.log(data.HeWeather6[0].daily_forecast[0].tmp_max);
        // console.log(data.HeWeather6[0].daily_forecast[0].tmp_min);
        $('.city').html(data.HeWeather6[0].basic.location);
        $('.weather-img').attr('src', 'https://cdn.heweather.com/cond_icon/' + data.HeWeather6[0].daily_forecast[0].cond_code_d +'.png')
        $('.weather-txt').html(data.HeWeather6[0].daily_forecast[0].cond_txt_d);
        $('.weather-tmp').html(data.HeWeather6[0].daily_forecast[0].tmp_min + "~" + data.HeWeather6[0].daily_forecast[0].tmp_max + "℃");

    }

})