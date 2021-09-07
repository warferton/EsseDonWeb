/**
 * @interface
 * 
 * Describes data held in user object
 */
export interface IUser {
 id: string;
 username: string;
 password: string;
 lastLogin: Date;
}