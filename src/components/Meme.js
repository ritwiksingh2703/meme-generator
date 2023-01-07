import React,{useState,useEffect}from "react"

export default function Meme(){
    const [memeImage,setmemeImage]=useState({
        topText:"",
        bottomText:"",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });
    const [allMeme,setallMeme]=useState([]);
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setallMeme(data.data.memes))
    },[])

    function getmeme(){
       
        const randomNumber=Math.floor(Math.random() * allMeme.length)
        
        const url = allMeme[randomNumber].url
        setmemeImage(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }

    function handleChange(event) {
        const {name, value} = event.target
        setmemeImage(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <>
        <div className="meme">
           <div className="text-field">
                <input type="text" 
                id="text-field-1" 
                placeholder="Top text"
                name="topText"
                value={memeImage.topText}
                onChange={handleChange}
                />
                <input type="text" 
                id="text-field-2" 
                placeholder="Bottom text"
                name="bottomText"
                value={memeImage.bottomText}
                onChange={handleChange}
                />
                <button className="meme-generate" onClick={getmeme}>Get a new meme image</button>
            </div>
        </div>
        <div className="meme-contents">
           <img src={memeImage.randomImage}  className="meme-image"/>
           <h2 className="meme--text top">{memeImage.topText}</h2>
           <h2 className="meme--text bottom">{memeImage.bottomText}</h2>
        </div>
        
        </>
    )
}