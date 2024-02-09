const base_url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/459123"

function initalFetch(){
    fetch(base_url)
    .then((res)=> res.json())
    .then((artObj)=>{
        let artDiv = document.querySelector("#mainArt")
       let artImg = document.createElement("img")
       artImg.src = artObj.primaryImage
        artDiv.append(artImg)
        
    })
}

initalFetch()