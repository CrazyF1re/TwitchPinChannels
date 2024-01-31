
let count = 0
setTimeout(() => {
    document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('a[class~="ivecvv"]').forEach(element => {
        element.style.cssText = "width: 90% !important;float: right;"
        
    });
    document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('div[class="Layout-sc-1xcs6mc-0 cwtKyw side-nav-card"]').forEach((element) => {
        let btn = document.createElement('button')
        btn.className = 'pin-'+count
        count+=1
        btn.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/6606/6606222.png" style="width: 18px; height: 18px;">'
        element.prepend(btn)
    })
    document.querySelector('span[class="CoreText-sc-1txzju1-0 hQHFHT"]').onclick = function(){
        setTimeout(()=>{
        let i = 0;
        document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('a[class~="ivecvv"]').forEach(element => {
            if (i>=count) {
                element.style.cssText = "width: 90% !important;float: right;"
            }
            i++
        });
        console.log(document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('a[class~="ivecvv"]').length)
        i = 0;
        document.querySelector('div[class="Layout-sc-1xcs6mc-0 dcyYPL side-nav-section"]').querySelectorAll('div[class="Layout-sc-1xcs6mc-0 cwtKyw side-nav-card"]').forEach((element) => {
            if(i>=count){
                let btn = document.createElement('button')
                btn.className = 'pin-'+count
                count+=1
                btn.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/6606/6606222.png" style="width: 18px; height: 18px;">'
                element.prepend(btn)
            }
            i++  
        })
        },200)
    }    
}, 3700);