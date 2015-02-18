/**
 * Created by lisabatbouta on 11/22/14.
 * This project uses AJAX, JQuery, post and get commmands, and uses highcharts to display data.
 * The project as a whole also reads text files from the server and renders them as jade templates to be displayed in
 * the dashboard. This projects theme is traffic information and user updated speed reports on any given day in the morning
 * and evening. All data reported by the database is automatically displayed by the web page and inserted into the database.
 */

/* This function retrieves data using AJAX in this div to call server and retrieve data from database through server
 This is the div one chart to initialize chart */

function graphone (){
    $(function () {
        $.ajax({
            url: 'traffic'
        }).done(function (data) {
            var example = jQuery.parseJSON(data);
            arrayOfYear = [];
            arrayOfaccidents = [];
            arrayOfdeaths = [];
            for (var i = example.length - 1; i >= 0; i--) {
                arrayOfYear.push(example[i]["year"]);
                arrayOfaccidents.push(parseInt(example[i]["numCrashes"]));
                arrayOfdeaths.push(parseInt(example[i]["numDeaths"]));
            }
            getData();

            $('#container').highcharts({
                title: {
                    text: 'Car Accidents in Massachusetts',
                    x: -20 //center
                },
                xAxis: {
                    categories: arrayOfYear
                },
                yAxis: {
                    title: {
                        text: 'People'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Number of Accidents',
                    data: arrayOfaccidents
                }, {
                    name: 'Number of Deaths',
                    data: arrayOfdeaths
                }]
            });
        });
    }); // end of div one chart
}

/* This function retrieves data using AJAX in this div to call server and retrieve data from database through server
 This is the div two graph to initialize graph */

function getData (){
    $.ajax({url:'teentraffic'}).done( function (data) {
        var example = jQuery.parseJSON(data);
        arrayteenAccidents = [];
        for (var i = example.length - 1; i >= 0; i--) {
            arrayteenAccidents.push( ['Age ' + example[i]["age"], parseInt(example[i]["percentInvolvedCrash"])]);
        }

        getSpeed();
        $(function () {


            // Make monochrome colors and set them as default for all pies
            Highcharts.getOptions().plotOptions.pie.colors = (function () {
                var colors = [],
                    base = Highcharts.getOptions().colors[0],
                    i;

                for (i = 0; i < 10; i += 1) {
                    // Start out with a darkened base color (negative brighten), and end
                    // up with a much brighter color
                    colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
                }
                return colors;
            }());

            // Build the chart
            $('#content').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Teen Car Accidents'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Teen Accidents 2004',
                    data: arrayteenAccidents

                }]
            });
        });
    });
}

/* end of div 2 chart*/




/* This function retrieves data using AJAX in this div to call server and retrieve data from database through server
 This is the div three chart to initialize chart. This chart displays data for speeds on local highways. */
function getSpeed () {
    $.ajax({url:'speed'}).done( function (data) {
        var example = jQuery.parseJSON(data);
        arrayhighway = [];
        arrayAM = [];
        arrayPM = [];
        for (var i = example.length - 1; i >= 0; i--) {
            arrayhighway.push(example[i]["name"]);
            arrayAM.push(parseInt(example[i]["AVG(AM_speed)"]));
            arrayPM.push(parseInt(example[i]["AVG(PM_speed)"]));
        }
getsidebar();
        $(function () {
            $('#trafficCommute').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Speeds on Local Highways'
                },
                xAxis: {
                    categories: arrayhighway,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Speed(MPH)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' MPH'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'AM Speed',
                    data: arrayAM
                }, {
                    name: 'PM Speed',
                    data: arrayPM
                }]
            });
        });
    });
}

//check to see that there is data entered before click for at least data in the highway name
function validateForm() {
    var x = $('#name').val();
    if (!x) {
        alert("First name must be filled out");
    }
    return !!x;
}


function speedChanges(){
    $.ajax({url:'speed'}).done( function (data) {
        var example = jQuery.parseJSON(data);
        arrayhighway = [];
        arrayAM = [];
        arrayPM = [];
        for (var i = example.length - 1; i >= 0; i--) {
            arrayhighway.push(example[i]["name"]);
            arrayAM.push(parseInt(example[i]["AVG(AM_speed)"]));
            arrayPM.push(parseInt(example[i]["AVG(PM_speed)"]));
        }
        $(function () {
            $('#trafficCommute').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Speeds on Local Highways'
                },
                xAxis: {
                    categories: arrayhighway,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Speed(MPH)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' MPH'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'AM Speed',
                    data: arrayAM
                }, {
                    name: 'PM Speed',
                    data: arrayPM
                }]
            });
        });
    });
}

function getsidebar(){
    // render data from template for sidebar.txt in paragraph
    $.ajax({url:'text/sidebar.txt'}).done( function (data) {
        var textareal = $('#sidebarp')[0];
        textareal.innerText = data;
        leftdiv();
    });
}

/* When the document is rendered and ready set the button click functionality, such as
    the submit button in the sidebar div that will post data to the database, pie chart buttons
    and accident choose state buttons.
 */
