import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface EnquiryWithId {
    id: string;
    enquiry: Enquiry;
}
export interface Enquiry {
    name: string;
    answered: boolean;
    email: string;
    message: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAdminEmail(email: string): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createEnquiry(name: string, email: string, message: string): Promise<bigint>;
    getAllEnquiriesWithIds(): Promise<Array<EnquiryWithId>>;
    getAuthorizedAdminEmails(): Promise<Array<string>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeAuthorizedEmails(): Promise<void>;
    isAdminEnquiryAccess(_caller: Principal): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    markAnswered(id: bigint): Promise<void>;
    removeAdminEmail(email: string): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
