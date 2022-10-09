const checkForEmpty = (obj: any) => {
    try {
        return Object.values(obj).some((item: any) => !item);
    } catch (error) {
        console.log("error in checkForEmpty: error", error);

        return false;
    }
};

export default checkForEmpty;
