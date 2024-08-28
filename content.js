let count = 0
const DELAY = 500
let flag = true
let updater = 10
// function creates pin button and returns it
function createPin(){
    let btn = document.createElement('button')
    btn.className = 'pin'
    count+=1
    btn.setAttribute("condition", "false")
    btn.innerHTML = '<img src="https://i.imgur.com/suOLe1J.png" style="width: 18px; height: 18px;">'
    return btn
}

// get pinned channels from storage and place it into top of list of channels
function setPinnedChannels(){
    let lst = JSON.parse(localStorage.getItem('PinnedList'))
    let listchannels = document.querySelector('div[class="InjectLayout-sc-1i43xsx-0 hWukFy tw-transition-group"]')
    console.log()
    lst.forEach(elem => {
        if(document.querySelector(`p[title="${elem.name}"]`))
        {
            
            let tmp =document.querySelector(`p[title="${elem.name}"]`).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.cloneNode(true)
            document.querySelector(`p[title="${elem.name}"]`).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            tmp.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
            tmp.querySelector('button').setAttribute('condition','true')
            listchannels.prepend(tmp)

        }
        else{
            let tmp = new DOMParser().parseFromString(elem.block, "text/html").querySelector('div[class="ScTransitionBase-sc-hx4quq-0 hGaUsM tw-transition"]')
            tmp.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
            tmp.querySelector('button').setAttribute('condition','true')
            listchannels.prepend(tmp)
        }
    })
}

// add pinned channel into storage
function addToStorage(element){
    const offline = element.cloneNode(true)
    //if channel is online, then delete category of stream and replace online counter with offline status 
    if(element.querySelector('div[class$="tw-channel-status-indicator"]')){
        //switch to offline
        offline.querySelector("span[class='CoreText-sc-1txzju1-0 gWcDEo']").textContent = "Не в сети"
        //remove online indicator
        offline.querySelector("div[class='ScChannelStatusIndicator-sc-bjn067-0 eeoSbx tw-channel-status-indicator']").remove()
        //remove category
        offline.querySelector("p[class='CoreText-sc-1txzju1-0 eUABfN']").innerHTML = ""
        //change image of pin to colorfull
        offline.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
        //change image to offline
        offline.querySelector("div[class$='side-nav-card__live-status'").className = "Layout-sc-1xcs6mc-0 bgXDR side-nav-card__avatar side-nav-card__avatar--offline"
    }

    // save element into stotage
    let obj = {
        name: offline.querySelector('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').textContent,
        block:offline.outerHTML
    }
    let lst = []
    if(localStorage.getItem('PinnedList')){
        lst = JSON.parse(localStorage.getItem('PinnedList'))
    }
    lst.push(obj)
    localStorage.setItem('PinnedList',JSON.stringify(lst))
}

// delete unpinned channel from strorage
function delFromStorage(elem){
    let nick = elem.querySelector('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').textContent
    let lst = JSON.parse(localStorage.getItem('PinnedList'))
    lst = lst.filter(n => n.name != nick)
    localStorage.setItem('PinnedList',JSON.stringify(lst))
}

// when pin button pressed
function btnPressed(btn)
{
    // check condition (pinned or unpinned button and channel also)
    if(btn.getAttribute('condition') == "false"){

        addToStorage(btn.parentElement.parentElement.parentElement)
        parent = btn.parentElement.parentElement.parentElement.cloneNode(true)
        parent.querySelector('button').setAttribute('condition','true')
        parent.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
        btn.parentElement.parentElement.parentElement.style.display = "none"
        document.querySelector('div[class="InjectLayout-sc-1i43xsx-0 hWukFy tw-transition-group"]').prepend(parent)
    }
    else{

        delFromStorage(btn.parentElement.parentElement)
        let nick = btn.parentElement.querySelector('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').textContent
        btn.parentElement.parentElement.remove()
        let flag = true
        document.querySelector('div[class="InjectLayout-sc-1i43xsx-0 hWukFy tw-transition-group"]').querySelectorAll('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').forEach(elem => {
            if (elem.textContent === nick && flag){
                flag = false
                elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "block"
            }
        });
    }
}

