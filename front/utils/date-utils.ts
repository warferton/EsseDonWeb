const parseWeekDay = (day : number)=> {
    switch(day){
        case 0 : return 'Пн';
        case 1 : return 'Вт';
        case 2 : return 'Ср';
        case 3 : return 'Чт';
        case 4 : return 'Пт';
        case 5 : return 'Сб';
        case 6 : return 'Вс';
        default : throw new Error("Invalid Date Format")
    }
}

const parseMonth = (month : number)=> {
    switch(month){
        case 1 : return 'Января';
        case 2 : return 'Февраля';
        case 3 : return 'Марта';
        case 4 : return 'Апреля';
        case 5 : return 'Мая';
        case 6 : return 'Июня';
        case 7 : return 'Июля';
        case 8 : return 'Августа';
        case 9 : return 'Сентября';
        case 10 : return 'Октября';
        case 11 : return 'Ноября';
        case 12 : return 'Декабря';
        default : throw new Error("Invalid Date Format")
    }
}

export const getLocalWeekDay = ( date : string | Date ) : string => {
    if(typeof date === 'string') {
        return parseWeekDay( new Date(date).getDay() );
    }
    else if ( date instanceof  Date) {
        return parseWeekDay( date.getDay() );
    }
    else throw new Error("Invalid Date Format");
}

export const getLocalizedMonth = ( date : string | Date ) : string => {
    if(typeof date === 'string') {
        return parseWeekDay( new Date(date).getMonth() );
    }
    else if ( date instanceof  Date) {
        return parseWeekDay( date.getMonth() );
    }
    else throw new Error("Invalid Date Format");
}