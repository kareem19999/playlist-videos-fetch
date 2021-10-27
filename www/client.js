let allResults=[];
const getPlayListData = async (parameter)=>{
    const URL= `https://youtube.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDuWRjrv8JBSMFb8-FeroLmbdjGXu67p2c&part=snippet&part=contentDetails&maxResults=50&playlistId=${parameter}`;
    //console.log(URL);
    const res = await fetch(URL)
    try {
        const data= await res.json();
        //console.log(data)
        return data;
        }  catch(error) { //Puts error in variable
        console.log("error", error); //Outputs error
        }
}   
const getMoreVideos =async (parameter,data) => {

    //let allData[];
    //while(true)
    //{

        if(data.nextPageToken == undefined)
        {
            return allResults; //Means no more videos
            //break;
        }else 
        {
            console.log("we have more videos");
            const URL= `https://youtube.googleapis.com/youtube/v3/playlistItems?pageToken=${data.nextPageToken}&key=AIzaSyDuWRjrv8JBSMFb8-FeroLmbdjGXu67p2c&part=snippet&part=contentDetails&maxResults=50&playlistId=${parameter}`;
            //console.log(URL);
            const res = await fetch(URL)
            try {
                const newdata= await res.json();
                console.log(newdata);
                allResults.push(...newdata.items)
                return getMoreVideos(parameter,newdata);
                }  catch(error) { //Puts error in variable
                console.log("error", error); //Outputs error
                }
            console.log("There are more videos");
        }
    //}
}

let videoResults=[];
const start = () => {
    const form=document.getElementById("playListForm");
    const val=form.value;
    console.log(val);
    allResults=[];
    results=getPlayListData(val).then((data)=> {
        //getMoreVideos(URL,)     
        allResults.push(...data.items);
        getMoreVideos(val,data).then(() => {
            document.getElementById("text").innerText=``;
            console.log(allResults)
            for(result of allResults)
            {
                document.getElementById("text").innerText+=`https://www.youtube.com/watch?v=${result.contentDetails.videoId} \n`;
            }
        });
    });
    //console.log(allResults);
}
document.getElementById("submitPlayList").addEventListener("click",start);