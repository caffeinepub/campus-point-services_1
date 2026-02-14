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
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createEnquiry(id: string, name: string, email: string, message: string): Promise<void>;
    getAllEnquiriesWithIds(): Promise<Array<EnquiryWithId>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markAnswered(id: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
