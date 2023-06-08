import User from "./User";

import database from '@react-native-firebase/database';
const names = ["jia", "Maya", "Lara","lisa","Tiffany", "Angela", "Evani", "Tina","Anny","sash","Mary","Emmilia","Mia","Sophia","Harper",
 "unknown", "missing_girl", "no.one", "angel", "1234","___","xxxy","baby","finding"]
import {arr1} from "./stoya";
import {arr2} from "./stoya";
import {arr3} from "./stoya";
import {arr4} from "./stoya";
import {arr5} from "./stoya";
import {arr6} from "./stoya";
import {arr7} from "./stoya";
import {arr8} from "./stoya";
import {arr9} from "./stoya";
import {arr10} from "./stoya";
let anothap = true
let see2 = true
let v_hi = true
let v_f = true
let age = 0
let how = true
let here = true
let here2 = true
let name1 = ""
let name2 = ""
let hindi = true
let from = true 
let country = User.countrycode
let rancountry = ""
let gender = true
let signal = false
let counter = 0
let sto = []
let danger = 0
let talkarr = []
let msgId = ""
let arr = []
let arr22 = 0
let arr33 = 0
export function reset1(){
    arr = []
    arr22 = []
    arr33 = []
    danger = 0
    anothap = true
    see2 = true
    v_hi = true
    v_f = true
    age = 0
    how = true
    here = true
    here2 = true
    name1 = ""
    hindi = true
    name2 = ""
    from = true 
    rancountry = ""
    gender = true
    signal = false
    counter = 0
    sto = []
    msgId = ""
}
export function chatbotfunc(y) {
    y = y.toLowerCase()
    if(y === "your avatar"){
        let v5 = "chitchat/function"
        let td = "users/" + User.id + "/arrinapp"
                let t = database().ref(td)
                t.once('value', (value) => {
                    arr = value.val()
                })
        let tdw = "users/" + User.id + "/arr_in_data_read"
        let tt = database().ref(tdw)
                tt.once('value', (value) => {
                    arr33 = value.val()
                })
         if(country == 404 || country == 405){
            let tm = database().ref("stoya/arr_indian")
            tm.once('value', (value) => {
                        arr22 = value.val()
            })
         } 
         else{          
        let tm = database().ref("stoya/arr")
        tm.once('value', (value) => {
                    arr22 = value.val()
        })
        }
        msgId = database().ref(v5).push().key;
        
        return (Math.floor(Math.random() * 34) + 1)
        
    }
    if(!signal){

    let name_v
    if(y === " name .."){
    
        name_v = Math.floor(Math.random() * names.length)
        if(name_v <= 13){
            name2 = names[name_v]
        }
        else{
            name2 = names[Math.floor(Math.random() * names.length) + name_v]
        }
        return names[name_v]
    }
    if(y === "countryyy"){
        let t = []
        if(country < 295 && country > 200){
            t = ['United States of America', 'Canada', 'Australia', 'New Zealand', 'Philippines','Malaysia', 'Maldives',
                'Thailand', 'Japan', 'United Arab Emirates', 'Mexico', 'Brazil', 'Egypt', 'South Africa','United States of America',
                'United States of America', 'Canada', 'Colombia']
            rancountry = t[Math.floor(Math.random() * (t.length))]
            return rancountry
        }
        else if(country < 369 && country > 300){
            t = ['Greece' ,'Netherlands','Belgium','France','Monaco','Spain','Hungary','Croatia','Serbia','Italy'
            ,'Romania','Switzerland','Czech Republic','Slovak Republic','Austria','United Kingdom of Great Britain'
            ,'United Kingdom of Great Britain','Denmark','Sweden','Norway','Finland','Germany']
            rancountry = t[Math.floor(Math.random() * (t.length))]
            return rancountry
        }
        else if(country < 536 && country > 500){
            t = ['Greece' ,'Netherlands','Belgium','France','Monaco','Spain','Hungary','Croatia','Serbia','Italy'
            ,'Romania','Switzerland','Czech Republic','Slovak Republic','Austria','United Kingdom of Great Britain'
            ,'United Kingdom of Great Britain','Denmark','Sweden','Norway','Finland','Germany','United States of America', 'Canada',
             'United Arab Emirates', 'Mexico', 'Brazil', 'Egypt', 'South Africa','United States of America',
            'United States of America', 'Canada', 'Colombia']
            rancountry = t[Math.floor(Math.random() * (t.length))]
            return rancountry
        }
        else{
            t = ['United States of America','Greece' ,'Netherlands','Belgium','France','Monaco','Spain','Hungary','Croatia','Serbia','Italy'
            ,'Romania','Switzerland','Czech Republic','United States of America','Slovak Republic','Austria','United Kingdom of Great Britain'
            ,'United Kingdom of Great Britain','Denmark','Sweden','Norway','Finland','Germany',
            'United States of America', 'Canada', 'Australia', 'New Zealand','United States of America',
                'United States of America', 'Canada', 'Colombia']
            rancountry = t[Math.floor(Math.random() * (t.length))]
            return rancountry
        }
    }

    let lis = []
    let lis_res = []
    if(age == 0){
        let r = y.split(' ')
        for (let i = 0; i < r.length; i++)
            for (let ii = 0; ii < r[i].length; ii++)
                if(!isNaN(r[i].charAt(ii))){
                    age = age*10 + parseInt(r[i].charAt(ii), 10)
                }
        if(age != 0){
            lis_res = [' 18', '19', 'i#19', 'i am 19', '20', '21', 'im 21', 'i#22', '23', 'i m 23', '24 f','24', '25','26', 
            'me 26', 'i#27','27', '28 years old','28', '29', '30', 'i#31','31', '32', 'i m 33', '33', 'im#~34', '34']

            return lis_res[Math.floor(Math.random() * (lis_res.length))]
        }
    }

    if(v_hi){
        lis = ['hi','hello','hllo','hallo','hey']
        lis_res = ['hii','hi','hello!!','heyy', 'hie', 'hey', 'Yo','hllo', 'hi']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 v_hi = false
                 return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }
    }
    if(v_f){
        lis = ['m','f','gender','boy','girl','gndr','bi ']
        lis_res = ['female','f','girl','f', 'im f','f']
        
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 v_f = false
                 return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }
    }
    if(age == 0){
        lis = ['age','old']
        let addi = ['#and yours', '#u?','#u','#what about u', '#yours', '#yours??']
        lis_res = [' 18', '19', 'i#19', 'i am 19', '20', '21', 'im 21', 'i#22', '23', 'i m 23', '24 f','24', '25','26', 
            'me 26', 'i#27','27', '28 years old','28', '29', '30', 'i#31','31', '32', 'i m 33', '33', 'im#34', '34']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 age = 1
                 let a1 = lis_res[Math.floor(Math.random() * (lis_res.length))] 
                 + addi[Math.floor(Math.random() * (addi.length))]
                 return a1  
            }
    }
    for (let i = 0; i < y.length; i++){
        if(Number.isInteger(y[i]))
        {
            lis_res = ['cool','okkk','great','okh','oh#ok','o#k']
            return lis_res[Math.floor(Math.random() * (lis_res.length))]
        }
    }
    if(how){
        lis = ['how are ','hru','hows', 'how is', 'how r', 'h r u']
        lis_res = ['good and boring lol', 'good and yourself', 'nothing much and u','i am fine thnx','goood so far',
        'nothing much#~~~~~~~~~~~~~u ?','just bored lollll','good#what abot u']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 how = false
                 return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }
    }
    if(here){
        lis = [' here',' app','looking','doin',' up',' sup', ' goin']
        lis_res = ['not much just bored', 'time passing loll', 'idk just bored','actually bored','looking for time pass',
        'tryna have fun!','i was bores#~~~~~~~~bored', 'just lookin for chat 😜', 'just lookin for chat u know']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 here = false
                 return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }
    }
    if(here2){
        lis = [' here',' do','talk',' chatting', 'chat ']
        lis_res = ['idk# tell me something cute #~~~~~~~~~~~~~~~~~~~~~~😃', 'anything#may be some fun🥰', 
        'whatever u say#~~~~~~~~~~~~~~~~😐❤','you tell me ❤',
        'something fun', 'whatever u say#~~~~~~~~~~~~~~~😛','i m down for anything 😛',
        'don know really#u say']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 here2 = false
                 return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }
    }

    if(from){
        lis = [' from','country','belong']
        lis_res = ['😃#','','i m from','m from#','i m from#','','','']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 from = false
                 if(rancountry == 'United States of America')
                    rancountry = 'US'
                if(rancountry == 'United Kingdom of Great Britain')
                    rancountry = 'UK'
                 return (lis_res[Math.floor(Math.random() * (lis_res.length))] + rancountry) 
            }
    }

    lis = [' ig ','snapchat', 'snpchat',' insta','whats up',' fb ','facebook']
    lis_res = ['can we chat here first', 'i wanna talk here', 'well nope# i don wanna go there','lets first text here', 'nope']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }

    lis = ['see',' pic','send','show','trade','nude','imag', ' look ']
    lis_res = ['nop pics#please','no pics#please', 'not yet', 'talk to me first','i don think we can send images here',
    'just chat','can u guys stop asking for #pics','cant share images here#nd i dont want tto']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }
    lis = ['quarantine', 'lockdown','quarntin', 'covid', 'corona', 'virus']
    lis_res = ['bored Af','seriosly im fuckin bored', 'this sucks', 'this is# unbearable','hope vaccine comes',
        'this thingy is 😬','these times r so boring lol']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }
    lis = ['boob', 'tit', 'horn', 'dic','nude','sex','naughty','fun','dirt',' fantac']
    lis_res = ['Do you wanna chat fun','would u like to hav littl fun','do u wanna have naughty chatt', 
    'do u wanna have fun chat',
    'what ABout talking dirty', 'are u up for naughty talk#??','im bored#so just wanna chat some fun','i m horny babe',
    ]
    for (let i = 0; i < lis.length; i++)
        if(y.includes(lis[i])){
            signal = true
            return lis_res[Math.floor(Math.random() * (lis_res.length))]  
        }

    lis = ['sure','ok','yea','yes','great','wow']
    lis_res = ['hmmm','aha','yeah😎','yea', 'yup', 'yeaas','😎😛' ]
    for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                 return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }
    if(name1 == ""){
        lis = ['name','i am','i m']
        let l1 = ['i m ', 'myself ', 'I am ', '', 'Me ']
        lis_res = ['nie to meet u','','nice meeting u',' ', '']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                name1 == "pp"
                let a1 = l1[Math.floor(Math.random() * (l1.length))] +
                name2 + lis_res[Math.floor(Math.random() * (lis_res.length))] 
                return a1  
            }
    }

    lis = ['sory','sorry']
    lis_res = ['all good','no worries','dont wory','its ok']
    for (let i = 0; i < lis.length; i++)
        if(y.includes(lis[i])){
            return lis_res[Math.floor(Math.random() * (lis_res.length))]  
        }

    lis = ['wear','cloth']
    lis_res = ['top and panties','just bra.','pnti and top','nighty', 'nothin', 'no top#😛']
    for (let i = 0; i < lis.length; i++)
       if(y.includes(lis[i])){
        return lis_res[Math.floor(Math.random() * (lis_res.length))]  
        }
    
    lis_res = ['', '😐','','','..']
    danger = danger + 1
    if(danger > 2){
        signal = true
        lis_res = ['Do you wanna chat fun','would u like to hav littl fun','do u wanna have horny char#~~~~~~~~~~~~~~~~~~~~~~~~chat',
         'do u wanna have naughty chat',
    'what ABout talking dirty ?', 'are u up for naughty talk ??','im bored#so just wanna chat some fun','i m horny babe',
    'do you wanna spend some fun time']
        return lis_res[Math.floor(Math.random() * (lis_res.length))] 
    }
    return lis_res[Math.floor(Math.random() * (lis_res.length))] 
    }
    else{
        if(sto.length == 0){
            console.log("chala up ..")
            
                    if(arr != null){
                        console.log("chala ..")
                        let ran
                        if(arr.length > 6){
                            ran = Math.floor(Math.random() * (arr.length-4))
                        }
                        else 
                        {
                            ran = Math.floor(Math.random() * (arr.length))
                        }
                        let story = arr[ran]
                        console.log(arr[ran] + "uuuuu")
                        let varia = arr.splice(ran,1)
                        let updatesg = {}
                        updatesg["arrinapp"] = arr
                        console.log(arr.length)
                        database().ref("users/"+ User.id).update(updatesg)
                        if(story == "1"){
                            sto = arr1
                        }
                        else if(story == "2"){
                            sto = arr2
                        }
                        else if(story == "3"){
                            sto = arr3
                        }
                        else if(story == "4"){
                            sto = arr4
                        }
                        else if(story == "5"){
                            sto = arr5
                        }
                        else if(story == "6"){
                            sto = arr6
                        }
                        else if(story == "7"){
                            sto = arr7
                        }
                        else if(story == "8"){
                            sto = arr8
                        }
                        else if(story == "9"){
                            sto = arr9
                        }
                        else{
                            sto = arr10
                        }
                    }

                    else{
                        console.log("chala down ..")
                            if(arr22 >= arr33){
                                let updates = {}
                                updates["arr_in_data_read"] = arr33 + 1
                                let d = arr33
                                database().ref("users/"+ User.id).update(updates)
                                let t2
                                if(country == 404 || country == 405){
                                    t2 = database().ref("stoya/st_indian/"+ d)
                                }
                                else{
                                    t2 = database().ref("stoya/st/"+ d)
                                }
                                sto = [""]
                                t2.once('value', (value) => {
                                    sto = value.val()
                                })
                            }
                            else{
                                return "exit"
                            }
                         
                    }
        }
    let lis = []
    let lis_res = []
    let updates = {};
                    
    let b1 = 'chitchat/function';
    talkarr.push(y)
    
    

    if(anothap){
        lis = [' ig ','snapchat', 'snpchat','insta','whats up','fb','facebook','what\'s up','number', 'num']
        lis_res = ['can we chat here only', 'i wanna talk here', 'well nope# i don wanna go there',
        'lets first text here', 'nope','imm not comfortable with that','lets remain anonymous','no #i dont want to']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    anothap = false
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }
    }
    lis = [' add ', 'chatroom']
        lis_res = ['wait','i will later','later','wait keep on talkin','ok ok #first keep me in mood','ok dont ruin mood yet',
    'just chat yet baby']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    anothap = false
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }
    if(hindi){
        lis = ['hind','kaha']
    lis_res = ['i know hindi','hindi aati hai mujhe','hindi mein krte hai']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                hindi = false
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }
    }
    if(see2){
        lis = [' see ','pic','picture',' send ','trade','imag', 'look']
    lis_res = ['nop pics#~~~~~please','just sext#i m not comfortable with pics', 'mmmmm..#~~~no please', 'just keep texting',
    'i dont want to #i don think we can send images here','can we chat first',
    'just chat','i just want to chat','cant share images here#~~~~~~~and i dont want to']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                see2 = false
                 return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }
    }
    console.log("chala s ..")
    let qwe = sto[counter++]
    qwe = qwe + ""
    if(qwe.includes("exit")){
        //updates[msgId] = talkarr;
        //database().ref(b1).update(updates);
    }
    return qwe;
    }
}