import { Camera, Loader2, Mail, User } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-base-200 rounded-2xl p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-base-content/60 mt-1">
              Manage your profile information
            </p>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="size-32 rounded-full overflow-hidden bg-base-300">
                <img
                  src="https://i.pravatar.cc/300?img=12"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="absolute bottom-1 right-1 btn btn-primary btn-circle cursor-pointer">
                <Camera className="size-5" />
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <p className="text-center text-sm text-base-content/50 mb-8">
            Click the camera icon to update your photo
          </p>

          {/* User Info */}
          <div className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type="text"
                  value="John Doe"
                  readOnly
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />

                <input
                  type="email"
                  value="john@example.com"
                  readOnly
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            <button className="btn btn-primary w-full">
              Update Profile
            </button>
          </div>

          {/* Account Info */}
          <div className="divider"></div>

          <div className="text-sm text-base-content/60">
            <div className="flex justify-between py-2">
              <span>Account Status</span>
              <span className="text-success">Active</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Member Since</span>
              <span>August 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;