let navs = {};
let relateds = {};
let contents = {};

// querystring

let parseQuery = url => {
    let len = url.lastIndexOf('?') != -1 ? url.lastIndexOf('?') : url.length - 1;
    url = url.substr(len + 1, url.length - len - 1);
    url = url.split('&');
    let obj = {};
    for (i in url) {
        obj[i.split('=')[0]] = i.split('=')[1];
    }
    return obj;
}

let appendQuery = req => {
    let obj = parseQuery(location.href);
    if (req.length != 0) obj[req.split('=')[0]] = req.split('=')[1];
    let url = location.href;
    if (url.lastIndexOf('?') == -1) url += '?';
    Object.keys(obj).sort().forEach(key => {
        if (key == 0) ;
        else url += key + '=' + obj[key]; 
    });
    return url;
}

// fetch datas from SQL by GET

let getDataOfAAndB = (url, A, B) => {
    return fetch(appendQuery(url))
    .then(res => res.json())
    .then(datas => {
        let obj = [];
        for (let i = 1; i <= datas.length - 1; i ++) {
            obj[i] = {};
            obj[i][datas[i][A]] = datas[i][B];
        }
        return obj;
    });
    /*
    obj[1]: (A1: B1)
    obj[2]: (A2: B2)
    obj[3]: (A3: B3)
    */
}

// get the data of the htmls before hand
let getDatas = async () => {
    await getDataOfAAndB('sql=navs', 'name', 'value').then(data => navs = data);
    await getDataOfAAndB('sql=related', 'name', 'value').then(data => relateds = data);
    //return Promise.resolve();
    await Promise.all(Object.keys(navs).map(async id => {
        let tag = Object.keys(navs[id])[0];
        tag = navs[id][tag];
        await getDataOfAAndB('sql=' + tag, 'name', 'value').then(data => contents[tag] = data);
    }));
};
      //await Promise.all(xx.map(async (x) => {
           
// unfixed part

// renew the page while click the navigator bar
let renewPage = (title) => {
    for (let i = 1; i <= navs.length - 1; i++) {
        Object.keys(navs[i]).forEach(key => {
            if (title == navs[i][key]) {
                document.querySelector('article h2').innerHTML = key;
            }  
        });
    }
    
    let div = document.querySelector('#main-div');
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
    
    for (let i = 1; i <= contents[title].length - 1; i++) {
        Object.keys(contents[title][i]).forEach(key => {
            let _element = document.createElement(key);
            _element.innerHTML = contents[title][i][key];
            div.appendChild(_element);    
        });
    }

};

// fixed part

let createNavList = () => {
    for (let i = 1; i <= navs.length - 1; i++) {
        let li = document.createElement('li');
        Object.keys(navs[i]).forEach(key => {
            li.setAttribute('value', navs[i][key]);
            li.innerHTML = key;
            document.querySelector('nav ul').appendChild(li);    
        });
        
    }
}

let createRelatedList = () => {
    for (let i = 1; i <= relateds.length - 1; i++) {
        let li = document.createElement('li');
        Object.keys(relateds[i]).forEach(key => {
            li.setAttribute('value', relateds[i][key]);
            li.innerHTML = key;
            document.querySelector('aside ul').appendChild(li);    
        });
        
    }
}

let createNavSelection = () => {
    
    let first_option = document.createElement('option');
    first_option.setAttribute('selected', '');
    first_option.setAttribute('hidden', '');
    first_option.setAttribute('disabled', '');
    first_option.innerHTML = '導覽頁';
    document.querySelector('.nav-selection').appendChild(first_option);
    for (let i = 1; i <= navs.length - 1; i++) {
        Object.keys(navs[i]).forEach(key => {
            let option = document.createElement('option');
            option.setAttribute('value', navs[i][key]);
            option.innerHTML = key;
            document.querySelector('.nav-selection').appendChild(option);
        });
        
    }
}
    
let createRelatedSelection = () => {
    let first_option = document.createElement('option');
    first_option.setAttribute('selected', '');
    first_option.setAttribute('hidden', '');
    first_option.setAttribute('disabled', '');
    first_option.innerHTML = 'TMR的Youtuber們';
    document.querySelector('.related-selection').appendChild(first_option);
    for (let i = 1; i <= relateds.length - 1; i++) {
        Object.keys(relateds[i]).forEach(key => {
            let option = document.createElement('option');
            option.setAttribute('value', relateds[i][key]);
            option.innerHTML = key;
            document.querySelector('.related-selection').appendChild(option);
        });
    }
}

let eventOfList = () => {
    document.querySelector('nav ul').addEventListener('click', (e) => {
        console.log(e.target.getAttribute('value'));
        renewPage(e.target.getAttribute('value'));
    });
    
    document.querySelector('aside ul').addEventListener('click', (e) => {
        console.log(e.target.getAttribute('value'));
        window.open(e.target.getAttribute('value'));
    })
}
    
let eventOfSelection = () => {
    let nav_selection = document.querySelector('.nav-selection');
    nav_selection.addEventListener('change', () => {
        renewPage(nav_selection.value);
        nav_selection.selectedIndex = 0;
    });
    
    let related_selection = document.querySelector('.related-selection');
    related_selection.addEventListener('change', () => {
        window.open(related_selection.value);
        related_selection.selectedIndex = 0;
    });
}
    
// back to top
let moveToThere = () => {
    document.querySelector('.class-to-top').addEventListener('click', () => {
        document.querySelector('html').scrollTop = 0;
    });
};