"use client";

const ContentAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className={`px-3 py-2 md:px-6 md:py-2`}>{children}</div>
    </>
  );
};

export default ContentAnimation;
