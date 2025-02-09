import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import gsap from "gsap";
import { useToast } from "../../../hooks/useToast";

const EditProfile = ({ onUserNameChange, onFileChange }) => {
  const toast = useToast();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(user.username);
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl);
  const [bannerPreview, setBannerPreview] = useState(user.bannerUrl);
  const [isUploading, setIsUploading] = useState(false);

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const avatarPreviewRef = useRef(null);
  const bannerPreviewRef = useRef(null);

  const handleUsernameChange = (e) => {
    const newUserName = e.target.value.trim();
    setCurrentUser(newUserName);
    onUserNameChange?.(newUserName);
  };

  const animatePreview = (element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    );
  };

  const handleFilePreview = (file, setPreview, previewRef) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setTimeout(() => {
          if (previewRef.current) {
            animatePreview(previewRef.current);
          }
        }, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.info("Please upload an image file");
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.info("File size must be less than 2MB");
      return;
    }

    setIsUploading(true);
    try {
      const previewRef =
        type === "avatar" ? avatarPreviewRef : bannerPreviewRef;
      handleFilePreview(
        file,
        type === "avatar" ? setAvatarPreview : setBannerPreview,
        previewRef
      );
      onFileChange(type, file);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload file. Please try again");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (avatarPreview && avatarPreviewRef.current) {
      gsap.fromTo(
        avatarPreviewRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
    if (bannerPreview && bannerPreviewRef.current) {
      gsap.fromTo(
        bannerPreviewRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Username Section */}
      <section aria-labelledby="username-heading">
        <h2
          id="username-heading"
          className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2"
        >
          User Name
        </h2>
        <input
          type="text"
          value={currentUser}
          onChange={handleUsernameChange}
          aria-label="Username"
          spellCheck={false}
          maxLength={15}
          className="w-full border border-[#728AA143] bg-[#728AA113] rounded-md placeholder:text-[#728AA155] 
          text-[#4A6A83] dark:text-[#728AA1] font-semibold px-3 py-2 focus:ring-2 focus:ring-blue-500 
          focus:border-transparent outline-none transition-all duration-200"
        />
      </section>

      {/* Avatar Section */}
      <section aria-labelledby="avatar-heading">
        <h2
          id="avatar-heading"
          className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2"
        >
          Avatar
        </h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => avatarInputRef.current?.click()}
            disabled={isUploading}
            className="w-32 h-32 lg:w-40 lg:h-40 bg-[#EFF1F3] dark:bg-[#272C38] rounded-full 
              relative overflow-hidden group transition-all duration-200 
              hover:dark:bg-[#323845] hover:bg-[#e2e2e2]  focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Upload avatar image"
          >
            <div
              className="absolute inset-0 flex items-center justify-center 
              text-center font-medium dark:text-[#B9B9B9] text-[#4A6A83] group-hover:dark:text-white 
              group-hover:text-[#4A6A83]"
            >
              {isUploading ? (
                "Uploading..."
              ) : (
                <>
                  Click to update
                  <br />
                  avatar
                </>
              )}
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "avatar")}
              aria-label="Avatar file upload"
            />
          </button>
          {avatarPreview && (
            <div
              ref={avatarPreviewRef}
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden 
                ring-1 ring-[#728AA143]"
              style={{ opacity: 0 }}
            >
              <img
                src={avatarPreview}
                alt="User avatar preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Banner Section */}
      <section aria-labelledby="banner-heading">
        <h2
          id="banner-heading"
          className="font-medium lg:text-lg dark:text-[#728AA1] text-[#5A5A5A] mb-2"
        >
          Banner
        </h2>
        <div className="space-y-2">
          <button
            onClick={() => bannerInputRef.current?.click()}
            disabled={isUploading}
            className="w-full h-28 lg:h-44 bg-[#EFF1F3] dark:bg-[#272C38] relative overflow-hidden 
              group transition-all duration-200 hover:dark:bg-[#323845] hover:bg-[#e2e2e2] 
              focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-label="Upload banner image"
          >
            <div
              className="absolute inset-0 flex items-center justify-center 
              text-center font-medium dark:text-[#B9B9B9] text-[#4A6A83] group-hover:dark:text-white 
              group-hover:text-[#4A6A83] "
            >
              {isUploading ? "Uploading..." : "Click to update banner"}
            </div>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "banner")}
              aria-label="Banner file upload"
            />
          </button>
          {bannerPreview && (
            <div
              ref={bannerPreviewRef}
              className="w-full h-28 lg:h-44 overflow-hidden rounded-md 
                ring-1 ring-[#728AA143]"
              style={{ opacity: 0 }}
            >
              <img
                src={bannerPreview}
                alt="User banner preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
