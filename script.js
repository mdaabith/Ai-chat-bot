let prompt=document.querySelector("#prompt")
let chatContainer=document.querySelector(".chat-container")

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="GOOGLE_API_KEY"
let user={
    data:null,

}

async function generateResponse(aiChatBox) {
let text=aiChatBox.querySelector(".ai-chat-area")

    let RequestOption={
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            "contents":[
                {"parts":[{"text":user.data}

                ]
            }]
        
        })
    }
    try{
        let response= await fetch(Api_Url,RequestOption)
        let data=await response.json()
        let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        console.log(apiResponse)
        text.innerHTML=apiResponse
        
    }
    catch(error){
        console.log(error);
    }
}

function createChatBox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div

}


function handlechatResponse(message){
    user.data=message
    let html=`<img src="user.jpg" alt=""id="userImage" width="50">
<div class="user-chat-area">
${user.data}    
</div>`
prompt.value=""
let userChatBox=createChatBox(html,"user-chat-box")
chatContainer.appendChild(userChatBox)

setTimeout(()=>{
let html=`<img src="ai.jpg" alt="" id="aiImage" width="70">
    <div class="ai-chat-area">
    <img src="laoding1.webpg.gif" alt="" class="load" width="50px">
    </div>`

    let aiChatBox=createChatBox(html,"ai-chat-box")
    chatContainer.appendChild(aiChatBox)
    generateResponse(aiChatBox)
},600)
}

prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        handlechatResponse(prompt.value)
    }

})
