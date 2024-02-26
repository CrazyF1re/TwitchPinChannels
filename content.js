let count = 0
const DELAY = 500
let flag = true
let updater = 10
// function creates pin button and returns it
function createPin(){
    let btn = document.createElement('button')
    btn.className = 'pin-'+count
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
        element.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
        element.querySelector('div[class="Layout-sc-1xcs6mc-0 fCKtYt side-nav-card__live-status"]').prepend(offline)
    }
    // save element into stotage
    let obj = {
        name: element.querySelector('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').textContent,
        block:element.outerHTML
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
    let number
    lst.forEach(el => {if(el.name == nick){
        number = lst.indexOf(el)
    }})
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

        delFromStorage(btn.parentElement.parentElement.parentElement)
        let nick = btn.parentElement.querySelector('p[class="CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0"]').textContent
        btn.parentElement.parentElement.parentElement.remove()
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
                parent0.querySelector('div[class^="Layout-sc-1xcs6mc-0 bgXDR side-nav-card__avatar side-nav-card__avatar"]').className = "Layout-sc-1xcs6mc-0 bgXDR side-nav-card__avatar side-nav-card__avatar"
            }
            catch (e){
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
            parent1.parentElement.parentElement.parentElement.style.display = 'none'
        }
        // if we have the one channel and it has red live point then switch channel to offline type from localStorage
        if(chnls.length == 1 && chnls[0].parentElement.parentElement.parentElement.parentElement.querySelector('div[class="ScChannelStatusIndicator-sc-bjn067-0 kqWDUJ tw-channel-status-indicator"]')){

            chnls[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = `${new DOMParser().parseFromString(elem.block, "text/html").querySelector('div[class="ScTransitionBase-sc-hx4quq-0 hGaUsM tw-transition"]').innerHTML}`
        }
        
        
    })
}

//adds pin buttons at web page
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
                JSON.parse(localStorage.getItem('PinnedList')).forEach(elem =>{
                    if(document.querySelectorAll(`p[title="${elem.name}"]`).length>1){
                        document.querySelectorAll(`p[title="${elem.name}"]`)[1].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none"
                    }
                })
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
    setInterval(setPins, DELAY);   
}