$(document).ready(function() {
    // submit button for sidebar post data to database through server
    // pie chart click for teen accident data to appear in pie chart where pie chart is in a fragment and will be the only part rendered
    $('#piechart').click(function () {
        $.ajax({url:'accidentAllAge'}).done( function (data) {
            var example = jQuery.parseJSON(data);
            arrayteenAccidents = [];
            for (var i = example.length - 1; i >= 0; i--) {
                arrayteenAccidents.push(['Age Group ' + example[i]["yearRange"], parseInt(example[i]["percentPeople"])]);
            }

            $(function () {


                // Make monochrome colors and set them as default for all pies
                Highcharts.getOptions().plotOptions.pie.colors = (function () {
                    var colors = [],
                        base = Highcharts.getOptions().colors[0],
                        i;

                    for (i = 0; i < 10; i += 1) {
                        // Start out with a darkened base color (negative brighten), and end
                        // up with a much brighter color
                        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
                    }
                    return colors;
                }());

                // Build the chart
                $('#content').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: 'All Ages Car Accidents'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'All Ages Accidents 2004',
                        data: arrayteenAccidents

                    }]
                });
            });
        });
    });

    // pie chart click for all age accident data to appear in pie chart where pie chart is in a fragment and will be the only part rendered
    $('#piechart2').click(function () {
        $.ajax({url:'teentraffic'}).done( function (data) {
            var example = jQuery.parseJSON(data);
            arrayteenAccidents = [];
            for (var i = example.length - 1; i >= 0; i--) {
                arrayteenAccidents.push(['Age ' + example[i]["age"], parseInt(example[i]["percentInvolvedCrash"])]);
            }

            $(function () {

                // Make monochrome colors and set them as default for all pies
                Highcharts.getOptions().plotOptions.pie.colors = (function () {
                    var colors = [],
                        base = Highcharts.getOptions().colors[0],
                        i;

                    for (i = 0; i < 10; i += 1) {
                        // Start out with a darkened base color (negative brighten), and end
                        // up with a much brighter color
                        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
                    }
                    return colors;
                }());

                // Build the chart
                $('#content').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: 'Teen Car Accidents'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Teen Accidents 2004',
                        data: arrayteenAccidents

                    }]
                });
            });
        });
    });
//chart click for Massachusetts accident data to appear in  chart where chart is in a fragment and will be the only part rendered
$('#Massachusetts').click(function(){
    $(function () {
        $.ajax({url:'traffic'}).done( function (data) {
            var example = jQuery.parseJSON(data);
            arrayOfYear = [];
            arrayOfaccidents = [];
            arrayOfdeaths = [];
            for (var i = example.length - 1; i >= 0; i--) {
                arrayOfYear.push(example[i]["year"]);
                arrayOfaccidents.push(parseInt(example[i]["numCrashes"]));
                arrayOfdeaths.push(parseInt(example[i]["numDeaths"]));
            }
            $('#container').highcharts({
                title: {
                    text: 'Car Accidents in Massachusetts',
                    x: -20 //center
                },
                xAxis: {
                    categories: arrayOfYear
                },
                yAxis: {
                    title: {
                        text: 'People'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Number of Accidents',
                    data: arrayOfaccidents
                }, {
                    name: 'Number of Deaths',
                    data: arrayOfdeaths
                }]
            });
        });
    }); // end of div one chart
});
    //chart click for Louisiana accident data to appear in  chart where chart is in a fragment and will be the only part rendered
    $('#Louisiana').click(function(){
        $(function () {
            $.ajax({url:'Louisiana'}).done( function (data) {
                var example = jQuery.parseJSON(data);
                arrayOfYear = [];
                arrayOfaccidents = [];
                arrayOfdeaths = [];
                for (var i = example.length - 1; i >= 0; i--) {
                    arrayOfYear.push(example[i]["year"]);
                    arrayOfaccidents.push(parseInt(example[i]["numCrashes"]));
                    arrayOfdeaths.push(parseInt(example[i]["numDeathes"]));
                }

                $('#container').highcharts({
                    title: {
                        text: 'Car Accidents in Louisiana',
                        x: -20 //center
                    },
                    xAxis: {
                        categories: arrayOfYear
                    },
                    yAxis: {
                        title: {
                            text: 'People'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: '°C'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        name: 'Number of Accidents',
                        data: arrayOfaccidents
                    }, {
                        name: 'Number of Deaths',
                        data: arrayOfdeaths
                    }]
                });
            });
        });
    });


});

function clickSubmit(){
    var valueCheck = validateForm();
    var xname = $('#name').val();
    var xam = $('#morning').val();
    var xpm = $('#evening').val();
    if (valueCheck) {
        $.post('/addUserData', {name: xname, AM_speed: xam, PM_speed: xpm}, function () {
            $.ajax({url:'speed'}).done( function (data) {
                var example = jQuery.parseJSON(data);
                arrayhighway = [];
                arrayAM = [];
                arrayPM = [];
                for (var i = example.length - 1; i >= 0; i--) {
                    arrayhighway.push(example[i]["name"]);
                    arrayAM.push(parseInt(example[i]["AVG(AM_speed)"]));
                    arrayPM.push(parseInt(example[i]["AVG(PM_speed)"]));
                }
                $(function () {
                    $('#trafficCommute').highcharts({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Speeds on Local Highways'
                        },
                        xAxis: {
                            categories: arrayhighway,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Speed(MPH)',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' MPH'
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: -40,
                            y: 100,
                            floating: true,
                            borderWidth: 1,
                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                            shadow: true
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'AM Speed',
                            data: arrayAM
                        }, {
                            name: 'PM Speed',
                            data: arrayPM
                        }]
                    });
                });
            });
        });
        $('#name').val("");
        $('#morning').val("");
        $('#evening').val("");
    }
}
// render data from template for leftdiv.txt in paragraph
function leftdiv(){
    $.ajax({url:'text/leftdiv.txt'}).done(function (data) {
        var textareal = $('#paragraph2')[0];
        textareal.innerText = data;
        bottomdiv();
    });
}
// render data from template for bottomdiv.txt in paragraph
function bottomdiv(){
    $.ajax({url:'text/bottomdiv.txt'}).done( function (data) {
        var textareal = $('#paragraph3')[0];
        textareal.innerText = data;

    });
}
window.addEventListener("load", graphone, false);







