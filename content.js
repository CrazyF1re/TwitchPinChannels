let count = 0
const DELAY = 300
let flag = true
let updater = 10
let container = document.createElement('div')
container.className= 'my-container'
// function creates pin button and returns it
function createPin(){
    let btn = document.createElement('button')
    btn.className = 'pin'
    btn.setAttribute("type","button")
    btn.setAttribute("condition", "false")
    btn.innerHTML = '<img src="https://i.imgur.com/suOLe1J.png" style="width: 18px; height: 18px;">'
    return btn
}
function get_parent(obj,count){
    while(count>0){
        obj = obj.parentElement
        count-=1
    }
    return obj
}


// get pinned channels from storage and place it into top of list of channels
function setPinnedChannels(){
    let lst = JSON.parse(localStorage.getItem('PinnedList'))
    let listchannels = document.querySelector('div[class="InjectLayout-sc-1i43xsx-0 hWukFy tw-transition-group"]')
    listchannels.prepend(container)
    listchannels = listchannels.firstChild
    lst.forEach(elem => {
        //if channel is online then just pin the copy of channel and hide original channel string
        title = document.querySelector(`p[title="${elem.name}"]`)
        if(title?.parentElement.parentElement.parentElement.querySelector("div[class='ScChannelStatusIndicator-sc-bjn067-0 eeoSbx tw-channel-status-indicator']"))
        {
            
            channel = get_parent(document.querySelector(`p[title="${elem.name}"]`),7)
            var tmp =channel.cloneNode(true)
            channel.parentElement.style.display = "none";
            tmp.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"     
            tmp.querySelector('button').setAttribute('condition','true')
        }
        else{//get channel from list of channels
            var tmp = new DOMParser().parseFromString(elem.block, "text/html").querySelector('div[class="ScTransitionBase-sc-hx4quq-0 hGaUsM tw-transition"]') 
        }
        listchannels.prepend(tmp)
    })
}
// add pinned channel into storage
function addToStorage(element){
    let offline = element.cloneNode(true)
    //if channel is online, then delete category of stream and replace online counter with offline status 
    if(element.querySelector('div[class$="tw-channel-status-indicator"]')){
        //switch to offline
        offline.querySelector("span[class='CoreText-sc-1txzju1-0 gWcDEo']").textContent = "Не в сети"
        //remove online indicator
        offline.querySelector("div[class='ScChannelStatusIndicator-sc-bjn067-0 eeoSbx tw-channel-status-indicator']").remove()
        //remove category
        offline.querySelector("p[class='CoreText-sc-1txzju1-0 eUABfN']").innerHTML = ""
        //change image to offline
        offline.querySelector("div[class$='Layout-sc-1xcs6mc-0 bgXDR side-nav-card__avatar'").className = "Layout-sc-1xcs6mc-0 bgXDR side-nav-card__avatar side-nav-card__avatar--offline"
    }
    //change image of pin to colorfull
    offline.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
    //set condition to button
    offline.querySelector('button').setAttribute('condition','true')
    
    // save element into stotage
    let obj = {
        name: offline.querySelector('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').textContent,
        block:offline.outerHTML
    }
    let lst = localStorage.getItem('PinnedList') ? JSON.parse(localStorage.getItem('PinnedList')) : []
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

        addToStorage(get_parent(btn,3))
        parent = get_parent(btn,3).cloneNode(true)
        parent.querySelector('button').setAttribute('condition','true')
        parent.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
        get_parent(btn,3).style.display = "none"
        document.querySelector('div[class="InjectLayout-sc-1i43xsx-0 hWukFy tw-transition-group"]').firstChild.prepend(parent)
    }
    else{
        delFromStorage(get_parent(btn,2))
        let nick = btn.parentElement.querySelector('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').textContent
        get_parent(btn,2).remove()
        document.querySelector('div[class="InjectLayout-sc-1i43xsx-0 hWukFy tw-transition-group"]').querySelectorAll('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').forEach(elem => {
            if (elem.textContent === nick){//make channel visible which is not pinned
                get_parent(elem,8).style.display = "block"
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
            let parent0 = get_parent(chnls[0],4)
            let parent1 = get_parent(chnls[1],4)
            //img offline to online effect 
            try{
                parent0.previousSibling.className = parent1.previousSibling.className
            }
            catch (e){}
            // live counter
            parent0.querySelector('div[class="Layout-sc-1xcs6mc-0 fCKtYt side-nav-card__live-status"]').innerHTML = `${parent1.querySelector('div[class="Layout-sc-1xcs6mc-0 fCKtYt side-nav-card__live-status"]').innerHTML}`
            // category
            category = parent0.querySelector('div[class="Layout-sc-1xcs6mc-0 bYeGkU side-nav-card__metadata"]')
            if (category){
                category.innerHTML = `${parent1.querySelector('div[class="Layout-sc-1xcs6mc-0 bYeGkU side-nav-card__metadata"]').innerHTML}`
            }
            else{
                parent0.querySelector('div[class="Layout-sc-1xcs6mc-0 eza-dez"]').append(parent1.querySelector("div[class='Layout-sc-1xcs6mc-0 bYeGkU side-nav-card__metadata']").cloneNode(true))
            }
            //change image online
            if (parent1.previousSibling.querySelector("div[class$='side-nav-card__live-status']")){
                parent0.previousSibling.className = "Layout-sc-1xcs6mc-0 bgXDR side-nav-card__avatar"
            }
            get_parent(parent1,4).style.display = 'none'
        }
        // if we have the one channel and it has red live point then switch channel to offline type from localStorage
        if(chnls.length == 1 && get_parent(chnls[0],4).querySelector('div[class$="tw-channel-status-indicator"]')){
            get_parent(chnls[0],7).innerHTML = `${new DOMParser().parseFromString(elem.block, "text/html").querySelector('div[class="ScTransitionBase-sc-hx4quq-0 hGaUsM tw-transition"]').innerHTML}`
        }        
    })
}
//open and close list of channels (in case when pinned channel hidden and extention cant get info about this channel)
function openCloseChannels(){
    document.querySelector("button[data-test-selector='ShowMore']").click()
    setTimeout(function(){document.querySelector("button[data-test-selector='ShowLess']").click()},50)
}
//adds pin buttons at web page
function setPins() {
    try{
        channels_counter = document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('a[class~="ivecvv"]').length
        pins_counter = document.querySelectorAll('button[class="pin"]').length
        if ( channels_counter != pins_counter) {
            document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('div[class^="Layout-sc-1xcs6mc-0 cwtKyw side-nav-card"]').forEach((element) => {
                if (!element.querySelector('button[class="pin"]')){
                    element.style = " display:inline-flex; width:100%"
                    element.querySelector('a[class^="ScCoreLink-sc-16kq0mq-0 eBmhqT InjectLayout-sc-1i43xsx-0 ivecvv side-nav-card__link"]').style.cssText = "width: 90% !important;float: right;"
                    btn = createPin()
                    element.prepend(btn)
                }
            })   
        }
        if (flag){
            setPinnedChannels()
            flag = false
        }  
    }
    catch (e){}
    if (!flag && updater == 0) {
        updater = 10
        update_channels_info()
    }
    updater-=1
    // logic of buttons
    document.querySelectorAll('button[class="pin"]').forEach((element)=> {
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