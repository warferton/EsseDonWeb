/**
 * @interface
 * 
 * Describes data held in user object
 */
export interface IUser {
 username: string;
 password: string;
 lastLogin: Date;
 uuid: string;
}