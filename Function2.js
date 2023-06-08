    import User from "./User";
    
    import database from '@react-native-firebase/database';
    const names = ["jia", "Maya", "Lara","lisa","Tiffany", "Angela", "Eva", "Tina","Anny","sash","Mary","Emmilia","Mia","Sophia","Harper",
    "unknown", "missing_girl", "no.one", "angel", "1234","___","xxxy","dont know","lana"]
    const name_m = ["bick","hornyyy","m_18","m..horny","Uper","love","okk","Jenn","...","Mr.","Joe","Male","letstalk","dave",
    "Dude","xxx","Adrian","420","Mikee","Syna","George","iml","jacob","warm","Huge","hello","Lucas","William","Benjamin","Mason","User","Dhruv"]
    let v_hi = true
    let v_f = true
    let age = 0
    let how = true
    let here = true
    let here2 = true
    let name1 = ""
    let name2 = ""
    let from = true 
    let country = User.countrycode
    let rancountry = ""
    let gender = false
    let talkarr = []
    let msgId = ""
    let danger = 0
    export function reset2(){
        v_hi = true
        v_f = true
        age = 0
        how = true
        here = true
        here2 = true
        name1 = ""
        name2 = ""
        from = true 
        rancountry = ""
        gender = false
        msgId = ""
        talkarr = []
        danger = 0
    }
    export function chatbotfunc2(y) {
        y = y.toLowerCase()
        if(y === "your avatar"){
            
            let ran = Math.floor(Math.random() * 4)
            if(ran === 0){
                gender = true
                return (Math.floor(Math.random() * 34) + 1)
            }
            return (Math.floor(Math.random() * 34) + 35)
        }
        let name_v
        if(y === " name .."){
            let v5 = "chitchat/function2"
            
            msgId = database().ref(v5).push().key;
            if(!gender){
                name2 =  name_m[Math.floor(Math.random() * name_m.length)]
                return name2;
            }
            name_v = Math.floor(Math.random() * names.length)
            if(name_v <= 14){
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
                t = ['India','United States of America','Greece' ,'Belgium','France','Monaco','Spain','India','Hungary','Croatia','Serbia','Italy'
                ,'Romania','Slovak Republic','India','Austria','United Kingdom of Great Britain','India',
                
                'United States of America', 'Canada', 'Australia', 'New Zealand','United States of America',
                    'United States of America', 'Canada','India', 'Colombia']
                rancountry = t[Math.floor(Math.random() * (t.length))]
                return rancountry
            }
        }
        let updates = {};
                    

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
                'me 26', 'i#27','27', '28 years old','28', '29', '30', 'i#31','31', '32', 'i m 33', '33', 'im#34', '34']

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
            lis = ['m','f','gender','sex','boy','girl','gndr','bi ']
            lis_res = ['female','f','girl','f', 'im f','f']
            let lis_res2 = ['male','m','boyyy','m', 'im m','m']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    v_f = false
                    if(gender){
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]
                    } 
                    else{
                    return lis_res2[Math.floor(Math.random() * (lis_res2.length))] 
                    }
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
            lis = ['how r','how are u','how are you','how r you','hru','hows', 'how is', 'h r u','how u']
            lis_res = ['good and boring lol', 'good and yourself', 'nothing much and u','i am fine thnx','goood so far',
            'nothing much#~~~~~~~~~~~u ?','just bored lollll']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    how = false
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }
        }
        if(here){
            lis = [' here',' app',' looking',' doin','up',' sup', ' goin']
            lis_res = ['not muc just bored', 'time passing loll', 'idk just bored','actually bored','looking for time pass',
            'tryna have fun!','lazy']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    here = false
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }
        }
        if(here2){
            lis = [' here',' do','talk',' chat']
            lis_res = ['idk# tell me something cute', 'anything#~~may be some fun', 'whatever u say','something fun',
            'don know really~~~~~~~~~~~~~~~~u say','oh# i hav no idea','u tell me something']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    here2 = false
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }
        }

        if(from){
            lis = ['from','country','belong']
            lis_res = ['exit','i m from ','m from#~~~~~~','i m from#~~~~~~~~','','','']
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

        lis = ['ig','snapchat', 'snpchat','insta','whats up','fb','facebook']
        lis_res = ['exit','can we chat here first#~~~~~~~~~~~~~~~~~~~~~exit',
         'i wanna talk here', 'well nope i don wanna go there#~~~~~~~~~~~~~~~~~~~~~~~~~~~~exit',
         'lets first text here', 'nope#~~~~~~exit']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }

        lis = ['quarantine', 'lockdown','quarntin', 'covid', 'corona', 'virus']
        lis_res = ['bored Af','seriosly im fuckin bored', 'this sucks', 'this is#~~~ unbearable','hope vaccine comes',
        'this thingy is 😬']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }

        lis = ['see','pic','picture','send','show','trade','nude']
        lis_res = ['nop pics#~~~please#~~~~~~~~exit','no pics#~~~~please','exit', 'not yet', 'talk to me first',
        'i don think we can send images here#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~exit',
        'just chat#~~~~~~~~~~exit ', 'can u guyss stop asking pics ASAP#~~~~~~~~~~~~~~~~~~~~~~~~~~~~exit',
        'can u guys stop asking for #~~~~~~~~~~~~~~~~~~~~~~~pics#~~~~~~~~~~~~~~~~~~~~~~~~exit']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }

        lis = ['sure','ok','yea','yes','great','wow','fine', 'thank', 'good']
        lis_res = ['hmmm','aha','yeah😎','yea', 'yup', 'yeaas','😎😛' ]
        for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    return lis_res[Math.floor(Math.random() * (lis_res.length))]  
                }
        if(name1 == ""){
            lis = ['name','i am','i m']
            let l1 = ['i m ','','', 'myself ', 'I am ', '', 'Me ']
            lis_res = ['#~~~nie to meet u','','#~~~nice meeting u',' ', '']
            for (let i = 0; i < lis.length; i++)
                if(y.includes(lis[i])){
                    name1 == "pp"
                    let a1 = l1[Math.floor(Math.random() * (l1.length))] +
                    name2 + lis_res[Math.floor(Math.random() * (lis_res.length))] 
                    return a1  
                }
        }

        lis = ['sory','sorry']
        lis_res = ['all good#~~~~~~~~exit','no worries#~~~~~~~exit','dont wory#~~~~~~~~exit','its ok#~~~~~~~~~exit']
        for (let i = 0; i < lis.length; i++)
            if(y.includes(lis[i])){
                return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }

        lis = ['wear','cloth']
        lis_res = ['top and panties','just bra.','pnti and top','nighty', 'nothing#~~~~~~~~~~~😛']
        for (let i = 0; i < lis.length; i++)
        if(y.includes(lis[i])){
            return lis_res[Math.floor(Math.random() * (lis_res.length))]  
            }

        let b1 = 'chitchat/function2';
        talkarr.push(y)
        
        

        danger++ ;
        if(danger > 3){
            //updates[msgId] = talkarr;
            //database().ref(b1).update(updates);
        return "exit";
        }
        else
        {
            lis_res = ['hm','','','wh','','','?','😐','.','']
            return lis_res[Math.floor(Math.random() * (lis_res.length))]
        }
    }