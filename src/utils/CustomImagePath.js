export const getImagePath = (path) => {
    const prefix = "/hpbocw"; // For staging
    // const prefix = "/"; // For local
    return `${prefix}${path}`;
  };
  