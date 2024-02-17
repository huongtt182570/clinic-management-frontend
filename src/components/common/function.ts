export const formatDate = (
  newDate?: Date | undefined | null | string
): string => {
  if (newDate) {
    const dateString = `${newDate}`;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  return '';
};

export const renderGender = (gender: string) => {
  if (gender === 'FEMALE') return 'Nữ';
  if (gender === 'MALE') return 'Nam';
  if (gender === 'OTHER') return 'Khác';
  return '';
};
