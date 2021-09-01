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

export const getLocalWeekDay = ( date : string | Date ) => {
    if(typeof date === 'string') {
        return parseWeekDay( new Date(date).getDay() );
    }
    else if ( date instanceof  Date) {
        return parseWeekDay( date.getDay() );
    }
    else throw new Error("Invalid Date Format");
}