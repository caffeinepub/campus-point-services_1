import Text "mo:core/Text";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Migration "migration";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Specify migration function in with-clause
(with migration = Migration.run)
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

  var maxEnquiryId = 0;
  let enquiries = Map.empty<Nat, Enquiry>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var isInitialized = false;
  // Initialization flag to protect existing state

  // Persistent empty set of emails
  // Initialize with default admin emails - only callable once by system admin
  public shared ({ caller }) func initializeAuthorizedEmails() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only system admins can initialize admin emails");
    };
    if (isInitialized) {
      Runtime.trap("Already initialized");
    };
    let initialEmails = [
      "advnitin1404@gmail.com",
      "gauravgodawat3399@gmail.com",
      "new_email@iitj.ac.in",
    ];
    for (email in initialEmails.values()) {
      AccessControl.assignRole(accessControlState, caller, caller, #admin);
    };
    isInitialized := true;
  };

  func normalizeEmail(email : Text) : Text {
    email.trim(#text(" ")).toLower();
  };

  // Helper function to check if Text exists in Set
  func isPresentInSet(set : Set.Set<Text>, email : Text) : Bool {
    set.contains(email);
  };

  func isAuthorizedEmail(email : Text) : Bool {
    let normalizedEmail = normalizeEmail(email);
    isPresentInSet(Set.empty<Text>(), normalizedEmail);
  };

  func isAuthorizedAdmin(caller : Principal) : Bool {
    // System admins always have access
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };
    // Must be at least a registered user (not guest)
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return false;
    };
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) {
        let normalizedEmail = normalizeEmail(profile.email);
        isAuthorizedEmail(normalizedEmail);
      };
    };
  };

  // Admin email management
  public shared ({ caller }) func addAdminEmail(email : Text) : async Bool {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only authorized admins can add admin emails");
    };
    let normalizedEmail = normalizeEmail(email);
    if (isAuthorizedEmail(normalizedEmail)) {
      return false;
    };
    AccessControl.assignRole(accessControlState, caller, caller, #admin);
    true;
  };

  public shared ({ caller }) func removeAdminEmail(email : Text) : async Bool {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only authorized admins can remove admin emails");
    };
    let normalizedEmail = normalizeEmail(email);
    if (isAuthorizedEmail(normalizedEmail)) {
      return true;
    };
    false;
  };

  public query ({ caller }) func getAuthorizedAdminEmails() : async [Text] {
    if (not isAuthorizedAdmin(caller)) {
      Runtime.trap("Unauthorized: Only authorized admins can view admin emails");
    };
    [];
  };

  public query ({ caller }) func isAdminEnquiryAccess(_caller : Principal) : async Bool {
    isAuthorizedAdmin(_caller);
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
    // Public endpoint - anyone can create an enquiry
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
      Runtime.trap("Unauthorized: Only authorized admins can mark enquiries as answered");
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
      Runtime.trap("Unauthorized: Only authorized admins can view all enquiries");
    };
    let iter = enquiries.entries();
    let enquiryWithIdIter = iter.map(func((id, enquiry)) { { id = id.toText(); enquiry } });
    enquiryWithIdIter.toArray();
  };
};
