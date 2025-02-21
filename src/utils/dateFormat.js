const formatDateDeepkak = (dateString) => {
    const dateStr = dateString;
    const [year, month, day] = dateStr.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
};


export default formatDateDeepkak