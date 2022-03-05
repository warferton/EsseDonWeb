const parseWeekDay = (day : number)=> {
    switch(day){
        case 0 : return 'Вс';
        case 1 : return 'Пн';
        case 2 : return 'Вт';
        case 3 : return 'Ср';
        case 4 : return 'Чт';
        case 5 : return 'Пт';
        case 6 : return 'Сб';
        default : throw new Error("Invalid Date Format")
    }
}

const parseMonth = (month : number)=> {
    switch(month){
        case 0 : return 'Января';
        case 1 : return 'Февраля';
        case 2 : return 'Марта';
        case 3 : return 'Апреля';
        case 4 : return 'Мая';
        case 5 : return 'Июня';
        case 6 : return 'Июля';
        case 7 : return 'Августа';
        case 8 : return 'Сентября';
        case 9 : return 'Октября';
        case 10 : return 'Ноября';
        case 11 : return 'Декабря';
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
        return parseMonth( new Date(date).getMonth() );
    }
    else if ( date instanceof  Date) {
        return parseMonth( date.getMonth() );
    }
    else throw new Error("Invalid Date Format");
}