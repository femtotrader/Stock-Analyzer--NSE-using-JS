var stock = stock || {};

//Adding Name Space
stock.moduleforJS = (function($,doc, win, undefined){

var init = function(){
$('section').hide();
		$('input[type=search]').on('keyup',function(e){
			if(e.which == 13 || e.keyCode == 13){
				e.preventDefault();
				var stockName = $('input[type=search]').val();
				$('section').fadeTo('fast',0);
		  		$('section').fadeTo('slow', 1);

		  	$.post('/stocknow/',{
		  			data:{
		  				stockname:stockName
		  			}
		  	},function(response) {
		  			//newData = JSON.stringify(data)
		  			console.log(response);
		  			if(response == "Error"){
		  				$('.right-inner-addon, section').fadeTo('fast', 0.1);
		  				$('.lb-outerContainer').css('display','block');
		  				$('.right-inner-addon, section').css('pointer-events','none');

		  				$('.lb-closeNow,section').click(function(){
		  					$('.right-inner-addon, section').fadeTo('fast', 1);
		  					$('.lb-outerContainer').hide();
		  					$('.right-inner-addon, section').css('pointer-events','auto');
		  				});
		  			}

		  			if(response.length<1){
		  				$('section').html("Invalid Symbol");
		  			}
		  			// var incoming = JSON.stringify(response);
		  			// incoming.replace('data','details');

		  			// var finalDetails = JSON.parse(incoming);
		  			// console.log(finalDetails);

		  			$('.symbol').html(response.data[0].symbol);
		  			$('.companyName').html(response.data[0].companyName);
		  			$('.previousClose').html("INR "+response.data[0].previousClose);
		  			$('.openingPrice').html("INR "+response.data[0].open);
		  			$('.lastPrice').html("INR "+response.data[0].lastPrice);
		  			$('.highestPrice').html("INR "+response.data[0].dayHigh);
		  			$('.averagePrice').html("INR "+response.data[0].averagePrice);
		  			$('.buyPrice1').html("INR "+response.data[0].buyPrice1);
		  			$('.closePrice').html("INR "+response.data[0].closePrice);
		  			$('.isinCode').html(response.data[0].isinCode);
		  			$('.updatedTimeStamp').html(response.lastUpdateTime);
					//var details = JSON.(data);
					// console.log(details);
					console.log((new Date()).getTime());
					  $('.canvasCharts').highcharts({
                            chart: {
                                type: 'spline',
                                animation: Highcharts.svg, // don't animate in old IE
                                marginRight: 10,
                                events: {
                                    load: function() {

                                        // set up the updating of the chart each second
                                        var series = this.series[0];
                                        var xmlhttprequest1 = new XMLHttpRequest(); //location='+query

                                        setInterval(function() {
                                            // xmlhttprequest1.open('GET', '/getStock?symbol=' + document.getElementById("comp").value, false);

                                            // xmlhttprequest1.send();
                                            // responseJSON1 = JSON.parse(xmlhttprequest1.responseText);
                                            // console.log(responseJSON1);
                                            var x = (new Date()).getTime(), // current time
                                                y = parseFloat(response.data[0].lastPrice);
                                            series.addPoint([x, y], true, true);
                                        }, 1000);
                                    } //Load Function End
                                } //Events Function End
                            },
                            title: {
                                text: 'Live Price on NSE'
                            } ,
                            xAxis: {
                                type: 'datetime',
                                tickPixelInterval: 100
                            } ,
                            yAxis: {
                                title: {
                                    text: 'Value'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                formatter: function() {
                                    return '<b>' + this.series.name + '</b><br/>' +
                                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                        Highcharts.numberFormat(this.y, 2);
                                }
                            },
                            legend: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },
                            series: [{
                                name: 'NSE Price',
                                data: (function() {
                                    // generate an array of random data
                                    var data = [],
                                        time = (new Date()).getTime(),
                                        i;
                                    // var xmlhttprequest1 = new XMLHttpRequest(); //location='+query
                                    // xmlhttprequest1.open('GET', '/getStock?symbol=' + document.getElementById("comp").value, false);

                                    // xmlhttprequest1.send();
                                    // responseJSON1 = JSON.parse(xmlhttprequest1.responseText);
                                    for (i = -19; i <= 0; i += 1) {
                                        data.push({
                                            x: time + i*1000,
                                            y: parseFloat(response.data[0].lastPrice)
                                        });
                                    }
                                    return data;
                                }())
                            }]
                        });

			  }); //Response End
			
		  }
		});


}();



var solution = {
		init : init
	};

	return solution;

})(jQuery,document,window);