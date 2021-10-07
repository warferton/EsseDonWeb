export function parseLineup( string : string ){
    if(string === undefined){
        return string;
    }
    const str = string;
    const members = str.split(',').map(member => member = member.trim());
    return members;
}   
