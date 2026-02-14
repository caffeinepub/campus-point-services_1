import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
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
  };

  public type EnquiryWithId = {
    id : Text;
    enquiry : Enquiry;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let enquiries = Map.empty<Text, Enquiry>();
  let userProfiles = Map.empty<Principal, UserProfile>();

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
  public shared ({ caller }) func createEnquiry(id : Text, name : Text, email : Text, message : Text) : async () {
    // No authorization check - guests can submit enquiries
    if (enquiries.containsKey(id)) { Runtime.trap("Enquiry already exists") };
    let enquiry : Enquiry = {
      name;
      email;
      message;
      answered = false;
    };
    enquiries.add(id, enquiry);
  };

  public shared ({ caller }) func markAnswered(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all enquiries");
    };
    let iter = enquiries.entries();
    let enquiryWithIdIter = iter.map(
      func((id, enquiry)) { { id; enquiry } }
    );
    enquiryWithIdIter.toArray();
  };
};
