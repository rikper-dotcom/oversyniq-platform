import pb from "./pocketbase";

import type {
  TimeEntry,
} from "./timeService";

export type StaffRole =
  | "admin"
  | "employee";

export type StaffLanguage =
  | "sv"
  | "en"
  | "pl";

export type StaffMember = {
  id: string;
  name: string;
  displayName: string;
  email: string;
  phone: string;
  language: StaffLanguage;
  role: StaffRole;
  active: boolean;
  verified: boolean;
  created: string;
  updated: string;
};

export type CreateStaffData = {
  name: string;
  displayName: string;
  email: string;
  phone: string;
  language: StaffLanguage;
  role: StaffRole;
  password: string;
};

export type UpdateStaffData = {
  name: string;
  displayName: string;
  email: string;
  phone: string;
  language: StaffLanguage;
  role: StaffRole;
  active: boolean;
};

export async function getStaffMembers() {
  const records =
    await pb
      .collection(
        "staff"
      )
      .getFullList({
        sort:
          "name,email",
      });

  return records as unknown as
    StaffMember[];
}

export async function createStaffMember({
  name,
  displayName,
  email,
  phone,
  language,
  role,
  password,
}: CreateStaffData) {
  const record =
    await pb
      .collection(
        "staff"
      )
      .create({
        name:
          name.trim(),

        displayName:
          displayName.trim(),

        email:
          email
            .trim()
            .toLowerCase(),

        phone:
          phone.trim(),

        language,

        role,

        active:
          true,

        emailVisibility:
          true,

        password,

        passwordConfirm:
          password,
      });

  return record as unknown as
    StaffMember;
}

export async function updateStaffMember(
  staffId: string,
  {
    name,
    displayName,
    email,
    phone,
    language,
    role,
    active,
  }: UpdateStaffData
) {
  const record =
    await pb
      .collection(
        "staff"
      )
      .update(
        staffId,
        {
          name:
            name.trim(),

          displayName:
            displayName.trim(),

          email:
            email
              .trim()
              .toLowerCase(),

          phone:
            phone.trim(),

          language,

          role,

          active,
        }
      );

  return record as unknown as
    StaffMember;
}

export async function resetStaffPassword(
  staffId: string,
  password: string
) {
  const record =
    await pb
      .collection(
        "staff"
      )
      .update(
        staffId,
        {
          password,

          passwordConfirm:
            password,
        }
      );

  return record as unknown as
    StaffMember;
}

export async function getAllCompletedTimeEntries() {
  const records =
    await pb
      .collection(
        "time_entries"
      )
      .getFullList({
        filter:
          'status = "completed"',

        sort:
          "-startTime",
      });

  return records as unknown as
    TimeEntry[];
}

export async function getAdminTimeReportData() {
  const [
    staffMembers,
    timeEntries,
  ] = await Promise.all([
    getStaffMembers(),
    getAllCompletedTimeEntries(),
  ]);

  return {
    staffMembers,
    timeEntries,
  };
}