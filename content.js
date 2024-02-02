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

function btnPressed(btn)
{
    if(btn.getAttribute('condition') == "false"){
        btn.querySelector('img').src = "https://i.imgur.com/K0TX8gA.png"
        btn.setAttribute('condition','true')
        parent = btn.parentElement.cloneNode(true)
        btn.parentElement.remove()
        document.querySelector('div[class="InjectLayout-sc-1i43xsx-0 hWukFy tw-transition-group"]').prepend(parent)
    }
    else{
        btn.querySelector('img').src = "https://i.imgur.com/suOLe1J.png"
        btn.setAttribute('condition','false')
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
    setInterval(setPins, DELAY);   
}
