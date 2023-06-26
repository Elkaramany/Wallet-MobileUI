import { Alert, Share } from "react-native";
import { useDispatch } from "react-redux";
import Clipboard from '@react-native-clipboard/clipboard';
import dayjs from "dayjs";
import Toast from 'react-native-toast-message'

export const validateName = (name: string): boolean => {
    if (!name || name.length < 2) return false;
    return true;
}

export const validateEmail = (email: string): boolean => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return false;
    }
    return true;
}

export const validatePassword = (password: string): boolean => {
    if (!password || password.length < 8) {
        return false
    }
    return true
}

export const validatePhone = (phone: string) => {
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (regex.test(phone)) return true
    return false
}

export const formatDate = (date: Date | string) => {
    return date.toString().substring(0, date.toString().length - 18)
}

export const selectItem = (item: string, arr: string[]) => {
    //Item already selected so remove it
    if (itemSelected(item, arr)) {
        let newArr = [...arr]
        newArr = newArr.filter(i => i !== item);
        return newArr
    } else {
        //Only have 5 catefories max
        if (arr.length <= 4) {
            const newArr = [...arr]
            newArr.push(item)
            return newArr
        } else {
            return arr
        }
    }
}

export const itemSelected = (cat: string, arr: string[]) => {
    if (arr && arr.length && arr.includes(cat)) return true
    return false
}


export const getSuggesions = (text: string, arr: any[]): any[] => {
    if (!text.length || !arr.length) return []
    return arr.filter(
        (val) => val.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
}

export const randomString = () => {
    // Declare all characters
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Pick characers randomly
    let str = '';
    for (let i = 0; i < 30; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;
}

export const dateFormate = (date: Date | string, format: string) => {
    return dayjs(date).format(format)
}

export const addEllipsis = (str: string, len = 10) => {
    if (str.length > 20) {
        return str.substring(0, len) + '...' + str.substring(str.length - len, str.length);
    }
    return str;
}

export const switchTheme = () => {
    const dispatch = useDispatch()
    dispatch({ type: "SWITCH_THEME" })
}

function isLetter(c: string) {
    return c.toLowerCase() != c.toUpperCase();
}

export const verifySeedPhrase = (phrase: string) => {
    let i = 0;
    let flag = true
    //Check for alphabets and spaces
    while (i < phrase.length) {
        if (phrase[i] !== ' ' && !isLetter(phrase[i]) || (i > 0 && phrase[i] === ' ' && phrase[i - 1] === ' ')) {
            flag = false;
            break
        }
        i++;
    }
    let numWords = phrase.split(" ").length;
    if (numWords === 12 && flag) return true
    return false
}
export const copyToClipboard = (key: string, setCopied: (val: boolean) => void) => {
    Clipboard.setString(key)
    setCopied(true)
    setTimeout(() => {
        setCopied(false)
    }, 3000)
}

export const shareLink = async (title: string, message: string, url?: string) => {
    try {
        await Share.share({
            title,
            message,
            url
        })
    } catch (error: any) {
        Alert.alert(error.message);
    }
}

export const ShowToast = (type: string, text1: string, text2?: string) => {
    if (text2?.length) {
        Toast.show({
            type,
            text1,
            text2,
        });
    } else {
        Toast.show({
            type,
            text1,
        });
    }
}

export const randomNum = (max: number) => Math.floor(Math.random() * max)

export const AddCommas = (num: number) => {
    return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const roundNumAndAddCommas = (num: number) => {
    return AddCommas(roundNum(num))
}

export const roundNum = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

export const getMinutes = (time: number) => {
    time = Math.floor(time / 60)
    return time < 10 ? `0${time}` : time
}

export const seconds = (time: number) => {
    return Math.floor(time / 1000)
}

export const getSeconds = (time: number) => {
    time = time - (Math.floor(time / 60) * 60);
    return time < 10 ? `0${time}` : time
}

export const randomColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`

export const selectValue = (arr: any[], id: number) => {
    let newArr: any[] = []
    arr.map((item: any) => {
        if (item.id === id) {
            newArr.push({ ...item, selected: true })
        } else {
            newArr.push({ ...item, selected: false })
        }
    })
    return newArr
}

export const isEmptyObject = (obj: any) => {
    return Object.keys(obj).length === 0;
}