function update_channels_info(){
    let lst = JSON.parse(localStorage.getItem('PinnedList'))
    lst.forEach(elem => {
        let chnls = document.querySelectorAll(`p[title="${elem.name}"]`)
        if(chnls.length == 2)
        {
            let parent0 = chnls[0].parentElement.parentElement.parentElement.parentElement
            let parent1 = chnls[1].parentElement.parentElement.parentElement.parentElement
            //img offline to online effect 
            try{
                parent0.previousSibling.className = parent1.previousSibling.className
            }
            catch (e){
                console.log("image does not change")
            }
            // live counter
            parent0.querySelector('div[class="Layout-sc-1xcs6mc-0 fCKtYt side-nav-card__live-status"]').innerHTML = `${parent1.querySelector('div[class="Layout-sc-1xcs6mc-0 fCKtYt side-nav-card__live-status"]').innerHTML}`
            // category
            if (parent0.querySelector('div[class="Layout-sc-1xcs6mc-0 bYeGkU side-nav-card__metadata"]')){
                parent0.querySelector('div[class="Layout-sc-1xcs6mc-0 bYeGkU side-nav-card__metadata"]').innerHTML = `${parent1.querySelector('div[class="Layout-sc-1xcs6mc-0 bYeGkU side-nav-card__metadata"]').innerHTML}`
            }
            else{
                parent0.querySelector('div[class="Layout-sc-1xcs6mc-0 eza-dez"]').append(parent1.querySelector("div[class='Layout-sc-1xcs6mc-0 bYeGkU side-nav-card__metadata']").cloneNode(true))
            }
            //change image online
            if (parent1.previousSibling.querySelector("div[class$='side-nav-card__live-status']")){
                parent0.previousSibling.className = "Layout-sc-1xcs6mc-0 bgXDR side-nav-card__avatar"
            }
            

            parent1.parentElement.parentElement.parentElement.style.display = 'none'
        }
        // if we have the one channel and it has red live point then switch channel to offline type from localStorage
        if(chnls.length == 1 && chnls[0].parentElement.parentElement.parentElement.parentElement.querySelector('div[class$="tw-channel-status-indicator"]')){

            chnls[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = `${new DOMParser().parseFromString(elem.block, "text/html").querySelector('div[class="ScTransitionBase-sc-hx4quq-0 hGaUsM tw-transition"]').innerHTML}`
        }
        
        
    })
}
//open and close list of channels (in case when pinned channel hidden and extention cant get info about this channel)
function openCloseChannels(){
    document.querySelector("button[data-test-selector='ShowMore']").click()
    setTimeout(function(){document.querySelector("button[data-test-selector='ShowLess']").click();console.log("close channels ")},50)
    
}

//adds pin buttons at web page
function setPins() {
    try{
        channels_counter = document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('a[class~="ivecvv"]').length
        pins_counter = document.querySelectorAll('button[class^="pin"]').length
        if ( channels_counter != pins_counter) {
            document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('div[class^="Layout-sc-1xcs6mc-0 cwtKyw side-nav-card"]').forEach((element) => {
                if (!element.querySelector('button[class^="pin"]')){
                    element.querySelector('a[class^="ScCoreLink-sc-16kq0mq-0 eBmhqT InjectLayout-sc-1i43xsx-0 ivecvv side-nav-card__link"]').style.cssText = "width: 90% !important;float: right;"
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
                JSON.parse(localStorage.getItem('PinnedList')).forEach(elem =>{
                    if(document.querySelectorAll(`p[title="${elem.name}"]`).length>1){
                        document.querySelectorAll(`p[title="${elem.name}"]`)[1].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none"
                    }
                })
                update_channels_info()
            },200)
        }  
        if (flag){
            setPinnedChannels()
            flag = false
        }  
    }
    catch (e){
    }
    if (!flag && updater == 0) {
        updater = 10
        update_channels_info()
    }
    updater-=1
    // logic of buttons
    document.querySelectorAll('button[class^="pin"]').forEach((element)=> {
        element.onclick = function(){
            btnPressed(element)
        }
    })
}

// main loop
if (document.readyState !== 'loading'){
    setInterval(openCloseChannels,DELAY*120)
    setInterval(setPins, DELAY);   
}