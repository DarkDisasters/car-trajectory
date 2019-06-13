function transferRange(){

    var Mode = 0
    var Down = 0

    var slider = d3.select("#timerange")
        .on("mousedown", function(){
            Down = 1
        })
        .on("mouseup", function(){
            Down = 0
        })
        .on("mousemove", function(){
            var timeNumber = $("#timerange").val()
            var time_day = Math.floor(timeNumber / 17280)
            var time_hour = Math.floor((timeNumber-time_day*17280) / 720)
            var time_minute = Math.floor((timeNumber-time_day*17280-time_hour*720) / 12)
            var time_second = timeNumber-time_day*17280-time_hour*720-time_minute*12

            console.log("timenow", "2010-04-"+transfer(time_day+6)+ " " + transfer(time_hour) + ":" + transfer(time_minute) + ":" + transfer(time_second))
            if(Mode == 0 && Down == 1){
                if(time_minute)
                $('#time').val("2010-04-"+transfer(time_day+6)+ " " + transfer(time_hour) + ":" + transfer(time_minute) + ":" + transfer(time_second))
            }
        })

    d3.csv('../csvdata/mobile/mobileSensor.csv', function(error,data){
        if(error){
            console.log(error)
        }
        else{
            clearall()
            var areaDotList = []
            var totalValue = 0
            var containerSvgTrack = document.getElementById('trajectory')
        //     console.log("height is ---" + containerSvgTrack.attributes.height.value +
        // "--- width is ---" + containerSvgTrack.attributes.width.value + "---")
            var totalHeight = containerSvgTrack.attributes.height.value
            var totalWidth = containerSvgTrack.attributes.width.value
            var areawidth = totalWidth / 200
            var areaheight = totalHeight / 200
            var i = 50
            var i2 = 70
            var j = 40
            var j2 = 50
            var xstart = j * areawidth
            var ystart = i * areawidth
            if(i2 == 200){
                var yend = totalHeight
                var yheight = totalHeight - ystart
            }
            else{
                var yend = i2*areawidth 
                var yheight = i2*areaheight - ystart
            }

            if(j2 == 200){
                var xend = totalWidth
                var xwidth = totalWidth - xstart
            }
            else{
                var xend = j2*areawidth
                var xwidth = j2*areawidth - xstart
            }
            for (var i = 0; i <data.length; i++){
                var longitude = parseFloat(lon2x(data[i].Long))
                var latitude = parseFloat(lat2y(data[i].Lat))
                var value = parseFloat(data[i].Value)
                var timestamp = data[i].Timestamp
                var datadict = {}
                var lonplat = {}
                
                if (longitude < xend && longitude >= xstart && latitude < yend && latitude >= ystart){
                    totalValue += value
                    lonplat['x'] = longitude
                    lonplat['y'] = latitude
                    datadict['Value'] = value
                    datadict['Timestamp'] = timestamp
                    datadict['lonplat'] = lonplat
                    areaDotList.push(datadict)
                }
            }
            var averageValue = totalValue / areaDotList.length
            // if(i == 199){
            //     var yend = totalHeight
            //     var yheight = totalHeight - 199*areaheight
            // }
            // else{
            //     var yend = (i+1)*areawidth 
            //     var yheight = areaheight
            // }

            // if(j == 199){
            //     var xend = totalWidth
            //     var xwidth = totalWidth - 199*areawidth
            // }
            // else{
            //     var xend = (j+1)*areawidth
            //     var xwidth = areawidth
            // }
            console.log("hei", yheight)
            console.log("wid", xwidth)
            console.log("areaDotList", areaDotList)
            console.log("totalValue", totalValue)
            console.log("averageValue", averageValue)
            var gArea = svg.append("g")
                    .attr("class", "Area(" + String(j) + "," + String(i) + ")")

            var contour = gArea.append("rect")
                    .attr("x", xstart)
                    .attr("y", ystart)
                    .attr("width", xwidth)
                    .attr("height", yheight)
                    .style("stroke", "#F27219")
                    .style("stroke-width",2)
                    .style("fill","none")

            var dotlist = gArea.append("g")
                    .attr("class","AreaDot")
            for (var j = 0; j < areaDotList.length; j++){
                dotlist.append("circle")
                    // .attr("r", radiusscale(areaDotList[j]['Value']))
                    .attr("r",4)
                    .attr("transform", "translate(" + areaDotList[j]['lonplat']['x'] + ',' + areaDotList[j]['lonplat']['y'] + ")")
                    .style("fill", "#F27219")
            }
        }
    })
}