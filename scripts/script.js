window.addEventListener('load', ()=> {
    if (location.href.indexOf('/') === -1) {
        location.href += '/index.html';
    }
});

let select = document.querySelector('.members-bar');
if (select) {    
    select.addEventListener("change", function() {
        let idname = select.value;
        location = "#" + idname;
        select.selectedIndex = 0;
    });
}

let mikasa_purple = document.querySelector('.mikasa');
if (mikasa_purple) {
    mikasa_purple.addEventListener("click", function() {
        if (mikasa_purple.nextElementSibling.style.backgroundColor !== 'purple') {
            mikasa_purple.nextElementSibling.style.backgroundColor = 'purple';   
        }
        else if (mikasa_purple.nextElementSibling.style.backgroundColor === 'purple' && mikasa_purple.style.color !== 'purple') {
            mikasa_purple.style.color = 'purple';
        }
        else {
            mikasa_purple.nextElementSibling.style.backgroundColor = 'white';
            mikasa_purple.style.color = "chartreuse";
        }
    });
}

let middle_two = document.querySelector('.GENM');
if (middle_two) {
    let mtsentence = ['我是中二之神', '在我面前感到恐懼吧', '吾乃中二之化身'];
    let cnt = 0;
    middle_two.addEventListener('click', ()=> {
        alert(mtsentence[(cnt++) % 3]);
    });
}

let blackie = document.querySelector('.blackie');
function blackie_is_handsome() {
    let ans = confirm('你確定你想知道更多？');
    if (ans) {
        blackie.innerHTML = 'Blackie is handsome。';
        blackie.style.textDecorationLine = 'none';
        blackie.removeEventListener('click', blackie_is_handsome);
    }    
}
if (blackie) {
    blackie.addEventListener('click', blackie_is_handsome);
}

let ss = document.querySelector('header div a');
ss.innerHTML= 'SS';

document.querySelector('footer').children[0].innerHTML = '作者：浮游生物（喵pass）, Mikasa';

document.querySelector('.back-to-top').addEventListener("click", function() {
    location = "#top";
});

let nav_bar = document.querySelector('.nav-bar');
if (nav_bar) {
    nav_bar.addEventListener('change', ()=> {
        let nowhref = location.href;
        while(nowhref[nowhref.length - 1] !== '/') nowhref = nowhref.substr(0, nowhref.length-1);
        location.href = nowhref + nav_bar.value +'.html';
        nav_bar.selectedIndex = 0;    
    });
}

let related_bar = document.querySelector('.related-bar');
if (related_bar) {
    related_bar.addEventListener('change', function() {
        window.open(related_bar.value);
        related_bar.selectedIndex = 0;
    })
}