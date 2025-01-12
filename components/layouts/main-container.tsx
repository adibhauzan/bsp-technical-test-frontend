"use client";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`navbar-sticky main-container min-h-screen text-black dark:text-white-dark`}
    >
      {" "}
      {children}
    </div>
  );
};

export default MainContainer;
