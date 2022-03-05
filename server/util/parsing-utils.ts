export function parseLineup( string : string ){
    if(string === undefined){
        return string;
    }
    const str = string;
    const members = str.split(',').map(member => member = member.trim());
    return members;
}   

export function parseDescription( string : string ) {
    if(string === undefined){
        return string;
    }
    string = string.replace(/\n/g, '<br/>');
    return string;
}