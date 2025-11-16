import {useCallback, useState,useMemo} from 'react'


function useInput(initialValue,options={} ){ 
    const {type = 'text',trim= false,sanitizeFn= null,commitOnBlur= true}=options;

    const applyTrim=useCallback((value) =>{
        if(!trim) return value;
        if(typeof value ==='string'){
            return value.trim();
        }
    },[trim]);

    const applySanitizeFn= useCallback((value) =>{
        if(!sanitizeFn) return value;

        try {
             const sanitizedValue = sanitizeFn(value);
             return typeof sanitizedValue ==="string" ? sanitizedValue : value;
        } catch{
            return value;
        }
    },[sanitizeFn])

    const isValidNumber = useCallback((value)=>{
        
        const trimmedValue= String(value).trim();
        if(trimmedValue==='' ) return false;
        if(trimmedValue[trimmedValue.length - 1] ==='.' ) return false;
        if(trimmedValue ==='-') return false;
        return !isNaN(Number(trimmedValue));
    },[]);

    const normalizeValue= useCallback((value) =>{
        if(!isValidNumber(value)) return value;
        const numberValue= Number(value);
        return String(numberValue);   
    },[isValidNumber]);

    const normalizedInitialValue = useCallback(() => {
        if(initialValue === null || initialValue === undefined) return "";
        let raw = String(initialValue);
        raw = applyTrim(raw);
        raw = applySanitizeFn(raw);
        if(type ==='number'){
            raw = normalizeValue(raw);
        }
        
        return raw
    }, [initialValue, applyTrim, applySanitizeFn, normalizeValue, type]);

    const [value,setValue]=useState(() => normalizedInitialValue(initialValue));

    const onChange= useCallback((e)=>{   
        let raw = e.target.value;
        // raw= applyTrim(raw);
        raw = applySanitizeFn(raw);

        setValue(raw);
    }, [applySanitizeFn]);
    const onBlur = useCallback(()=>{

        if(!commitOnBlur) return;
        let raw = value;
        raw = applyTrim(raw);   
        raw = applySanitizeFn(raw);

        if(type ==='number'){
            raw = normalizeValue(raw);
        }

        setValue(raw);
    }, [applyTrim, applySanitizeFn, commitOnBlur, normalizeValue, value,type]);

    const setValueExternally = useCallback((newValue) =>{
        let raw = String(newValue);
        raw = applyTrim(raw);
        raw = applySanitizeFn(raw); 
        if(type ==='number'){   
            raw = normalizeValue(raw);
        }
        setValue(raw);
    }, [applyTrim, applySanitizeFn, normalizeValue, type]);

    const reset = useCallback(() =>{
        setValue(normalizedInitialValue());
    }, [normalizedInitialValue]);

    const parsedValue = useMemo(() => type ==='number' ? (isValidNumber(value) ? Number(value) : null) : value, [type, isValidNumber, value]);

    return {value, bind: { onChange, onBlur , value} , setValue :setValueExternally, reset, parsedValue,isValidNumber};

}

export {useInput};