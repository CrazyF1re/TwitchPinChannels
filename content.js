let count = 0
const DELAY = 2000
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
    let listchannels = document.querySelector('div[class^="InjectLayout-sc-1i43xsx-0"][class*="tw-transition-group"]')
    if (listchannels.parentElement.role != "group"){
        return -1
    }
    listchannels.prepend(container)
    listchannels = listchannels.firstChild
    lst.forEach(elem => {
        //if channel is online then just pin the copy of channel and hide original channel string
        title = document.querySelector(`p[title="${elem.name}"]`)
        if(title?.parentElement.parentElement.parentElement.querySelector('div[class$="tw-channel-status-indicator"]'))
        {
            
            channel = get_parent(document.querySelector(`p[title="${elem.name}"]`),7)
            var tmp =channel.cloneNode(true)
            channel.style.display = "none";
            tmp.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"     
            tmp.querySelector('button').setAttribute('condition','true')
        }
        else{//get channel from list of channels
            var tmp = new DOMParser().parseFromString(elem.block, "text/html").querySelector('div') 
        }
        listchannels.prepend(tmp)
    })
    return 1
}
// add pinned channel into storage
function addToStorage(element){
    let offline = element.cloneNode(true)
    //if channel is online, then delete category of stream and replace online counter with offline status 
    if(element.querySelector('div[class$="tw-channel-status-indicator"]')){
        //remove live counter div element
        offline.querySelector('div[class$="tw-channel-status-indicator"]').parentElement.remove()
        //switch to offline
        not_live = document.createElement('p')
        not_live.textContent = "Не в сети"
        not_live.style = "    color: #dedee3;"
        offline.querySelector('div[class$="side-nav-card__live-status"]').prepend(not_live)
        //remove category
        offline.querySelector('div[class$="side-nav-card__metadata"]').firstChild.remove()
        
        
        //change image to offline
        offline.querySelector('a').firstChild.className = offline.querySelector('a').firstChild.className + '--offline'
    }
    //change image of pin to colorfull
    offline.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
    //set condition to button
    offline.querySelector('button').setAttribute('condition','true')
    
    // save element into stotage
    let obj = {
        name: offline.querySelector('p').title,
        block:offline.outerHTML
    }
    let lst = localStorage.getItem('PinnedList') ? JSON.parse(localStorage.getItem('PinnedList')) : []
    lst.push(obj)
    localStorage.setItem('PinnedList',JSON.stringify(lst))
}
// delete unpinned channel from strorage
function delFromStorage(elem){
    let nick = elem.querySelector('p').textContent
    let lst = JSON.parse(localStorage.getItem('PinnedList'))
    lst = lst.filter(n => n.name != nick)
    localStorage.setItem('PinnedList',JSON.stringify(lst))
}
// when pin button pressed
function btnPressed(btn)
{
    // check condition (pinned or unpinned button and channel also)
    if(btn.getAttribute('condition') == "false"){

        addToStorage(get_parent(btn,2))
        parent = get_parent(btn,2).cloneNode(true)
        parent.querySelector('button').setAttribute('condition','true')
        parent.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
        get_parent(btn,3).style.display = "none"
        document.querySelector("div[class$='tw-transition-group']").firstChild.prepend(parent)
    }
    else{
        delFromStorage(get_parent(btn,2))
        let nick = btn.parentElement.querySelector('p').textContent
        get_parent(btn,2).remove()
        document.querySelector('div[class$="tw-transition-group"]').querySelectorAll('p').forEach(elem => {
            if (elem.textContent === nick){//make channel visible which is not pinned
                get_parent(elem,7).style.display = "block"
            }
        });
    }
}
function update_channels_info(){
    let lst = JSON.parse(localStorage.getItem('PinnedList'))
    lst.forEach(elem => {
        let chnls = document.querySelectorAll(`p[title="${elem.name}"]`)
        if(chnls.length > 1)
        {
            let parent0 = get_parent(chnls[0],4)
            let parent1 = get_parent(chnls[1],4)
            //img offline to online effect 
            try{
                parent0.previousSibling.className = parent1.previousSibling.className
            }
            catch (e){}
            // live counter
            parent0.querySelector('div[class$="side-nav-card__live-status"]').innerHTML = `${parent1.querySelector('div[class*="side-nav-card__live-status"]').innerHTML}`
            // category
            category = parent0.querySelector('div[class$="side-nav-card__metadata"]')
            if (category){
                category.innerHTML = `${parent1.querySelector('div[class$="side-nav-card__metadata"]').innerHTML}`
            }
            else{
                //?????parent0.querySelector('div[class="Layout-sc-1xcs6mc-0 eza-dez"]').append(parent1.querySelector("div[class='Layout-sc-1xcs6mc-0 bYeGkU side-nav-card__metadata']").cloneNode(true))
            }
            //change image online
            if (parent1.previousSibling.className.indexOf('side-nav-card__live-status--ofline')){
                parent0.previousSibling.className = parent0.previousSibling.className.slice(0,-9)
            }
            get_parent(parent1,3).style.display = 'none'
        }
        // if we have the one channel and it has red live point then switch channel to offline type from localStorage
        if(chnls.length == 1 && get_parent(chnls[0],4).querySelector('div[class$="tw-channel-status-indicator"]')){
            get_parent(chnls[0],8).innerHTML = `${new DOMParser().parseFromString(elem.block, "text/html").querySelector('div"]').innerHTML}`
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

        channels_counter = document.querySelector("div[class$='side-nav__scrollable_content']").querySelectorAll("div[class$='tw-transition']").length + document.querySelector('div[class="my-container"]')?.querySelectorAll('button[class="pin"]').length
        pins_counter = document.querySelectorAll('button[class="pin"]').length
        if ( channels_counter != pins_counter) {
            console.log(channels_counter)
            console.log(pins_counter)
            document.querySelector("div[class$='side-nav__scrollable_content']").querySelectorAll("div[class^='Layout-sc-1xcs6mc-0']").forEach(elem =>{
                if (elem.classList.contains("side-nav-card") && !elem.querySelector('button[class="pin"]')){
                    elem.style = "display:inline-flex; width:100%"
                    elem.querySelector('a').style.cssText = "width: 90% !important;float: right;"
                    btn = createPin()
                    elem.prepend(btn)
                }
                
            }) 
        }
        if (flag){
            if (setPinnedChannels()){
                flag = false
            }
            
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
    // setInterval(openCloseChannels,DELAY*120)
    setInterval(setPins, DELAY);   
}