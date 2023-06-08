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
