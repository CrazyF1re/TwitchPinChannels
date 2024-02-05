let count = 0
const DELAY = 500

function createPin(){
    let btn = document.createElement('button')
    btn.className = 'pin-'+count
    count+=1
    btn.setAttribute("condition", "false")
    btn.innerHTML = '<img src="https://i.imgur.com/suOLe1J.png" style="width: 18px; height: 18px;">'
    return btn
}

function setPinnedChannels(){
    // get pinned channels from storage and place it into top of list of channels
}

function addToStorage(element){
    const offline = document.createElement('div')
    offline.className = 'Layout-sc-1xcs6mc-0 fCKtYt side-nav-card__live-status'
    offline.setAttribute('data-a-target',"side-nav-live-status")
    offline.innerHTML = '<span class="CoreText-sc-1txzju1-0 gWcDEo">Не в сети</span>'

    //if channel is online, then delete category of stream and replace online counter with offline status 
    if(element.querySelector('div[class="ScChannelStatusIndicator-sc-bjn067-0 kqWDUJ tw-channel-status-indicator"]')){
        element = element.cloneNode(true)
        element.querySelector('div[class="Layout-sc-1xcs6mc-0 bYeGkU side-nav-card__metadata"]').remove()
        element.querySelector('span[class="CoreText-sc-1txzju1-0 gWcDEo"]').remove()
        element.querySelector('div[class="Layout-sc-1xcs6mc-0 xxjeD"]').remove()
        element.querySelector('div[class="Layout-sc-1xcs6mc-0 fCKtYt side-nav-card__live-status"]').prepend(offline)
    }
    // save element into stotage
    // ??
}

function btnPressed(btn)
{
    if(btn.getAttribute('condition') == "false"){
        addToStorage(btn.parentElement.parentElement)
        btn.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png" // change pin image
        btn.setAttribute('condition','true')// add condition to pin button
        parent = btn.parentElement.parentElement.parentElement.cloneNode(true)
        btn.parentElement.parentElement.parentElement.remove()
        console.log(parent)
        document.querySelector('div[class="InjectLayout-sc-1i43xsx-0 hWukFy tw-transition-group"]').prepend(parent)
    }
    else{
        btn.querySelector('img').src = "https://i.imgur.com/suOLe1J.png"
        btn.setAttribute('condition','false')
        parent = btn.parentElement.parentElement.parentElement.cloneNode(true)
        btn.parentElement.parentElement.parentElement.remove()
        let lst = document.querySelector('div[class="InjectLayout-sc-1i43xsx-0 hWukFy tw-transition-group"]').querySelectorAll('div[class="ScChannelStatusIndicator-sc-bjn067-0 kqWDUJ tw-channel-status-indicator"]')
        if (lst.length!=0){
            let tmp = lst[lst.length-1].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            console.log(tmp.querySelector('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').innerText)
            tmp.parentElement.insertBefore(parent,tmp.nextElementSibling)
        }
        else{
            let flag = true;
            document.querySelectorAll('button[class^="pin"]').forEach((elem) =>{
                if(elem.getAttribute('condition') == "false" && flag){
                    flag = false
                    let tmp = elem.parentElement.parentElement.parentElement
                    tmp.parentElement.insertBefore(parent,tmp)
                    return true
                }
            })
            // find last pin and same steps
        }
        
    }
}

function setPins() {
    try{
        if (document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('a[class~="ivecvv"]').length!= document.querySelectorAll('button[class^="pin"]').length) {
            document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('div[class="Layout-sc-1xcs6mc-0 cwtKyw side-nav-card"]').forEach((element) => {
                if (!element.querySelector('button[class^="pin"]')){
                    element.querySelector('a[class="ScCoreLink-sc-16kq0mq-0 eBmhqT InjectLayout-sc-1i43xsx-0 ivecvv side-nav-card__link tw-link"]').style.cssText = "width: 90% !important;float: right;"
                    btn = createPin()
                    element.prepend(btn)
                }
            })   
        }
        document.querySelector('span[class="CoreText-sc-1txzju1-0 hQHFHT"]').onclick = function(){
            setTimeout(()=>{
                if (document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('a[class~="ivecvv"]').length!= document.querySelectorAll('button[class^="pin"]').length) {
                    document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('div[class="Layout-sc-1xcs6mc-0 cwtKyw side-nav-card"]').forEach((element) => {
                        if (!element.querySelector('button[class^="pin"]')){
                            element.querySelector('a[class="ScCoreLink-sc-16kq0mq-0 eBmhqT InjectLayout-sc-1i43xsx-0 ivecvv side-nav-card__link tw-link"]').style.cssText = "width: 90% !important;float: right;"
                            element.prepend(btn)
                        }
                    })   
                }
            },200)
        }    
    }
    catch (e){
    }
    
    // logic of buttons
    document.querySelectorAll('button[class^="pin"]').forEach((element)=> {
        element.onclick = function(){
            btnPressed(element)
        }
    })
}



if (document.readyState !== 'loading'){
    setPinnedChannels()
    setInterval(setPins, DELAY);   
}