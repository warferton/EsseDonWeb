/**
 * @class
 * Basic class for representing an email object
 */
export class Email{
    email: string;
    private rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(string : string){
        if(this.rex.test(string))
            this.email = string;
        else    
            throw new Error('The string should match the email pattern!');
    }

    checkMatch(string: string){
        return this.rex.test(string);
    }
}

/**
 * @interface
 */
export interface IClient{
    first_name: string;
    last_name: string;
    email: Email;
}