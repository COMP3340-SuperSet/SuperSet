import axios from "axios";
import { toast } from "../components/Toast";

export function makeReport(type, resourceid){
    
    switch (type){
        case 'user':
            axios.post(`/api/report`, {
                type: 0,
                resourceid: resourceid
            }).then((response) => {
                toast('Successfully reported user!', "success");
            }).catch((err) => {
                toast('Error reporting user', "error");
            });

            break;
        case 'set':
            axios.post(`/api/report`, {
                type: 1,
                resourceid: resourceid
            }).then(() => {
                toast('Successfully reported set!', "success");
            }).catch(() => {
                toast('Error reporting set', "error");
            });

            break;    
        case 'item':
            axios.post(`/api/report`, {
                type: 2,
                resourceid: resourceid
            }).then(() => {
                toast('Successfully reported item!', "success");
            }).catch(() => {
                toast('Error reporting item', "error");
            });

            break;
        default: return false;
    }
 }