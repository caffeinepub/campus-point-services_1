import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Enquiry = {
    name : Text;
    email : Text;
    message : Text;
    answered : Bool;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  public type EnquiryWithId = {
    id : Text;
    enquiry : Enquiry;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var maxEnquiryId : Nat = 0;
  let enquiries = Map.empty<Nat, Enquiry>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authorized admin email
  let authorizedAdminEmail : Text = "Advnitin1404@gmail.com";

  func normalizeEmail(email : Text) : Text {
    email.trim(#text(" ")).toLower()
  };

  func isAuthorizedAdmin(caller : Principal) : Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return false;
    };
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) {
        normalizeEmail(profile.email) == normalizeEmail(authorizedAdminEmail);
      };
    };
  };

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Enquiry management
  public shared ({ caller }) func createEnquiry(name : Text, email : Text, message : Text) : async Nat {
    let enquiry : Enquiry = {
      name;
      email;
      message;
      answered = false;
    };
    maxEnquiryId += 1;
    enquiries.add(maxEnquiryId, enquiry);
    maxEnquiryId;
  };

  public shared ({ caller }) func markAnswered(id : Nat) : async () {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can perform this action");
    };
    switch (enquiries.get(id)) {
      case (null) { Runtime.trap("Enquiry not found") };
      case (?enquiry) {
        let newEnquiry = { enquiry with answered = true };
        enquiries.add(id, newEnquiry);
      };
    };
  };

  public query ({ caller }) func getAllEnquiriesWithIds() : async [EnquiryWithId] {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only the authorized admin can view all enquiries");
    };
    let iter = enquiries.entries();
    let enquiryWithIdIter = iter.map(
      func((id, enquiry)) {
        { id = id.toText(); enquiry };
      }
    );
    enquiryWithIdIter.toArray();
  };
};
