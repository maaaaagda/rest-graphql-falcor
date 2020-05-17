export const TEST_USER = {
    password: "test_pass",
    name: "test_admin",
    email: "test_admin@gmail.com"
};

export const capitalize = (s: string) => {
    if (typeof s !== "string") {
      return "";
    }
    s = s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
