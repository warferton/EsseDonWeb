/**
 * @interface
 * 
 * Describes data held in user object
 */
export interface IUser {
 _id?: string;
 username: string;
 password: string;
 lastLogin?: Date;
 created?: Date;
}