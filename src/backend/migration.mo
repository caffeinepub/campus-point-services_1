import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

module {
  type Enquiry = {
    name : Text;
    email : Text;
    message : Text;
    answered : Bool;
  };

  type UserProfile = {
    name : Text;
    email : Text;
  };

  type OldActor = {
    maxEnquiryId : Nat;
    enquiries : Map.Map<Nat, Enquiry>;
    userProfiles : Map.Map<Principal, UserProfile>;
    authorizedAdminEmails : [Text];
  };

  type NewActor = {
    maxEnquiryId : Nat;
    enquiries : Map.Map<Nat, Enquiry>;
    userProfiles : Map.Map<Principal, UserProfile>;
    isInitialized : Bool;
  };

  public func run(old : OldActor) : NewActor {
    { old with isInitialized = false };
  };
};
