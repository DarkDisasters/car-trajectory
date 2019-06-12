function transferRange(){
    d3.csv('../csvdata/mobile/mobileSensor.csv', function(error,data){
        if(error){
            console.log(error)
        }
        else{
            var containerSvgTrack = document.getElementById('trajectory')
        //     console.log("height is ---" + containerSvgTrack.attributes.height.value +
        // "--- width is ---" + containerSvgTrack.attributes.width.value + "---")
        }
    })
}