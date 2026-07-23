import pb from "./pocketbase";

export type ProfileLanguage =
  | "sv"
  | "en"
  | "pl";

export type StaffProfile = {
  id: string;
  name: string;
  displayName: string;
  email: string;
  phone: string;
  language: ProfileLanguage;
  role:
    | "admin"
    | "employee";
  active: boolean;
  verified: boolean;
  created: string;
  updated: string;
};

export type UpdateProfileData = {
  name: string;
  displayName: string;
  phone: string;
  language: ProfileLanguage;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

export function getCurrentProfile() {
  const record =
    pb.authStore.record;

  if (
    !record
  ) {
    return null;
  }

  return record as unknown as
    StaffProfile;
}

export async function refreshCurrentProfile() {
  if (
    !pb.authStore.isValid
  ) {
    throw new Error(
      "No authenticated user."
    );
  }

  await pb
    .collection(
      "staff"
    )
    .authRefresh();

  return getCurrentProfile();
}

export async function updateCurrentProfile({
  name,
  displayName,
  phone,
  language,
}: UpdateProfileData) {
  const currentProfile =
    getCurrentProfile();

  if (
    !currentProfile
  ) {
    throw new Error(
      "No authenticated user."
    );
  }

  const record =
    await pb
      .collection(
        "staff"
      )
      .update(
        currentProfile.id,
        {
          name:
            name.trim(),

          displayName:
            displayName.trim(),

          phone:
            phone.trim(),

          language,
        }
      );

  pb.authStore.save(
    pb.authStore.token,
    record
  );

  return record as unknown as
    StaffProfile;
}

export async function changeCurrentPassword({
  currentPassword,
  newPassword,
}: ChangePasswordData) {
  const currentProfile =
    getCurrentProfile();

  if (
    !currentProfile
  ) {
    throw new Error(
      "No authenticated user."
    );
  }

  const record =
    await pb
      .collection(
        "staff"
      )
      .update(
        currentProfile.id,
        {
          oldPassword:
            currentPassword,

          password:
            newPassword,

          passwordConfirm:
            newPassword,
        }
      );

  pb.authStore.save(
    pb.authStore.token,
    record
  );

  return record as unknown as
    StaffProfile;
}
