export const formatRupiah = (angka) => {
  if (!angka) return 'Tidak disebutkan';
  const cleanNumber = String(angka).replace(/[^\d]/g, '');
  const number = parseInt(cleanNumber);
  if (isNaN(number)) return angka;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
};

export const formatInputRupiah = (angka) => {
  if (!angka) return '';
  const clean = String(angka).replace(/[^\d]/g, '');
  if (!clean) return '';
  return new Intl.NumberFormat('id-ID').format(parseInt(clean));
};

export const parseRupiah = (value) => {
  if (!value) return '';
  return String(value).replace(/\./g, '');
};
